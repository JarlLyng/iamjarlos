<template>
  <section class="hero-section" ref="heroSection">
    <canvas ref="glCanvas" class="gl-canvas" aria-hidden="true"></canvas>
    <div class="hero-scrim" aria-hidden="true"></div>
    <div class="hero-noise" aria-hidden="true"></div>
    <div class="content-container hero-content">
      <p class="hero-kicker" v-motion-fade-visible>Indie apps &amp; digital design</p>
      <h1 class="hero-title">
        <span class="reveal-line"><span>Hi! I am Jarl</span></span>
      </h1>
      <h2 class="hero-sub">
        <span class="reveal-line reveal-delay"><span>Yes, just scroll down</span></span>
      </h2>
      <div class="scroll-cue" aria-hidden="true">
        <span class="scroll-cue__dot"></span>
      </div>
    </div>
  </section>
</template>

<script>
import { markRaw } from 'vue';
import * as THREE from 'three';

// GLSL 3D simplex noise (Ashima / Stefan Gustavson) — used to displace the mesh.
const SNOISE = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+1.0*C.xxx; vec3 x2=x0-i2+2.0*C.xxx; vec3 x3=x0-1.0+3.0*C.xxx;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const VERT = `
uniform float uTime;
uniform float uAmp;
varying float vDisp;
varying vec3 vNormal;
${SNOISE}
void main(){
  float n = snoise(normal * 1.6 + uTime * 0.28);
  float n2 = snoise(normal * 3.4 - uTime * 0.18) * 0.4;
  float disp = (n + n2) * uAmp;
  vDisp = disp;
  vNormal = normal;
  vec3 pos = position + normal * disp;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`;

const FRAG = `
precision highp float;
uniform vec3 uColorLo;
uniform vec3 uColorHi;
uniform float uAlpha;
varying float vDisp;
void main(){
  float t = smoothstep(-0.25, 0.45, vDisp);
  vec3 col = mix(uColorLo, uColorHi, t);
  gl_FragColor = vec4(col, uAlpha);
}`;

// Points variant of the vertex shader: same displacement, plus a point size.
const VERT_POINTS = `
uniform float uTime;
uniform float uAmp;
varying float vDisp;
${SNOISE}
void main(){
  float n = snoise(normal * 1.6 + uTime * 0.28);
  float n2 = snoise(normal * 3.4 - uTime * 0.18) * 0.4;
  float disp = (n + n2) * uAmp;
  vDisp = disp;
  vec3 pos = position + normal * disp;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = (1.4 + disp * 2.5) * (150.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`;

const FRAG_POINTS = `
precision highp float;
uniform vec3 uColorHi;
varying float vDisp;
void main(){
  // soft round point
  vec2 d = gl_PointCoord - vec2(0.5);
  float a = smoothstep(0.5, 0.0, length(d));
  float bright = smoothstep(-0.1, 0.4, vDisp);
  gl_FragColor = vec4(uColorHi, a * (0.12 + bright * 0.4));
}`;

