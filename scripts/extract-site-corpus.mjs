#!/usr/bin/env node
/**
 * Walk portfolio Vue source + Vuex store and write RAG chunks.
 * Does not scrape the live site.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_PATH = path.join(ROOT, 'data', 'site-corpus.json');

const PAGE_FILES = [
  { source_path: 'src/components/HomePage.vue', title: 'Home', url: '/' },
  { source_path: 'src/components/AboutMe.vue', title: 'About', url: '/about' },
  { source_path: 'src/components/ProjectsInfo.vue', title: 'Projects', url: '/projects' },
  { source_path: 'src/components/FooterSection.vue', title: 'Footer', url: '/' },
];

const STORE_PATH = 'src/utilities/store.js';

function stripHtml(value) {
  return String(value)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&copy;/g, '©')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function normalize(value) {
  return stripHtml(value)
    .replace(/\{\{[\s\S]*?\}\}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitSfc(source) {
  const template = (source.match(/<template>([\s\S]*?)<\/template>/) || [])[1] || '';
  const script = (source.match(/<script\b[^>]*>([\s\S]*?)<\/script>/) || [])[1] || '';
  return { template, script };
}

function extractQuotedStrings(js) {
  const strings = [];
  const pattern = /(`(?:\\.|[^\\`])*`)|('(?:\\.|[^\\'])*')|("(?:\\.|[^\\"])*")/g;
  let match;
  while ((match = pattern.exec(js))) {
    const raw = match[0];
    const quote = raw[0];
    let body = raw.slice(1, -1);
    if (quote === '`') {
      body = body.replace(/\$\{[\s\S]*?\}/g, ' ');
    }
    body = normalize(body.replace(/\\n/g, ' ').replace(/\\'/g, "'").replace(/\\"/g, '"'));
    if (body.length >= 24) strings.push(body);
  }
  return strings;
}

function extractLabels(js) {
  const labels = [];
  const pattern = /\b(?:title|name|role|company|degree|school):\s*'([^']+)'/g;
  let match;
  while ((match = pattern.exec(js))) {
    const value = normalize(match[1]);
    if (value) labels.push(value);
  }
  return labels;
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function chunk({ source_path, title, url, content }) {
  const text = normalize(content);
  if (!text) return null;
  return { source_path, title, url, content: text };
}

function extractVueFile({ source_path, title, url }) {
  const abs = path.join(ROOT, source_path);
  const source = fs.readFileSync(abs, 'utf8');
  const { template, script } = splitSfc(source);
  const parts = unique([
    normalize(template),
    ...extractQuotedStrings(script),
    extractLabels(script).join(', '),
  ]);
  return chunk({
    source_path,
    title,
    url,
    content: parts.join('\n\n'),
  });
}

function extractStoreProjects() {
  const source_path = STORE_PATH;
  const source = fs.readFileSync(path.join(ROOT, source_path), 'utf8');
  const chunks = [];
  const projectRe = /\{\s*id:\s*(\d+),\s*title:\s*'([^']+)',\s*content:\s*`([\s\S]*?)`,[\s\S]*?technology:\s*\[([^\]]*)\],\s*githubUrl:\s*'([^']*)',\s*category:\s*'([^']+)'/g;

  let match;
  while ((match = projectRe.exec(source))) {
    const [, id, title, content, techRaw, githubUrl, category] = match;
    const technology = techRaw
      .split(',')
      .map((item) => item.replace(/['"]/g, '').trim())
      .filter(Boolean)
      .join(', ');
    const categoryLabel = category === 'sideProject' ? 'Side Project' : 'Course Project';
    const body = [
      `Project: ${title}`,
      `Category: ${categoryLabel}`,
      technology ? `Technologies: ${technology}` : '',
      githubUrl ? `GitHub: ${githubUrl}` : '',
      normalize(content),
    ].filter(Boolean).join('\n');

    chunks.push(chunk({
      source_path,
      title,
      url: `/projects/${id}`,
      content: body,
    }));
  }

  return chunks.filter(Boolean);
}

function main() {
  const chunks = [
    ...PAGE_FILES.map(extractVueFile),
    ...extractStoreProjects(),
  ].filter(Boolean);

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, `${JSON.stringify(chunks, null, 2)}\n`);
  process.stdout.write(`Wrote ${chunks.length} chunks to ${path.relative(ROOT, OUT_PATH)}\n`);
}

main();
