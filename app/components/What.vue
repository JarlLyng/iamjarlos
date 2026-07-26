<template>
  <section class="what-section" ref="whatSection">
    <canvas ref="gridCanvas" class="grid-canvas" aria-hidden="true"></canvas>
    <div class="what-container">
      <div class="what-content">
        <div class="heading-wrapper">
          <h2 class="bold-heading" v-motion-slide-visible-left>
            <span class="text-line">I do creative</span>
            <span class="text-line">projects</span>
          </h2>
          <p class="light-heading" v-motion-slide-visible-bottom>
            <span class="text-line">Sometimes I do it</span>
            <span class="text-line">for money</span>
          </p>
        </div>
        <div class="text-content" v-motion-fade-visible>
          <p>
            I'm a full stack digital designer and developer based in Denmark, with 15+ years behind me across design strategy, UX/UI, interaction design and creative coding. I build the things I want to exist: native iOS and macOS apps, web apps, and small open-source tools.
          </p>
          <p>
            On any given week I'm writing Vue, Nuxt, React or Swift, tweaking a motion curve for too long, or sketching out the next weird side project. Along the way I've worked with Carlsberg, Danske Bank, Native Instruments, DSB and Roskilde Festival, but the indie stuff is what I keep coming back to.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      ctx: null,
      width: 0,
      height: 0,
      mouse: { x: -9999, y: -9999 },
      squareSize: 80,
      grid: [],
      animationId: null,
      resizeTimeout: null,
      isVisible: false,
      prefersReducedMotion: false,
      intersectionObserver: null,
    };
  },
  mounted() {
    if (typeof window !== 'undefined' && this.$refs.gridCanvas) {
      // Check for reduced motion preference
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (this.prefersReducedMotion) {
        return; // Don't initialize animation if user prefers reduced motion
      }

      this.initCanvas();
      this.initGrid();
      
      // Use Intersection Observer to pause animation when offscreen
      if ('IntersectionObserver' in window) {
        this.intersectionObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            this.isVisible = entry.isIntersecting;
            if (this.isVisible && !this.animationId) {
              this.drawGrid();
            } else if (!this.isVisible && this.animationId) {
              if (window.cancelAnimationFrame) {
                window.cancelAnimationFrame(this.animationId);
              }
              this.animationId = null;
            }
          });
        }, {
          threshold: 0.1
        });
        
        if (this.$refs.whatSection) {
          this.intersectionObserver.observe(this.$refs.whatSection);
        }
      } else {
        // Fallback: start animation immediately if IntersectionObserver not supported
        this.isVisible = true;
        this.drawGrid();
      }
      
      // Only listen to mouse events within the section
      if (this.$refs.whatSection) {
        this.$refs.whatSection.addEventListener("mousemove", this.handleMouseMove);
      }
      window.addEventListener("resize", this.handleResize);
    }
  },
  beforeUnmount() {
    if (typeof window !== 'undefined') {
      if (this.$refs.whatSection) {
        this.$refs.whatSection.removeEventListener("mousemove", this.handleMouseMove);
      }
      window.removeEventListener("resize", this.handleResize);
      if (this.animationId && window.cancelAnimationFrame) {
        window.cancelAnimationFrame(this.animationId);
      }
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect();
      }
    }
  },
  methods: {
    initCanvas() {
      this.canvas = this.$refs.gridCanvas;
      this.ctx = this.canvas.getContext("2d");
      this.width = this.canvas.width = window.innerWidth;
      const sectionHeight = this.$refs.whatSection?.offsetHeight || window.innerHeight;
      this.height = this.canvas.height = sectionHeight;
    },
    initGrid() {
      this.grid = [];
      for (let x = 0; x < this.width; x += this.squareSize) {
        for (let y = 0; y < this.height; y += this.squareSize) {
          this.grid.push({
            x,
            y,
            alpha: 0,
            fading: false,
            lastTouched: 0,
          });
        }
      }
    },
    getCellAt(x, y) {
      return this.grid.find(cell =>
        x >= cell.x && x < cell.x + this.squareSize &&
        y >= cell.y && y < cell.y + this.squareSize
      );
    },
    handleMouseMove(e) {
      if (!this.$refs.whatSection) return;
      
      const rect = this.$refs.whatSection.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      
      const cell = this.getCellAt(this.mouse.x, this.mouse.y);
      if (cell && cell.alpha === 0) {
        cell.alpha = 1;
        cell.lastTouched = Date.now();
        cell.fading = false;
      }
    },
    handleResize() {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      
      this.resizeTimeout = setTimeout(() => {
        this.width = this.canvas.width = window.innerWidth;
        const sectionHeight = this.$refs.whatSection?.offsetHeight || window.innerHeight;
        this.height = this.canvas.height = sectionHeight;
        this.initGrid();
      }, 250);
    },
    drawGrid() {
      if (!this.ctx || !this.canvas || !this.isVisible) {
        return;
      }
      
      this.ctx.clearRect(0, 0, this.width, this.height);
      const now = Date.now();
      
      for (let i = 0; i < this.grid.length; i++) {
        const cell = this.grid[i];
        
        // Start fading after 500ms
        if (cell.alpha > 0 && !cell.fading && now - cell.lastTouched > 500) {
          cell.fading = true;
        }
        
        if (cell.fading) {
          cell.alpha -= 0.02;
          if (cell.alpha <= 0) {
            cell.alpha = 0;
            cell.fading = false;
          }
        }
        
        if (cell.alpha > 0) {
          const centerX = cell.x + this.squareSize / 2;
          const centerY = cell.y + this.squareSize / 2;
          const gradient = this.ctx.createRadialGradient(
            centerX, centerY, 5,
            centerX, centerY, this.squareSize
          );
          
          // Use accent color
          gradient.addColorStop(0, `rgba(208, 255, 0, ${cell.alpha})`);
          gradient.addColorStop(1, `rgba(208, 255, 0, 0)`);
          
          this.ctx.strokeStyle = gradient;
          this.ctx.lineWidth = 1.3;
          this.ctx.strokeRect(cell.x + 0.5, cell.y + 0.5, this.squareSize - 1, this.squareSize - 1);
        }
      }
      
      if (this.isVisible) {
        this.animationId = window.requestAnimationFrame(this.drawGrid);
      }
    },
  },
};
</script>

<style scoped>
.what-section {
  background-color: var(--color-black);
  /* Portrait as background, full figure on the right — same treatment the
     original hero used, so nothing gets cropped and the text keeps its width. */
  background-image: url("~/assets/img/heroUpscale-min.png");
  background-size: contain;
  background-position: right bottom;
  background-repeat: no-repeat;
  color: var(--color-white);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.grid-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
  z-index: 1;
}

.what-container {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 5vw;
}

.what-content {
  max-width: 90vw;
  width: 100%;
}

.heading-wrapper {
  margin-bottom: 48px;
}

.text-line {
  display: block;
  position: relative;
  overflow: hidden;
}

.text-content p {
  font-size: var(--text-base);
  line-height: 1.8;
  margin-bottom: 24px;
  font-weight: 200;
  /* Stop before the portrait on the right; cap line length for readability. */
  max-width: min(58ch, 52%);
}

@media (max-width: 1024px) {
  .what-container {
    padding: 80px 5vw;
  }

  .text-content p {
    max-width: 65%;
  }

  .grid-canvas {
    pointer-events: auto;
  }
}

@media (max-width: 768px) {
  .text-content p {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .what-container {
    padding: 60px 5vw;
  }

  .heading-wrapper {
    margin-bottom: 32px;
  }

  .what-section {
    background-position: center bottom;
    background-size: 100% auto;
  }
}
</style>