export default {
  // NOTE: none of these are reactive on purpose. Three.js objects must never
  // be wrapped in Vue's reactive proxies — the proxy breaks internal read-only
  // props like modelViewMatrix and the renderer silently draws nothing. We keep
  // all mutable render state as plain instance fields (three is markRaw'd too).
  data() {
    return {};
  },
  created() {
    this.reduced = false;
    this.raf = null;
    this.three = null;
    this.mouse = { x: 0, y: 0 };
    this.target = { x: 0, y: 0 };
    this.scrollProgress = 0;
    this.io = null;
    this.heroVisible = true;
    this.lastOpacity = -1;
  },
  mounted() {
    if (typeof window === 'undefined') return;
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ok = this.initScene();
    if (!ok) {
      this.$refs.heroSection?.classList.add('hero--fallback');
      return;
    }
    if (this.reduced) {
      this.renderOnce();
    } else {
      window.addEventListener('pointermove', this.onPointerMove, { passive: true });
      window.addEventListener('scroll', this.onScroll, { passive: true });
      // Pause the render loop entirely while the hero is off screen — the
      // single biggest win against scroll jank further down the page.
      if ('IntersectionObserver' in window) {
        this.io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            this.heroVisible = entry.isIntersecting;
            if (this.heroVisible && this.raf === null) {
              this.raf = requestAnimationFrame(this.loop);
            } else if (!this.heroVisible && this.raf !== null) {
              cancelAnimationFrame(this.raf);
              this.raf = null;
            }
          });
        }, { threshold: 0.01 });
        this.io.observe(this.$refs.heroSection);
      }
      this.raf = requestAnimationFrame(this.loop);
    }
    window.addEventListener('resize', this.onResize);
  },
  beforeUnmount() {
    if (typeof window === 'undefined') return;
    if (this.raf !== null) cancelAnimationFrame(this.raf);
    if (this.io) this.io.disconnect();
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    this.disposeScene();
  },
  methods: {
    initScene() {
      const canvas = this.$refs.glCanvas;
      const host = this.$refs.heroSection;
      if (!canvas || !host) return false;
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
      } catch (e) {
        return false; // no WebGL — CSS fallback
      }
      const w = host.clientWidth;
      const h = host.clientHeight;
      // Cap DPR at 1.5: with additive blending the fill-rate cost of 2x Retina
      // is the main jank source, and the soft glow hides the difference.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
      camera.position.set(0, 0, 4.8);

      // Centerpiece: displaced icosahedron rendered as a glowing lime wireframe.
      // Detail 5 => 20·4^5 = 20,480 faces: dense enough to read as an organic
      // wireframe, cheap enough to animate. (Higher detail values explode the
      // face count and must be avoided.)
      const geo = new THREE.IcosahedronGeometry(1, 4);
      const mat = new THREE.ShaderMaterial({
        wireframe: true,
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uAmp: { value: 0.3 },
          uColorLo: { value: new THREE.Color('#3a4600') },
          uColorHi: { value: new THREE.Color('#d0ff00') },
          uAlpha: { value: 0.32 },
        },
        vertexShader: VERT,
        fragmentShader: FRAG,
      });
      const mesh = new THREE.Mesh(geo, mat);

      // Group everything and nudge it toward center-right so the left-aligned
      // headline sits in clear space.
      const group = new THREE.Group();
      group.position.x = 1.15;
      group.add(mesh);
      scene.add(group);

      // Bright vertex points riding the same displaced surface — reads clearly
      // even when the thin wireframe lines wash out. Uses the same VERT shader.
      const vGeo = geo.clone();
      const vMat = new THREE.ShaderMaterial({
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        uniforms: mat.uniforms, // share uTime/uAmp/colors so points track the mesh
        vertexShader: VERT_POINTS,
        fragmentShader: FRAG_POINTS,
      });
      const surfacePoints = new THREE.Points(vGeo, vMat);
      group.add(surfacePoints);

      // Particle halo — lime dots drifting around the mesh.
      const count = window.innerWidth <= 768 ? 260 : 700;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 1.6 + Math.random() * 1.7;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({
        color: new THREE.Color('#d0ff00'),
        size: 0.03,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const points = new THREE.Points(pGeo, pMat);
      group.add(points);

      this.three = markRaw({ renderer, scene, camera, group, mesh, mat, points, surfacePoints, geo, vGeo, vMat, pGeo, pMat });
      return true;
    },
    renderFrame(t) {
      const { renderer, scene, camera, mesh, mat, points } = this.three;
      mat.uniforms.uTime.value = t;
      // mouse parallax
      this.target.x += (this.mouse.x - this.target.x) * 0.05;
      this.target.y += (this.mouse.y - this.target.y) * 0.05;
      mesh.rotation.y = t * 0.15 + this.target.x * 0.5;
      mesh.rotation.x = this.target.y * 0.4;
      this.three.surfacePoints.rotation.copy(mesh.rotation);
      points.rotation.y = t * 0.04 - this.target.x * 0.3;
      points.rotation.x = -this.target.y * 0.2;
      // scroll: dolly the camera back + fade as the hero leaves
      camera.position.z = 4.8 + this.scrollProgress * 2.2;
      // Avoid a style write (and the recalc it forces) unless the value moved.
      const opacity = Math.max(0, 1 - this.scrollProgress * 1.15);
      if (Math.abs(opacity - this.lastOpacity) > 0.01) {
        this.$refs.glCanvas.style.opacity = String(opacity);
        this.lastOpacity = opacity;
      }
      renderer.render(scene, camera);
    },
    loop(now) {
      this.renderFrame(now * 0.001);
      this.raf = requestAnimationFrame(this.loop);
    },
    renderOnce() {
      // Static, motion-free frame for reduced-motion users.
      this.renderFrame(2.0);
    },
    onPointerMove(e) {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    onScroll() {
      const h = this.$refs.heroSection?.offsetHeight || window.innerHeight;
      this.scrollProgress = Math.min(1, Math.max(0, window.scrollY / h));
    },
    onResize() {
      if (!this.three) return;
      const host = this.$refs.heroSection;
      const w = host.clientWidth;
      const h = host.clientHeight;
      this.three.renderer.setSize(w, h, false);
      this.three.camera.aspect = w / h;
      this.three.camera.updateProjectionMatrix();
      if (this.reduced) this.renderOnce();
    },
    disposeScene() {
      if (!this.three) return;
      const { renderer, geo, mat, vGeo, vMat, pGeo, pMat } = this.three;
      geo.dispose(); mat.dispose(); vGeo.dispose(); vMat.dispose(); pGeo.dispose(); pMat.dispose();
      renderer.dispose();
      this.three = null;
    },
  },
};
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
  background:
    radial-gradient(120% 90% at 70% 20%, #1c1c1c 0%, var(--color-black) 55%),
    var(--color-black);
  color: var(--color-white);
}

