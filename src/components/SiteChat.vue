<template>
  <teleport to="body">
    <div class="site-chat">
      <div
        v-if="isOpen"
        id="site-chat-panel"
        class="chat-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-chat-title"
        @keydown="onPanelKeydown"
      >
        <header class="chat-header">
          <div>
            <span class="section-label chat-kicker">Site Q&amp;A</span>
            <h2 id="site-chat-title" class="chat-title">
              Ask Ray<span class="accent-dot">.</span>
            </h2>
          </div>
          <button
            type="button"
            class="icon-btn"
            aria-label="Close chat"
            @click="close"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <p class="chat-note">Answers come from this portfolio only.</p>

        <div
          ref="listEl"
          class="chat-messages"
          aria-live="polite"
          aria-relevant="additions"
        >
          <div v-if="!messages.length && !sending" class="chat-empty">
            Ask about Raymond’s work, experience, or projects. If it isn’t on
            this site, the answer will say so.
          </div>

          <article
            v-for="message in messages"
            :key="message.id"
            :class="['bubble', message.role]"
          >
            <p class="bubble-text">{{ message.text }}</p>
            <ul v-if="message.sources && message.sources.length" class="sources">
              <li v-for="(source, index) in message.sources" :key="index">
                <a
                  v-if="source.url"
                  :href="source.url"
                  target="_blank"
                  rel="noopener"
                >{{ source.title }}</a>
                <span v-else>{{ source.title }}</span>
              </li>
            </ul>
          </article>

          <div v-if="sending" class="bubble assistant loading" aria-label="Waiting for an answer">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>

        <form class="chat-form" @submit.prevent="onSubmit">
          <label for="site-chat-input" class="sr-only">Question about Raymond’s work</label>
          <input
            id="site-chat-input"
            ref="inputEl"
            v-model="draft"
            type="text"
            maxlength="500"
            autocomplete="off"
            placeholder="Ask about Raymond's work"
            :disabled="sending"
            @keydown.esc.stop="close"
          />
          <button type="submit" class="send-btn" :disabled="!canSend">
            Send
          </button>
        </form>
      </div>

      <button
        ref="fabEl"
        type="button"
        class="chat-fab"
        :class="{ open: isOpen }"
        :aria-expanded="isOpen ? 'true' : 'false'"
        aria-controls="site-chat-panel"
        :aria-label="isOpen ? 'Close chat' : 'Ask about Raymond\'s work'"
        @click="toggle"
      >
        <svg v-if="!isOpen" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H9l-4 3.5V6.5z" />
        </svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  </teleport>
</template>

<script>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue';
import { askSite } from '@/utilities/askSite';

export default {
  name: 'SiteChat',
  setup() {
    const isOpen = ref(false);
    const sending = ref(false);
    const draft = ref('');
    const messages = ref([]);
    const listEl = ref(null);
    const inputEl = ref(null);
    const fabEl = ref(null);
    let submitLockUntil = 0;
    let nextId = 1;

    const canSend = computed(() => Boolean(draft.value.trim()) && !sending.value);

    const scrollToEnd = async () => {
      await nextTick();
      if (listEl.value) {
        listEl.value.scrollTop = listEl.value.scrollHeight;
      }
    };

    const pushMessage = (role, text, sources = []) => {
      messages.value.push({ id: nextId, role, text, sources });
      nextId += 1;
      return scrollToEnd();
    };

    const focusInput = async () => {
      await nextTick();
      if (inputEl.value) inputEl.value.focus();
    };

    const open = async () => {
      isOpen.value = true;
      await focusInput();
    };

    const close = () => {
      isOpen.value = false;
      nextTick(() => {
        if (fabEl.value) fabEl.value.focus();
      });
    };

    const toggle = () => {
      if (isOpen.value) close();
      else open();
    };

    const onPanelKeydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab' || !isOpen.value) return;

      const root = event.currentTarget;
      const focusable = [...root.querySelectorAll('button, input, a[href]')]
        .filter((el) => !el.disabled && el.offsetParent !== null);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onSubmit = async () => {
      const question = draft.value.trim();
      const now = Date.now();
      if (!question || sending.value || now < submitLockUntil) return;

      submitLockUntil = now + 600;
      sending.value = true;
      draft.value = '';
      await pushMessage('user', question);

      try {
        const result = await askSite(question);
        await pushMessage('assistant', result.answer, result.sources);
      } catch (err) {
        const fallback = err && err.message
          ? err.message
          : 'Couldn’t reach the Q&A service. Try again in a moment.';
        const isNetwork = err instanceof TypeError;
        await pushMessage(
          'error',
          isNetwork
            ? 'Couldn’t reach the Q&A service. Try again in a moment.'
            : fallback
        );
      } finally {
        sending.value = false;
        await scrollToEnd();
        await focusInput();
      }
    };

    onBeforeUnmount(() => {
      sending.value = false;
    });

    return {
      isOpen,
      sending,
      draft,
      messages,
      listEl,
      inputEl,
      fabEl,
      canSend,
      close,
      toggle,
      onPanelKeydown,
      onSubmit,
    };
  },
};
</script>

