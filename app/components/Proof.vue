<template>
  <section>
    <div class="content-container">
      <h2 v-parallax="0.35" v-motion-slide-visible-left>{{ headline }}</h2>
      <p v-motion-fade-visible>Companies and organizations I've worked with on digital design and development over the years</p>
      <div class="logo-row" v-motion-fade-visible>
        <div v-for="(logo, index) in companyLogos" :key="index" class="logo-item">
          <img :src="logo.url" :alt="logo.name" loading="lazy" decoding="async" v-motion-pop-visible />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      headline: "Previous clients",
      companyLogos: [],
    };
  },
  created() {
    // Get baseURL from app config (works in both SSR and client)
    const { $config } = useNuxtApp();
    const baseURL = $config?.app?.baseURL || '/';
    // Remove trailing slash if present (baseURL already includes it)
    const cleanBaseURL = baseURL.endsWith('/') ? baseURL : `${baseURL}/`;
    this.companyLogos = [
      { id: 1, name: "Carlsberg", url: `${cleanBaseURL}logos/logo_cb.svg` },
      { id: 2, name: "Danske Bank", url: `${cleanBaseURL}logos/logo_db.svg` },
      { id: 3, name: "Københavns universitet", url: `${cleanBaseURL}logos/logo_ku.png` },
      { id: 4, name: "Native Instruments", url: `${cleanBaseURL}logos/logo_ni.svg` },
      { id: 5, name: "Psykiatrifonden", url: `${cleanBaseURL}logos/logo_pf.png` },
      { id: 6, name: "Roskilde Festival", url: `${cleanBaseURL}logos/logo_rf.png` },
      { id: 7, name: "TDC", url: `${cleanBaseURL}logos/logo_TDC.svg` },
      { id: 8, name: "YouSee", url: `${cleanBaseURL}logos/logo_ys.svg` },
      { id: 9, name: "Rockwool", url: `${cleanBaseURL}logos/logo_rw.png` },
      { id: 10, name: "DSB", url: `${cleanBaseURL}logos/logo_dsb.svg` },
      { id: 11, name: "Skattestyrelsen", url: `${cleanBaseURL}logos/logo_ss.svg` },
      { id: 12, name: "3", url: `${cleanBaseURL}logos/logo_3.svg` },
      { id: 13, name: "mobilepay", url: `${cleanBaseURL}logos/logo_mp.svg` },
      { id: 14, name: "atp", url: `${cleanBaseURL}logos/logo_atp.svg` },
      { id: 15, name: "forsvaret", url: `${cleanBaseURL}logos/logo_f.svg` },
      { id: 16, name: "Output", url: `${cleanBaseURL}logos/logo_out.svg` },
      { id: 17, name: "BMS", url: `${cleanBaseURL}logos/logo_bms.svg` },
      { id: 18, name: "SUS", url: `${cleanBaseURL}logos/logo_sus.svg` },
    ];
  },
};
</script>

<style scoped>
.logo-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 48px 0 48px 0;
}

.logo-item {
  margin: 40px;
}

.logo-item img {
  height: 100px;
  opacity: 0.55;
  filter: grayscale(100%);
  transition: opacity 0.3s ease, filter 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.logo-item:hover img {
  opacity: 1;
  filter: grayscale(0%);
  transform: translateY(-4px) scale(1.04);
}

@media (prefers-reduced-motion: reduce) {
  .logo-item img {
    transition: none;
  }
  .logo-item:hover img {
    transform: none;
  }
}

@media (max-width: 768px) {
  .logo-item {
    margin: 8px;
  }

  .logo-item img {
    height: 64px;
  }

  .logo-row {
    justify-content: space-around;
  }
}

@media (max-width: 480px) {
  .logo-item img {
    height: 48px;
  }
  
  .logo-row {
    margin: 24px 0;
  }
}
</style>
