<template>
  <section class="more-padding" aria-label="Tools and technologies">
    <div class="content-container">
      <h2 class="bold-heading" v-motion-slide-visible-left>Weapons of choice</h2>
      <p class="light-heading" v-motion-slide-visible-bottom>And always seeking new ones</p>
      
      <div class="tools-grid">
        <button 
          v-for="tool in tools" 
          :key="tool.name" 
             class="tool-item" 
             @click="openLink(tool.url)"
          :aria-label="`Visit ${tool.name} website`"
          v-motion-pop-visible
        >
          <img 
            :src="getLogoUrl(tool.logoName)" 
            :alt="`${tool.name} logo`"
            class="tool-logo"
            loading="lazy"
            @error="handleImageError"
          />
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tools: [
        { name: "figma", logoName: "figma.com", url: "https://www.figma.com" },
        { name: "creative-cloud", logoName: "adobe.com", url: "https://www.adobe.com/creativecloud.html" },
        { name: "xcode", logoName: "developer.apple.com", url: "https://developer.apple.com/xcode/" },
        { name: "swift", logoName: "swift.org", url: "https://swift.org" },
        { name: "github", logoName: "github.com", url: "https://github.com" },
        { name: "vscode", logoName: "code.visualstudio.com", url: "https://code.visualstudio.com" },
        { name: "vue", logoName: "vuejs.org", url: "https://vuejs.org" },
        { name: "nuxt", logoName: "nuxt.com", url: "https://nuxt.com" },
        { name: "react", logoName: "reactjs.org", url: "https://reactjs.org" },
        { name: "typescript", logoName: "typescriptlang.org", url: "https://www.typescriptlang.org" },
        { name: "tailwind", logoName: "tailwindcss.com", url: "https://tailwindcss.com" },
        { name: "firebase", logoName: "firebase.google.com", url: "https://firebase.google.com" },
        { name: "svelte", logoName: "svelte.dev", url: "https://svelte.dev" },
        { name: "astro", logoName: "astro.build", url: "https://astro.build" },
        { name: "blender", logoName: "blender.org", url: "https://www.blender.org" },
        { name: "threejs", logoName: "threejs.org", url: "https://threejs.org" },
        { name: "ableton", logoName: "ableton.com", url: "https://www.ableton.com" },
        { name: "claude", logoName: "claude.ai", url: "https://claude.ai" },
        { name: "openai", logoName: "openai.com", url: "https://openai.com" },
        { name: "huggingface", logoName: "huggingface.co", url: "https://huggingface.co" },
        { name: "cursor", logoName: "cursor.com", url: "https://cursor.com" },
        { name: "github-copilot", logoName: "github.com", url: "https://github.com/features/copilot" }
      ],
      logoDevApiKey: '',
    };
  },
  created() {
    // Use useRuntimeConfig() composable in Options API via useNuxtApp()
    const { $config } = useNuxtApp();
    this.logoDevApiKey = $config?.public?.logoDevApiKey || '';
  },
  methods: {
    getLogoUrl(logoName) {
      // logo.dev API format: https://img.logo.dev/{domain}?token={api_key}
      if (!this.logoDevApiKey) {
        if (import.meta.dev) {
          console.warn('Logo.dev API key is not set. Please add LOGO_DEV_API_KEY to your environment variables.');
        }
        return ''; // Return empty string if no API key
      }
      return `https://img.logo.dev/${logoName}?token=${this.logoDevApiKey}`;
    },
    handleImageError(event) {
      // Fallback: hide broken images or show placeholder
      event.target.style.display = 'none';
    },
    openLink(url) {
      if (typeof window !== 'undefined' && url) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    },
  },
};
</script>

<style scoped>
.tools-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* Fast 6 kolonner */
  gap: 48px 64px; /* 48px vertikal, 64px horisontal gap */
  margin-top: 24px;
  max-width: 1200px;
  margin: 48px auto;
}

@media (max-width: 1024px) {
  .tools-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 40px 48px;
  }
}

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px 40px;
  }
}

@media (max-width: 480px) {
  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 32px;
  }
}

.tool-item {
  width: 64px;
  height: 64px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s, filter 0.2s, box-shadow 0.2s;
  filter: grayscale(100%);
  margin: 0 auto; /* Center ikonerne i deres grid-celler */
  background: none;
  border: none;
  outline: none;
}

.tool-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
  transition: filter 0.2s;
}

.tool-item:focus-visible {
  outline: 2px solid var(--color-black);
  outline-offset: 2px;
  border-radius: 4px;
}

.tool-item:hover {
  transform: scale(1.1);
  filter: grayscale(0%);
  box-shadow: 0 0 16px rgba(208, 255, 0, 0.3);
  border-radius: 8px;
}
</style>
