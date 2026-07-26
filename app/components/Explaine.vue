<template>
  <section class="more-padding">
    <div class="content-container">
      <h2 v-parallax="0.35" v-motion-slide-visible-left>What I do</h2>
      <p v-motion-fade-visible>Core disciplines covering strategy, design, code, and creative experimentation</p>
      <div class="discipline-container">
        <article class="box" v-for="(discipline, index) in disciplines" :key="index" v-motion-pop-visible :style="{ transitionDelay: index * 100 + 'ms' }">
          <span class="discipline-index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3 class="discipline-headline">{{ discipline.headline }}</h3>
          <p class="discipline-text">{{ discipline.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      disciplines: [
        {
          headline: "Digital Strategy",
          text: "I figure out what users actually need (not what they say they need), what the market wants, and how to make stakeholders happy. Then I make a plan that doesn't suck.",
        },
        {
          headline: "Creative coding",
          text: "I write code to create art. Generative designs, interactive experiences, weird experiments. Sometimes it's useful, sometimes it's just cool. Both are valid.",
        },
        {
          headline: "Concept development",
          text: "I take wild ideas and turn them into something real. I explore, break things, refine, and push boundaries until it's actually good. Sometimes it works, sometimes it doesn't. That's the fun part.",
        },
        {
          headline: "Digital design",
          text: "I design digital experiences. UX flows, UI components, micro-interactions, motion design - I make interfaces that feel good to use. Design systems, component libraries, and that perfect easing curve for a hover state.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.discipline-container {
  display: flex;
  flex-wrap: wrap;
}

.box {
  position: relative;
  width: calc(33.33% - 20px);
  padding: 8px 8px 8px 32px;
  margin: 32px;
  border-left: 2px solid var(--color-black);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Animated accent: a lime line that grows down the left edge on hover. */
.box::before {
  content: '';
  position: absolute;
  left: -2px;
  top: 0;
  width: 2px;
  height: 0;
  background: var(--color-accent);
  box-shadow: 0 0 12px rgba(208, 255, 0, 0.6);
  transition: height 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.box:hover {
  transform: translateX(6px);
}

.box:hover::before {
  height: 100%;
}

.discipline-index {
  display: block;
  font-family: "Space Grotesk", "Inter", sans-serif;
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.15em;
  color: rgba(37, 37, 37, 0.35);
  margin-bottom: 12px;
  transition: color 0.3s ease;
}

.box:hover .discipline-index {
  color: var(--color-accent);
  text-shadow: 0 0 14px rgba(208, 255, 0, 0.5);
}

.discipline-headline {
  font-size: var(--text-lg);
  margin: 0 0 16px 0;
}

@media (prefers-reduced-motion: reduce) {
  .box,
  .box::before {
    transition: none;
  }
  .box:hover {
    transform: none;
  }
}

.discipline-text {
  font-size: var(--text-base);
  line-height: 1.4;
  margin: 0;
  font-weight: 200;
}

@media (max-width: 768px) {
  .discipline-container {
    flex-direction: column;
  }

  .box {
    width: 90%;
    margin: 16px 0;
  }

  .discipline-headline {
    margin-bottom: 8px;
  }
}

@media (max-width: 480px) {
  .box {
    padding: 8px 8px 8px 16px;
    margin: 12px 0;
  }
}
</style>