.gl-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
  will-change: opacity;
}

/* Left-side scrim so the left-aligned headline stays legible over the orb. */
.hero-scrim {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(90deg, rgba(21, 21, 21, 0.92) 0%, rgba(21, 21, 21, 0.55) 28%, rgba(21, 21, 21, 0) 55%);
}

/* Subtle film grain over the whole hero for depth. */
.hero-noise {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* CSS fallback when WebGL is unavailable. */
.hero--fallback .gl-canvas { display: none; }
.hero--fallback {
  background:
    radial-gradient(60% 55% at 68% 42%, rgba(208, 255, 0, 0.18) 0%, transparent 60%),
    radial-gradient(120% 90% at 70% 20%, #1c1c1c 0%, var(--color-black) 55%),
    var(--color-black);
}

.hero-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  min-height: 100svh;
  pointer-events: none;
}

.hero-kicker {
  text-transform: uppercase;
  letter-spacing: 0.35em;
  font-size: var(--text-xs);
  font-weight: 200;
  color: var(--color-accent);
  margin: 0 0 1.5rem 0;
  opacity: 0.85;
}

.hero-title {
  font-family: "Space Grotesk", "Inter", sans-serif;
  font-size: var(--text-2xl);
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
  line-height: 0.95;
}

.hero-sub {
  font-family: "Space Grotesk", "Inter", sans-serif;
  font-size: var(--text-xl);
  font-weight: 300;
  text-transform: uppercase;
  margin: 0.5rem 0 0 0;
  color: rgba(250, 250, 250, 0.65);
}

/* Masked line-reveal for the headline. */
.reveal-line {
  display: block;
  overflow: hidden;
}
.reveal-line > span {
  display: block;
  transform: translateY(110%);
  animation: line-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.reveal-delay > span { animation-delay: 0.15s; }

@keyframes line-rise {
  to { transform: translateY(0); }
}

.scroll-cue {
  margin-top: 3rem;
  width: 26px;
  height: 42px;
  border: 2px solid rgba(250, 250, 250, 0.35);
  border-radius: 14px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
}
.scroll-cue__dot {
  width: 4px;
  height: 8px;
  border-radius: 2px;
  background: var(--color-accent);
  animation: scroll-bob 1.6s ease-in-out infinite;
}
@keyframes scroll-bob {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(10px); opacity: 0.3; }
}

@media (prefers-reduced-motion: reduce) {
  .reveal-line > span { animation: none; transform: none; }
  .scroll-cue__dot { animation: none; }
}
</style>
