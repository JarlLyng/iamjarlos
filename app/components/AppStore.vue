<template>
  <section class="more-padding">
    <div class="content-container">
      <h2 v-motion-slide-visible-left>Apps on the App Store</h2>
      <p class="light-heading" v-motion-slide-visible-bottom>I also make native apps</p>
      <p v-motion-fade-visible>
        Everything I've shipped for iPhone, iPad, Mac, Apple Watch and Apple TV, gathered in one place.
      </p>
      <a
        href="https://apps.apple.com/us/developer/iamjarl/id1874114386"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View IAMJARL apps on the App Store"
        class="appstore-card"
        v-motion-pop-visible
        @pointermove="onGlow"
        @pointerleave="onGlowLeave"
      >
        <span class="appstore-glow" aria-hidden="true"></span>
        <svg class="apple-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" aria-hidden="true">
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" fill="currentColor"/>
        </svg>
        <div class="appstore-text">
          <span class="appstore-label">View my apps on the</span>
          <span class="appstore-title">App Store</span>
        </div>
        <Icon name="ph:arrow-up-right" class="appstore-arrow" aria-hidden="true" />
      </a>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    onGlow(e) {
      const card = e.currentTarget;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    },
    onGlowLeave(e) {
      e.currentTarget.style.removeProperty('--mx');
      e.currentTarget.style.removeProperty('--my');
    },
  },
};
</script>

<style scoped>
.appstore-card {
  --mx: 50%;
  --my: 50%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 48px;
  padding: 32px 40px;
  border-left: 2px solid var(--color-black);
  text-decoration: none;
  color: var(--color-black);
  transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
}

.appstore-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: radial-gradient(260px circle at var(--mx) var(--my), rgba(208, 255, 0, 0.25), transparent 60%);
}

.appstore-card:hover .appstore-glow {
  opacity: 1;
}

.appstore-card:hover {
  background-color: var(--color-black);
  color: var(--color-accent);
  transform: translateX(4px);
}

.appstore-card:hover .appstore-arrow {
  color: var(--color-accent);
  transform: translate(2px, -2px);
}

.apple-logo {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.appstore-text {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.appstore-label {
  font-size: var(--text-sm);
  font-weight: 200;
  opacity: 0.7;
}

.appstore-title {
  font-size: var(--text-xl);
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1.1;
}

.appstore-arrow {
  font-size: 40px;
  transition: transform 0.25s ease, color 0.25s ease;
}

@media (max-width: 768px) {
  .appstore-card {
    padding: 20px 20px 20px 24px;
    margin-top: 32px;
    gap: 16px;
  }
  .apple-logo {
    width: 32px;
    height: 32px;
  }
  .appstore-arrow {
    font-size: 28px;
  }
}
</style>