<style scoped>
.site-chat {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 400;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.85rem;
  pointer-events: none;
}

.site-chat > * {
  pointer-events: auto;
}

.chat-panel {
  width: min(392px, calc(100vw - 2rem));
  height: min(540px, calc(100vh - 7.5rem));
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.45);
  overflow: hidden;
  position: relative;
}

.chat-panel::before {
  content: '';
  position: absolute;
  top: -70px;
  right: -50px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(200, 240, 77, 0.12), transparent 70%);
  pointer-events: none;
}

.chat-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.15rem 1.15rem 0.35rem;
  position: relative;
}

.chat-kicker {
  margin-bottom: 0.25rem;
}

.chat-title {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 400;
  line-height: 1.15;
  color: var(--text);
}

.accent-dot {
  color: var(--accent);
}

.icon-btn {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--muted);
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color 0.2s, color 0.2s;
}

.icon-btn:hover,
.icon-btn:focus-visible {
  border-color: var(--muted);
  color: var(--text);
}

.icon-btn svg,
.chat-fab svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.chat-note {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--muted);
  letter-spacing: 0.04em;
  padding: 0 1.15rem 0.85rem;
  border-bottom: 1px solid var(--border);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.chat-empty {
  margin: auto 0;
  color: var(--muted);
  font-weight: 300;
  font-size: 0.92rem;
  line-height: 1.65;
}

.bubble {
  max-width: 92%;
  padding: 0.75rem 0.9rem;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--surface2);
}

.bubble.user {
  align-self: flex-end;
  background: rgba(200, 240, 77, 0.1);
  border-color: rgba(200, 240, 77, 0.22);
}

.bubble.assistant,
.bubble.loading {
  align-self: flex-start;
}

.bubble.error {
  align-self: stretch;
  max-width: 100%;
  border-color: rgba(232, 96, 96, 0.35);
  background: rgba(232, 96, 96, 0.08);
}

.bubble-text {
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.65;
  color: var(--text);
  white-space: pre-wrap;
}

.bubble.error .bubble-text {
  color: #f0c7c7;
}

.sources {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.7rem;
}

.sources a,
.sources span {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--accent);
  background: rgba(200, 240, 77, 0.08);
  border: 1px solid rgba(200, 240, 77, 0.22);
  border-radius: 4px;
  padding: 0.2rem 0.5rem;
  text-decoration: none;
}

.sources a:hover,
.sources a:focus-visible {
  color: var(--accent2);
  border-color: rgba(61, 232, 160, 0.4);
}

.bubble.loading {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.85rem 1rem;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: chat-pulse 1.1s ease-in-out infinite;
}

.dot:nth-child(2) { animation-delay: 0.15s; }
.dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes chat-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(0.7); }
}

.chat-form {
  display: flex;
  gap: 0.5rem;
  padding: 0.9rem 1.15rem 1.1rem;
  border-top: 1px solid var(--border);
  background: var(--surface);
}

.chat-form input {
  flex: 1;
  min-width: 0;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 0.9rem;
  padding: 0.65rem 0.8rem;
  outline: none;
  transition: border-color 0.2s;
}

.chat-form input::placeholder {
  color: var(--muted);
}

.chat-form input:focus {
  border-color: rgba(200, 240, 77, 0.45);
}

.chat-form input:disabled {
  opacity: 0.7;
}

.send-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1rem;
  background: var(--accent);
  color: #0b0e11;
  border: none;
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}

.send-btn:hover:not(:disabled) {
  background: #d6f560;
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(200, 240, 77, 0.25);
}

.send-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.chat-fab {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: var(--accent);
  color: #0b0e11;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(200, 240, 77, 0.22);
  transition: background 0.2s, transform 0.2s;
}

.chat-fab svg {
  width: 22px;
  height: 22px;
}

.chat-fab:hover,
.chat-fab:focus-visible {
  background: #d6f560;
  transform: translateY(-2px);
}

.chat-fab.open {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.icon-btn:focus-visible,
.send-btn:focus-visible,
.chat-fab:focus-visible,
.chat-form input:focus-visible,
.sources a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

@media (max-width: 600px) {
  .site-chat {
    right: 1rem;
    bottom: 1rem;
  }

  .chat-panel {
    height: min(70vh, calc(100vh - 6.5rem));
  }
}

@media (prefers-reduced-motion: reduce) {
  .dot { animation: none; }
  .send-btn,
  .chat-fab {
    transition: none;
  }
  .send-btn:hover:not(:disabled),
  .chat-fab:hover,
  .chat-fab:focus-visible {
    transform: none;
  }
}
</style>
