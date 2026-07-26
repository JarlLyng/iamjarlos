<template>
  <div class="scroll-progress" aria-hidden="true">
    <span class="scroll-progress__bar" :style="{ transform: `scaleX(${progress})` }"></span>
  </div>
</template>

<script>
export default {
  data() {
    return { progress: 0, raf: null, ticking: false };
  },
  mounted() {
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll, { passive: true });
    this.update();
  },
  beforeUnmount() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
    cancelAnimationFrame(this.raf);
  },
  methods: {
    onScroll() {
      if (this.ticking) return;
      this.ticking = true;
      this.raf = requestAnimationFrame(() => {
        this.update();
        this.ticking = false;
      });
    },
    update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      this.progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    },
  },
};
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  z-index: 10000;
  pointer-events: none;
  background: transparent;
}
.scroll-progress__bar {
  display: block;
  height: 100%;
  width: 100%;
  transform-origin: 0 50%;
  background: var(--color-accent);
  box-shadow: 0 0 12px rgba(208, 255, 0, 0.7);
  will-change: transform;
}
@media (prefers-reduced-motion: reduce) {
  .scroll-progress { display: none; }
}
</style>
