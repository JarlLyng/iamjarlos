<template>
  <section
    v-show="win.open && !win.min"
    class="os-window"
    :class="{ 'os-window--active': active, 'os-window--max': win.max }"
    :style="frameStyle"
    role="dialog"
    :aria-label="win.title"
    @pointerdown="$emit('focus')"
  >
    <header
      class="os-titlebar"
      @pointerdown="startDrag"
      @dblclick="$emit('maximize')"
    >
      <div class="os-lights" @pointerdown.stop>
        <button class="os-light os-light--close" :aria-label="`Close ${win.title}`" @click="$emit('close')"></button>
        <button class="os-light os-light--min" :aria-label="`Minimize ${win.title}`" @click="$emit('minimize')"></button>
        <button class="os-light os-light--zoom" :aria-label="`Maximize ${win.title}`" @click="$emit('maximize')"></button>
      </div>
      <span class="os-title">{{ win.title }}</span>
      <span class="os-titlebar-spacer"></span>
    </header>
    <div class="os-window-body">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    win: { type: Object, required: true },
    active: { type: Boolean, default: false },
  },
  emits: ['focus', 'close', 'minimize', 'maximize'],
  computed: {
    frameStyle() {
      if (this.win.max) return { zIndex: this.win.z };
      return {
        transform: `translate3d(${this.win.x}px, ${this.win.y}px, 0)`,
        width: this.win.w + 'px',
        zIndex: this.win.z,
      };
    },
  },
  methods: {
    startDrag(e) {
      // No dragging when maximized, on touch layouts, or on the buttons.
      if (this.win.max) return;
      if (typeof window === 'undefined') return;
      if (!window.matchMedia('(pointer: fine)').matches) return;
      if (window.innerWidth <= 768) return;
      this.$emit('focus');
      const startX = e.clientX - this.win.x;
      const startY = e.clientY - this.win.y;
      const onMove = (ev) => {
        this.win.x = Math.min(Math.max(ev.clientX - startX, -this.win.w + 120), window.innerWidth - 60);
        this.win.y = Math.min(Math.max(ev.clientY - startY, 30), window.innerHeight - 60);
      };
      const onUp = () => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerup', onUp, { passive: true });
    },
  },
};
</script>

<style scoped>
.os-window {
  position: fixed;
  top: 0;
  left: 0;
  background: #1c1c1c;
  border: 1px solid rgba(208, 255, 0, 0.14);
  border-radius: 10px;
  box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(0, 0, 0, 0.4);
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  /* Neutralize the site-wide `section` rules (min-height: 100vh,
     centered children) — a window is a section element too. */
  min-height: 0;
  align-items: stretch;
  justify-content: flex-start;
  max-height: min(72vh, calc(100vh - 160px));
  overflow: hidden;
  animation: os-window-in 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.os-titlebar { width: 100%; }

.os-window--active {
  border-color: rgba(208, 255, 0, 0.4);
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.85), 0 0 24px rgba(208, 255, 0, 0.08);
}

.os-window--max {
  inset: 34px 12px 84px 12px;
  width: auto !important;
  max-height: none;
}

@keyframes os-window-in {
  from { opacity: 0; transform-origin: 50% 60%; scale: 0.96; }
  to { opacity: 1; scale: 1; }
}

.os-titlebar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  cursor: grab;
  user-select: none;
  flex-shrink: 0;
}

.os-titlebar:active { cursor: grabbing; }

.os-lights { display: flex; gap: 8px; }

.os-light {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.15s ease, filter 0.15s ease;
}
.os-light:hover { transform: scale(1.18); filter: brightness(1.15); }
.os-light--close { background: #ff5f57; }
.os-light--min { background: #febc2e; }
.os-light--zoom { background: var(--color-accent); }

.os-title {
  font-family: "Space Grotesk", "Inter", sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.75;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.os-titlebar-spacer { flex: 1; }

.os-window-body {
  padding: 20px;
  overflow-y: auto;
  overscroll-behavior: contain;
  font-weight: 200;
  font-size: 0.95rem;
  line-height: 1.65;
}

@media (max-width: 768px) {
  .os-window {
    inset: 34px 0 76px 0 !important;
    width: auto !important;
    transform: none !important;
    border-radius: 0;
    max-height: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .os-window { animation: none; }
}
</style>
