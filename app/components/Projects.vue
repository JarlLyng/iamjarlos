<template>
  <section class="more-padding">
    <div class="content-container">
      <h2 class="bold-heading" v-motion-slide-visible-left>Some side projects</h2>
      <p class="light-heading" v-motion-slide-visible-bottom>Things I made when I felt like it</p>
      
      <div class="projects-grid" v-motion-fade-visible>
        <a
          v-for="project in projects"
          :key="project.id"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Visit ${project.title} project`"
          class="project-card"
          v-motion-pop-visible
          @pointermove="onTilt"
          @pointerleave="onTiltLeave"
        >
          <div class="card-inner">
            <span class="card-glow" aria-hidden="true"></span>
            <div class="project-thumbnail glitch-wrap">
              <img
                :src="project.thumbnail"
                :alt="`Thumbnail for ${project.title}`"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="project-info">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { projects } from '~/data/projects';

export default {
  data() {
    return {
      projects: [],
      tiltEnabled: false,
    };
  },
  created() {
    // Get baseURL from app config (works in both SSR and client)
    const { $config } = useNuxtApp();
    const baseURL = $config?.app?.baseURL || '/';
    const cleanBaseURL = baseURL.endsWith('/') ? baseURL : `${baseURL}/`;
    this.projects = projects.map((p) => ({
      ...p,
      thumbnail: `${cleanBaseURL}img/projects/${p.thumbnail}`,
    }));
  },
  mounted() {
    if (typeof window === 'undefined') return;
    // Only tilt on fine pointers (mouse), and never under reduced-motion.
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.tiltEnabled = fine && !reduced;
  },
  methods: {
    onTilt(e) {
      if (!this.tiltEnabled) return;
      const card = e.currentTarget;
      const inner = card.querySelector('.card-inner');
      if (!inner) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;   // 0..1
      const py = (e.clientY - r.top) / r.height;   // 0..1
      const rotY = (px - 0.5) * 12;                // deg
      const rotX = (0.5 - py) * 12;
      // Set the transform inline on the inner element. v-motion owns the outer
      // <a>'s inline transform (the reveal), so tilting the inner avoids a clash.
      inner.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(24px)`;
      inner.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
    },
    onTiltLeave(e) {
      const inner = e.currentTarget.querySelector('.card-inner');
      if (!inner) return;
      inner.style.transform = '';
      inner.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease';
    },
  },
};
</script>
<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
  margin-top: 64px;
  perspective: 1200px;
}

.project-card {
  --mx: 50%;
  --my: 50%;
  display: block;
  text-decoration: none;
  color: var(--color-black);
  border-radius: 6px;
}

.card-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 2px solid transparent;
  border-radius: 6px;
  background: var(--color-white);
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover .card-inner {
  border-color: var(--color-accent);
  box-shadow: 0 18px 50px -18px rgba(0, 0, 0, 0.45), 0 0 24px rgba(208, 255, 0, 0.25);
}

/* Lime glow that tracks the pointer across the card. */
.card-glow {
  position: absolute;
  inset: 0;
  border-radius: 6px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: radial-gradient(240px circle at var(--mx) var(--my), rgba(208, 255, 0, 0.22), transparent 60%);
  z-index: 3;
}

.project-card:hover .card-glow { opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  .card-inner {
    transform: none !important;
    transition: none;
  }
}

.project-thumbnail {
  width: 100%;
  height: 300px;
  overflow: hidden;
  background-color: var(--color-white);
  border: 1px solid var(--color-black);
  margin-bottom: 24px;
}

.project-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* Glitch effect on hover */
.glitch-wrap {
  position: relative;
}

.project-card:hover .glitch-wrap img {
  animation: glitch-img 0.4s steps(2) infinite;
}

.glitch-wrap::before,
.glitch-wrap::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  opacity: 0;
  pointer-events: none;
  z-index: 1;
}

.project-card:hover .glitch-wrap::before {
  opacity: 0.6;
  animation: glitch-before 0.4s steps(2) infinite;
  mix-blend-mode: screen;
  background-color: rgba(208, 255, 0, 0.15);
}

.project-card:hover .glitch-wrap::after {
  opacity: 0.6;
  animation: glitch-after 0.4s steps(2) infinite;
  mix-blend-mode: multiply;
  background-color: rgba(208, 255, 0, 0.1);
}

@keyframes glitch-img {
  0% { transform: translate(0); }
  25% { transform: translate(-2px, 1px); }
  50% { transform: translate(2px, -1px); }
  75% { transform: translate(-1px, -2px); }
  100% { transform: translate(0); }
}

@keyframes glitch-before {
  0% { clip-path: inset(0 0 85% 0); transform: translate(3px, 0); }
  25% { clip-path: inset(20% 0 60% 0); transform: translate(-3px, 0); }
  50% { clip-path: inset(50% 0 20% 0); transform: translate(2px, 0); }
  75% { clip-path: inset(70% 0 5% 0); transform: translate(-2px, 0); }
  100% { clip-path: inset(10% 0 70% 0); transform: translate(3px, 0); }
}

@keyframes glitch-after {
  0% { clip-path: inset(60% 0 10% 0); transform: translate(-3px, 0); }
  25% { clip-path: inset(5% 0 75% 0); transform: translate(2px, 0); }
  50% { clip-path: inset(30% 0 40% 0); transform: translate(-2px, 0); }
  75% { clip-path: inset(80% 0 0% 0); transform: translate(3px, 0); }
  100% { clip-path: inset(40% 0 30% 0); transform: translate(-3px, 0); }
}

.project-info {
  padding: 0 8px;
}

.project-title {
  font-size: var(--text-xl);
  font-weight: 900;
  margin: 0 0 12px 0;
  text-transform: uppercase;
}

.project-description {
  font-size: var(--text-base);
  font-weight: 200;
  line-height: 1.6;
  margin: 0;
  color: var(--color-black);
}

@media (max-width: 1024px) {
  .projects-grid {
    gap: 40px;
  }

  .project-thumbnail {
    height: 250px;
  }
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 32px;
    margin-top: 48px;
  }

  .project-thumbnail {
    height: 200px;
    margin-bottom: 16px;
  }

  .project-card {
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .project-thumbnail {
    height: 180px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card:hover .glitch-wrap img,
  .project-card:hover .glitch-wrap::before,
  .project-card:hover .glitch-wrap::after {
    animation: none;
  }
}
</style>

