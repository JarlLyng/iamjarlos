<template>
  <section class="hero-section" ref="heroSection">
    <canvas ref="particleCanvas" class="particle-canvas" aria-hidden="true"></canvas>
    <div class="content-container hero-content">
      <h1 class="bold-heading" v-motion-slide-visible-left>Hi! I am Jarl</h1>
      <h2 class="light-heading" v-motion-slide-visible-bottom>Yes, just scroll down</h2>
      <img
        class="bounce-animation"
        v-motion-roll-bottom
        src="~/assets/img/arrow-down.svg"
        alt=""
        aria-hidden="true"
      />
    </div>
  </section>
</template>

<script>
// Inline 2D simplex noise — no external dependency
function createNoise() {
  const grad3 = [
    [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
    [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
    [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]
  ];
  const p = [];
  for (let i = 0; i < 256; i++) p[i] = Math.floor(Math.random() * 256);
  const perm = new Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  function dot(g, x, y) { return g[0] * x + g[1] * y; }

  return function noise2D(xin, yin) {
    const F2 = 0.5 * (Math.sqrt(3) - 1);
    const G2 = (3 - Math.sqrt(3)) / 6;
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const x0 = xin - (i - t);
    const y0 = yin - (j - t);
    const i1 = x0 > y0 ? 1 : 0;
    const j1 = x0 > y0 ? 0 : 1;
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;
    const ii = i & 255;
    const jj = j & 255;
    let n0 = 0, n1 = 0, n2 = 0;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) { t0 *= t0; n0 = t0 * t0 * dot(grad3[perm[ii + perm[jj]] % 12], x0, y0); }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) { t1 *= t1; n1 = t1 * t1 * dot(grad3[perm[ii + i1 + perm[jj + j1]] % 12], x1, y1); }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) { t2 *= t2; n2 = t2 * t2 * dot(grad3[perm[ii + 1 + perm[jj + 1]] % 12], x2, y2); }
    return 70 * (n0 + n1 + n2);
  };
}

export default {
  data() {
    return {
      canvas: null,
      ctx: null,
      width: 0,
      height: 0,
      particles: [],
      mouse: { x: -9999, y: -9999 },
      animationId: null,
      isVisible: false,
      prefersReducedMotion: false,
      intersectionObserver: null,
      noise: null,
      time: 0,
      resizeTimeout: null,
    };
  },
  mounted() {
    if (typeof window === 'undefined' || !this.$refs.particleCanvas) return;

    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.prefersReducedMotion) return;

    this.noise = createNoise();
    this.initCanvas();
    this.initParticles();

    if ('IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && !this.animationId) {
            this.animate();
          } else if (!this.isVisible && this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
          }
        });
      }, { threshold: 0.1 });
      this.intersectionObserver.observe(this.$refs.heroSection);
    } else {
      this.isVisible = true;
      this.animate();
    }

    this.$refs.heroSection.addEventListener('mousemove', this.handleMouseMove);
    this.$refs.heroSection.addEventListener('mouseleave', this.handleMouseLeave);
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    if (typeof window === 'undefined') return;
    if (this.$refs.heroSection) {
      this.$refs.heroSection.removeEventListener('mousemove', this.handleMouseMove);
      this.$refs.heroSection.removeEventListener('mouseleave', this.handleMouseLeave);
    }
    window.removeEventListener('resize', this.handleResize);
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    if (this.intersectionObserver) this.intersectionObserver.disconnect();
  },
  methods: {
    initCanvas() {
      this.canvas = this.$refs.particleCanvas;
      this.ctx = this.canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = this.$refs.heroSection.getBoundingClientRect();
      this.width = rect.width;
      this.height = rect.height;
      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.canvas.style.width = this.width + 'px';
      this.canvas.style.height = this.height + 'px';
      this.ctx.scale(dpr, dpr);
    },
    initParticles() {
      const count = window.innerWidth <= 768 ? 40 : 100;
      this.particles = [];
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          baseX: Math.random() * this.width,
          baseY: Math.random() * this.height,
          size: 1.5 + Math.random() * 2.5,
          opacity: 0.15 + Math.random() * 0.55,
          noiseOffsetX: Math.random() * 1000,
          noiseOffsetY: Math.random() * 1000,
        });
      }
    },
    handleMouseMove(e) {
      const rect = this.$refs.heroSection.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    },
    handleMouseLeave() {
      this.mouse.x = -9999;
      this.mouse.y = -9999;
    },
    handleResize() {
      if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.initCanvas();
        this.initParticles();
      }, 250);
    },
    animate() {
      if (!this.ctx || !this.isVisible) return;

      this.ctx.clearRect(0, 0, this.width, this.height);
      this.time += 0.003;

      const mouseRadius = 150;
      const isMobile = window.innerWidth <= 768;

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        // Noise-based organic drift
        const nx = this.noise(p.noiseOffsetX + this.time, p.noiseOffsetY) * 60;
        const ny = this.noise(p.noiseOffsetY + this.time, p.noiseOffsetX) * 60;
        p.x = p.baseX + nx;
        p.y = p.baseY + ny;

        // Mouse repel (desktop only)
        if (!isMobile && this.mouse.x > -9000) {
          const dx = p.x - this.mouse.x;
          const dy = p.y - this.mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 50;
            p.y += Math.sin(angle) * force * 50;
          }
        }

        // Draw particle
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(208, 255, 0, ${p.opacity})`;
        this.ctx.fill();

        // Draw connection lines between nearby particles
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const lineOpacity = (1 - dist / 100) * 0.15;
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = `rgba(208, 255, 0, ${lineOpacity})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
          }
        }
      }

      this.animationId = requestAnimationFrame(this.animate);
    },
  },
};
</script>

<style scoped>
.hero-section {
  background-color: var(--color-black);
  background-image: url("~/assets/img/heroUpscale-min.png");
  background-size: contain;
  background-position: right;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: var(--color-white);
  position: relative;
  overflow: hidden;
}

.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
}

@media (max-width: 768px) {
  .hero-section {
    background-attachment: scroll;
    background-position: center bottom;
    background-size: 100% auto;
  }
}
</style>
