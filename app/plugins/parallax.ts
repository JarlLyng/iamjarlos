// A lightweight scroll parallax directive: v-parallax="speed"
// Positive speed => element drifts slower than scroll (moves up); tasteful depth.
// Disabled under prefers-reduced-motion. Single shared rAF loop for all elements.
import { defineNuxtPlugin } from '#app';

interface ParallaxEl extends HTMLElement {
  __speed?: number;
}

export default defineNuxtPlugin((nuxtApp) => {
  const els = new Set<ParallaxEl>();
  let ticking = false;
  let reduced = false;

  if (typeof window !== 'undefined') {
    reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  const apply = () => {
    const vh = window.innerHeight;
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // progress: -1 (below viewport) .. 1 (above); 0 at vertical center
      const center = rect.top + rect.height / 2;
      const progress = (center - vh / 2) / (vh / 2 + rect.height / 2);
      const shift = -progress * (el.__speed ?? 0) * 60; // px
      el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    });
    ticking = false;
  };

  const onScroll = () => {
    if (reduced || ticking) return;
    ticking = true;
    requestAnimationFrame(apply);
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  nuxtApp.vueApp.directive('parallax', {
    mounted(el: ParallaxEl, binding) {
      if (reduced) return;
      el.__speed = typeof binding.value === 'number' ? binding.value : 0.3;
      el.style.willChange = 'transform';
      els.add(el);
      onScroll();
    },
    unmounted(el: ParallaxEl) {
      els.delete(el);
    },
  });
});
