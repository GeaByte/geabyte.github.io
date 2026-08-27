const SUPABASE_URL = process.env.VUE_APP_SUPABASE_URL || 'https://vykqfmqmflcykzzlgpsx.supabase.co';
const ANON_KEY = process.env.VUE_APP_SUPABASE_ANON_KEY || '';
const LEGACY_ANON_KEY = process.env.VUE_APP_SUPABASE_ANON_KEY_LEGACY || '';

const ASK_PATH = '/functions/v1/ask';
const AUTH_STATUSES = new Set([401, 403]);

function buildKeys() {
  return [...new Set([ANON_KEY, LEGACY_ANON_KEY].filter(Boolean))];
}

function readErrorMessage(payload, fallback) {
  if (!payload || typeof payload !== 'object') return fallback;
  const candidate = payload.error || payload.message || payload.msg;
  if (typeof candidate === 'string' && candidate.trim()) return candidate.trim();
  return fallback;
}

function normalizeSources(sources) {
  if (!Array.isArray(sources)) return [];
  return sources
    .filter((item) => item && (item.title || item.url))
    .map((item) => ({
      title: String(item.title || item.url),
      url: String(item.url || ''),
    }));
}

function parseSuccess(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Unexpected response from the Q&A service.');
  }
  const answer = typeof payload.answer === 'string' ? payload.answer.trim() : '';
  if (!answer) {
    throw new Error('The Q&A service returned an empty answer.');
  }
  return { answer, sources: normalizeSources(payload.sources) };
}

async function readJson(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

async function postAsk(baseUrl, key, question) {
  const response = await fetch(`${baseUrl}${ASK_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
      apikey: key,
    },
    body: JSON.stringify({ question, query: question }),
  });

  const payload = await readJson(response);

  if (!response.ok) {
    const error = new Error(
      readErrorMessage(payload, `The Q&A service returned ${response.status}.`)
    );
    error.status = response.status;
    throw error;
  }

  return parseSuccess(payload);
}

export async function askSite(question) {
  const trimmed = (question || '').trim();
  if (!trimmed) {
    throw new Error('Enter a question about Raymond’s work.');
  }

  const keys = buildKeys();
  if (!keys.length) {
    throw new Error('Chat isn’t configured yet.');
  }

  const baseUrl = SUPABASE_URL.replace(/\/$/, '');
  let lastAuthError = null;

  for (let i = 0; i < keys.length; i += 1) {
    try {
      return await postAsk(baseUrl, keys[i], trimmed);
    } catch (err) {
      const canFallback = AUTH_STATUSES.has(err.status) && i < keys.length - 1;
      if (canFallback) {
        lastAuthError = err;
        continue;
      }
      throw err;
    }
  }

  throw lastAuthError || new Error('The Q&A service could not be reached.');
}
