<template>
  <section class="more-padding">
    <div class="content-container">
      <h2 v-motion-slide-visible-left>Who you gonna call</h2>
      <p class="light-heading" v-motion-slide-visible-bottom>Here is how you can reach me</p>
      <p v-motion-fade-visible>
        I'm always up for solving new digital challenges and I take my coffee with a little bit of milk.
      </p>
      <ul class="contact-grid" v-motion-slide-visible-bottom>
        <li v-for="(contact, index) in contacts" :key="contact.name" :style="{ transitionDelay: index * 80 + 'ms' }">
          <a
            :href="contact.link"
            :target="contact.link.startsWith('mailto:') ? '_self' : '_blank'"
            rel="noopener noreferrer"
            :aria-label="`${contact.name}: ${contact.text}`"
            class="contact-card"
            @pointermove="onGlow"
            @pointerleave="onGlowLeave"
          >
            <span class="contact-glow" aria-hidden="true"></span>
            <Icon :name="contact.icon" class="contact-icon" aria-hidden="true" />
            <div class="contact-text">
              <span class="contact-name">{{ contact.name }}</span>
              <span class="contact-handle">{{ contact.text }}</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      contacts: [
        {
          name: "Email",
          icon: "ph:envelope",
          link: "mailto:jarl@iamjarl.com",
          text: "jarl@iamjarl.com",
        },
        {
          name: "LinkedIn",
          icon: "ph:linkedin-logo",
          link: "https://www.linkedin.com/in/jarl-lyng-0a364719/",
          text: "/jarllyng",
        },
        {
          name: "Medium",
          icon: "ph:medium-logo",
          link: "https://medium.com/@jarllyng",
          text: "@jarllyng",
        },
        {
          name: "GitHub",
          icon: "ph:github-logo",
          link: "https://github.com/JarlLyng",
          text: "/JarlLyng",
        },
      ],
    };
  },
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
.contact-grid {
  list-style: none;
  padding: 0;
  margin: 3rem 0 0 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.contact-card {
  --mx: 50%;
  --my: 50%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 28px;
  border-left: 2px solid var(--color-black);
  color: var(--color-black);
  text-decoration: none;
  transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
}

/* Lime glow that tracks the pointer, visible on the inverted hover state. */
.contact-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: radial-gradient(200px circle at var(--mx) var(--my), rgba(208, 255, 0, 0.25), transparent 60%);
}

.contact-card:hover .contact-glow {
  opacity: 1;
}

.contact-card:hover {
  background-color: var(--color-black);
  color: var(--color-accent);
  transform: translateX(4px);
}

.contact-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.contact-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.contact-name {
  font-size: var(--text-xs);
  font-weight: 200;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.contact-handle {
  font-size: var(--text-lg);
  font-weight: 900;
  line-height: 1.2;
  word-break: break-word;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .contact-card {
    padding: 18px 20px;
    gap: 16px;
  }
  .contact-icon {
    font-size: 28px;
  }
}
</style>
