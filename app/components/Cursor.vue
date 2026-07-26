<template>
  <div v-if="isDesktop && !prefersReducedMotion && !isKeyboardUser">
    <div class="g-cursor">
      <div :style="cursorCircle" class="g-cursor__circle"></div>
      <div class="g-cursor__point" ref="point" :style="cursorPoint"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      xChild: 0,
      yChild: 0,
      xParent: 0,
      yParent: 0,
      isDesktop: true,
      rafId: null,
      prefersReducedMotion: false,
      isKeyboardUser: false,
    };
  },
  computed: {
    cursorCircle() {
      const transformValue = `translateX(${this.xParent}px) translateY(${this.yParent}px) translateZ(0)`;
      return { transform: transformValue };
    },
    cursorPoint() {
      const transformValue = `translateX(${this.xChild - 3}px) translateY(${
        this.yChild - 3
      }px) translateZ(0) translate3d(0, 0, 0)`;
      return { transform: transformValue };
    },
  },
  methods: {
    moveCursor(e) {
      // Update point immediately for instant response; the trailing
      // circle is animated by the continuous rAF loop below.
      this.xChild = e.clientX;
      this.yChild = e.clientY;
      this.startLoop();
    },
    startLoop() {
      if (this.rafId !== null) return;
      this.rafId = window.requestAnimationFrame(this.tick);
    },
    tick() {
      const targetX = this.xChild - 15;
      const targetY = this.yChild - 15;
      this.xParent += (targetX - this.xParent) * 0.15;
      this.yParent += (targetY - this.yParent) * 0.15;

      // Keep animating until the circle has settled on the target,
      // then pause the loop so it doesn't burn CPU while idle.
      if (Math.abs(targetX - this.xParent) > 0.1 || Math.abs(targetY - this.yParent) > 0.1) {
        this.rafId = window.requestAnimationFrame(this.tick);
      } else {
        this.xParent = targetX;
        this.yParent = targetY;
        this.rafId = null;
      }
    },
    checkDevice() {
      this.isDesktop = window.innerWidth > 768;
    },
    handleKeyDown(e) {
      // Detect keyboard navigation (Tab, Arrow keys, etc.)
      if (e.key === 'Tab' || e.key.startsWith('Arrow')) {
        this.isKeyboardUser = true;
        // Show system cursor when using keyboard
        if (typeof document !== 'undefined') {
          document.body.style.cursor = 'auto';
        }
      }
    },
    handleMouseMove() {
      // User is using mouse, hide system cursor again
      this.isKeyboardUser = false;
      if (typeof document !== 'undefined' && !this.prefersReducedMotion) {
        document.body.style.cursor = 'none';
      }
    },
  },
  mounted() {
    if (typeof window !== 'undefined') {
      // Check for reduced motion preference
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Don't initialize custom cursor if user prefers reduced motion
      if (this.prefersReducedMotion) {
        return;
      }

      // Detect keyboard navigation
      document.addEventListener('keydown', this.handleKeyDown);
      document.addEventListener('mousemove', this.handleMouseMove);
      
    document.addEventListener("mousemove", this.moveCursor);
    this.checkDevice();
    window.addEventListener('resize', this.checkDevice);
    }
  },
  beforeUnmount() {
    if (typeof window !== 'undefined') {
    document.removeEventListener("mousemove", this.moveCursor);
      document.removeEventListener('keydown', this.handleKeyDown);
      document.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('resize', this.checkDevice);
      if (this.rafId && window.cancelAnimationFrame) {
        window.cancelAnimationFrame(this.rafId);
      }
      // Restore system cursor
      if (typeof document !== 'undefined') {
        document.body.style.cursor = 'auto';
      }
    }
  },
};
</script>

<style scoped>
.g-cursor__circle {
  pointer-events: none;
  user-select: none;
  top: 0;
  left: 0;
  position: fixed;
  width: 30px;
  height: 30px;
  border: 2px solid var(--color-accent, #D0FF00);
  border-radius: 100%;
  z-index: 9999;
  backface-visibility: hidden;
  will-change: transform;
  transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;
}

.g-cursor__point {
  top: 0;
  left: 0;
  position: fixed;
  width: 10px;
  height: 10px;
  pointer-events: none;
  user-select: none;
  border-radius: 100%;
  background: var(--color-accent, #D0FF00);
  z-index: 99999;
  backface-visibility: hidden;
  will-change: transform;
}

</style>
