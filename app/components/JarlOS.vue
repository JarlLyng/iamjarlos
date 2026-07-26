<template>
  <div class="jarlos" :class="{ 'jarlos--crt': crt }" @click="menuOpen = null">
    <!-- ===== Boot sequence ===== -->
    <div v-if="!booted" class="os-boot" @click="booted = true" role="status" aria-label="iamjarlOS is booting">
      <div class="os-boot-inner">
        <pre class="os-boot-log">iamjarlOS v16.0.0 (build 2011-2026)
Loading design tokens............. OK
Mounting 16 shipped products...... OK
Calibrating easing curves......... OK
Brewing coffee (a little milk).... OK</pre>
        <div class="os-boot-bar"><span></span></div>
        <p class="os-boot-skip">click to skip</p>
      </div>
    </div>

    <template v-else>
      <!-- ===== Menu bar ===== -->
      <header class="os-menubar" @click.stop>
        <button class="os-menu-logo" @click="logoClick" aria-label="iamjarlOS menu">⏻ iamjarlOS</button>
        <button class="os-menu-item" @click="toggleMenu('file')">File</button>
        <button class="os-menu-item" @click="toggleMenu('view')">View</button>
        <button class="os-menu-item" @click="toggleMenu('help')">Help</button>
        <span class="os-menubar-spacer"></span>
        <span class="os-menu-status" title="Years of experience">🔋 15+ yrs</span>
        <span class="os-menu-status">{{ clock }}</span>

        <nav v-if="menuOpen === 'jarl'" class="os-dropdown" style="left: 8px">
          <button @click="openWin('about')">About Jarl…</button>
          <button @click="openWin('hire')">Why hire Jarl…</button>
          <hr />
          <a class="os-dropdown-link" href="https://iamjarl.com" rel="noopener">Exit to iamjarl.com →</a>
          <button @click="rebootOS">Restart iamjarlOS</button>
        </nav>
        <nav v-if="menuOpen === 'file'" class="os-dropdown" style="left: 96px">
          <button @click="openWin('projects')">Open Projects</button>
          <button @click="openWin('contact')">New Message…</button>
          <hr />
          <button @click="openWin('hire')">Ship it 🚀</button>
        </nav>
        <nav v-if="menuOpen === 'view'" class="os-dropdown" style="left: 140px">
          <button @click="crt = !crt">{{ crt ? '✓ ' : '' }}CRT Mode</button>
          <button disabled>Light Mode (never)</button>
        </nav>
        <nav v-if="menuOpen === 'help'" class="os-dropdown" style="left: 196px">
          <button @click="openWin('error')">Get Help…</button>
          <button @click="openTermHelp">There are no easter eggs</button>
        </nav>
      </header>

      <!-- ===== Desktop ===== -->
      <main class="os-desktop">
        <div class="os-desktop-icons">
          <button class="os-icon" @click="openWin('hire')">
            <span class="os-icon-glyph os-icon-glyph--pdf"><Icon name="ph:file-pdf" /></span>
            <span class="os-icon-label">hire-me.pdf</span>
          </button>
          <button class="os-icon" @click="openWin('projects')">
            <span class="os-icon-glyph"><Icon name="ph:folder" /></span>
            <span class="os-icon-label">Projects</span>
          </button>
          <button class="os-icon" @click="openWin('music')">
            <span class="os-icon-glyph"><Icon name="ph:waveform" /></span>
            <span class="os-icon-label">Studio</span>
          </button>
          <button class="os-icon" @click="openWin('trash')">
            <span class="os-icon-glyph"><Icon name="ph:trash" /></span>
            <span class="os-icon-label">Trash</span>
          </button>
        </div>

        <!-- ===== Windows ===== -->
        <OsWindow :win="wins.about" :active="activeId === 'about'" @focus="focusWin('about')" @close="wins.about.open = false" @minimize="wins.about.min = true" @maximize="wins.about.max = !wins.about.max">
          <div class="about-grid">
            <img class="about-portrait" src="~/assets/img/heroUpscale-min.png" alt="Jarl Lyng" />
            <div>
              <h1 class="about-name">Jarl Lyng</h1>
              <p class="about-role">Full stack designer &amp; developer · Copenhagen</p>
              <p>I'm a full stack digital designer and developer based in Denmark, with 15+ years behind me across design strategy, UX/UI, interaction design and creative coding. I build the things I want to exist: native iOS and macOS apps, web apps, and small open-source tools.</p>
              <p>On any given week I'm writing Vue, Nuxt, React or Swift, tweaking a motion curve for too long, or sketching out the next weird side project. Along the way I've worked with Carlsberg, Danske Bank, Native Instruments, DSB and Roskilde Festival, but the indie stuff is what I keep coming back to.</p>
              <div class="about-stats">
                <div><strong>16</strong><span>shipped products</span></div>
                <div><strong>15+</strong><span>years</span></div>
                <div><strong>1</strong><span>person</span></div>
              </div>
              <p class="about-exit">Prefer the classic portfolio? <a href="https://iamjarl.com" rel="noopener">iamjarl.com →</a></p>
            </div>
          </div>
        </OsWindow>

        <OsWindow :win="wins.projects" :active="activeId === 'projects'" @focus="focusWin('projects')" @close="wins.projects.open = false" @minimize="wins.projects.min = true" @maximize="wins.projects.max = !wins.projects.max">
          <div class="finder-grid">
            <button v-for="p in projectList" :key="p.id" class="finder-item" @click="openProject(p)">
              <img :src="p.thumb" :alt="p.title" loading="lazy" />
              <span>{{ p.title }}</span>
            </button>
          </div>
        </OsWindow>

        <OsWindow :win="wins.preview" :active="activeId === 'preview'" @focus="focusWin('preview')" @close="wins.preview.open = false" @minimize="wins.preview.min = true" @maximize="wins.preview.max = !wins.preview.max">
          <template v-if="selected">
            <img class="preview-shot" :src="selected.thumb" :alt="selected.title" />
            <h2 class="preview-title">{{ selected.title }}</h2>
            <p class="preview-meta">{{ selected.operatingSystem || 'Web' }}</p>
            <p>{{ selected.description }}</p>
            <a class="os-cta" :href="selected.url" target="_blank" rel="noopener noreferrer">Open project <Icon name="ph:arrow-up-right" /></a>
          </template>
        </OsWindow>

        <OsWindow :win="wins.skills" :active="activeId === 'skills'" @focus="focusWin('skills')" @close="wins.skills.open = false" @minimize="wins.skills.min = true" @maximize="wins.skills.max = !wins.skills.max">
          <table class="activity-table">
            <thead><tr><th>Process</th><th>CPU</th><th></th></tr></thead>
            <tbody>
              <tr v-for="proc in processes" :key="proc.name">
                <td class="mono">{{ proc.name }}</td>
                <td class="mono">{{ proc.cpu }}%</td>
                <td><span class="cpu-bar"><span :style="{ width: proc.cpu + '%' }"></span></span></td>
              </tr>
            </tbody>
          </table>
          <p class="activity-note">All processes healthy. motion-curve-tweaker has been running since 2011.</p>
        </OsWindow>

        <OsWindow :win="wins.clients" :active="activeId === 'clients'" @focus="focusWin('clients')" @close="wins.clients.open = false" @minimize="wins.clients.min = true" @maximize="wins.clients.max = !wins.clients.max">
          <div class="terminal" @click="focusTerm">
            <div v-for="(l, i) in termLines" :key="i" class="term-line" :class="'term-line--' + l.t">
              <template v-if="l.t === 'cmd'"><span class="term-prompt">jarl@iamjarlos ~ %</span> {{ l.text }}</template>
              <template v-else>{{ l.text }}</template>
            </div>
            <div class="term-line term-input-row">
              <span class="term-prompt">jarl@iamjarlos ~ %</span>
              <input
                ref="termInput"
                v-model="termCmd"
                class="term-field"
                spellcheck="false"
                autocomplete="off"
                autocapitalize="off"
                aria-label="Terminal input"
                @keydown.enter="runCmd"
              />
            </div>
          </div>
        </OsWindow>

        <OsWindow :win="wins.contact" :active="activeId === 'contact'" @focus="focusWin('contact')" @close="wins.contact.open = false" @minimize="wins.contact.min = true" @maximize="wins.contact.max = !wins.contact.max">
          <p>I'm always up for solving new digital challenges — and I take my coffee with a little bit of milk.</p>
          <ul class="contact-list">
            <li><Icon name="ph:envelope" /> <a href="mailto:jarl@iamjarl.com">jarl@iamjarl.com</a></li>
            <li><Icon name="ph:linkedin-logo" /> <a href="https://www.linkedin.com/in/jarl-lyng-0a364719/" target="_blank" rel="noopener noreferrer">/jarllyng</a></li>
            <li><Icon name="ph:medium-logo" /> <a href="https://medium.com/@jarllyng" target="_blank" rel="noopener noreferrer">@jarllyng</a></li>
            <li><Icon name="ph:github-logo" /> <a href="https://github.com/JarlLyng" target="_blank" rel="noopener noreferrer">/JarlLyng</a></li>
          </ul>
        </OsWindow>

        <OsWindow :win="wins.music" :active="activeId === 'music'" @focus="focusWin('music')" @close="wins.music.open = false" @minimize="wins.music.min = true" @maximize="wins.music.max = !wins.music.max">
          <div class="studio">
            <div class="studio-viz" aria-hidden="true">
              <span v-for="n in 24" :key="n" :style="{ animationDelay: (n * 0.11) % 1.3 + 's' }"></span>
            </div>
            <p class="studio-now">NOW PLAYING — something from <a href="https://runningfromhorses.com/" target="_blank" rel="noopener noreferrer">Running From Horses</a></p>
            <p>When I'm not shipping apps I make music: I run an independent record label, build audio tools (<a href="https://itsmonoyo.iamjarl.com/" target="_blank" rel="noopener noreferrer">It's mono, yo!</a>, <a href="https://beertuner.iamjarl.com/" target="_blank" rel="noopener noreferrer">BeerTuner</a>), and spend too much time in Ableton.</p>
          </div>
        </OsWindow>

        <OsWindow :win="wins.hire" :active="activeId === 'hire'" @focus="focusWin('hire')" @close="wins.hire.open = false" @minimize="wins.hire.min = true" @maximize="wins.hire.max = !wins.hire.max">
          <div class="hire-doc">
            <p class="hire-kicker">CONFIDENTIAL — READ BEFORE HIRING ANYONE ELSE</p>
            <h2>Why hire Jarl?</h2>
            <ul class="hire-list">
              <li><strong>Proof over promises.</strong> 16 shipped, live products — native iOS/macOS apps, web apps, Chrome extensions. You're inside one of them right now.</li>
              <li><strong>The full stack, literally.</strong> Strategy → UX → UI → motion → Swift/Vue/React → App Store. One person, no handoffs.</li>
              <li><strong>Trusted by grown-ups.</strong> Carlsberg, Danske Bank, Native Instruments, DSB, Roskilde Festival, Skattestyrelsen.</li>
              <li><strong>Craft with a point of view.</strong> Privacy-first, pay-once, no dark patterns. Products people actually like.</li>
              <li><strong>This site is the CV.</strong> The window you're dragging around? Built from scratch. That's the job interview.</li>
            </ul>
            <a class="os-cta" href="mailto:jarl@iamjarl.com?subject=Let's%20talk">Hire Jarl <Icon name="ph:paper-plane-tilt" /></a>
          </div>
        </OsWindow>

        <OsWindow :win="wins.trash" :active="activeId === 'trash'" @focus="focusWin('trash')" @close="wins.trash.open = false" @minimize="wins.trash.min = true" @maximize="wins.trash.max = !wins.trash.max">
          <ul class="trash-list mono">
            <li>📄 subscriptions.model <em>— never installed</em></li>
            <li>📁 features_nobody_asked_for/</li>
            <li>📄 dark_patterns.pkg <em>— rejected at review</em></li>
            <li>🎨 EmotionWave.app <em>— art project, still loved, refuses deletion</em></li>
          </ul>
          <button class="os-cta os-cta--ghost" @click="openWin('error')">Empty Trash</button>
        </OsWindow>

        <OsWindow :win="wins.error" :active="activeId === 'error'" @focus="focusWin('error')" @close="wins.error.open = false" @minimize="wins.error.min = true" @maximize="wins.error.max = false">
          <div class="error-dialog">
            <span class="error-glyph">⚠️</span>
            <p class="mono">ERR 404: work_life_balance not found.</p>
            <button class="os-cta" @click="wins.error.open = false">Ship anyway</button>
          </div>
        </OsWindow>
      </main>

      <!-- ===== Easter egg overlays ===== -->
      <canvas v-if="matrixOn" ref="matrixCanvas" class="os-matrix" aria-hidden="true"></canvas>

      <div v-if="saverOn" class="os-saver" aria-hidden="true">
        <span ref="saverLogo" class="os-saver-logo">⏻ iamjarlOS</span>
      </div>

      <div v-if="panicOn" class="os-panic" role="alert">
        <pre class="os-panic-text">*** KERNEL PANIC ***

too_many_ideas in queue at 0xC0FFEE
> all of them shipped anyway

CPU: motion-curve-tweaker (99.9%)   UPTIME: 15+ years
PROCESS: jarl.creativity — refusing to terminate

press any key to reboot</pre>
      </div>

      <!-- ===== Dock ===== -->
      <nav class="os-dock" @click.stop aria-label="Dock">
        <button v-for="d in dock" :key="d.id" class="os-dock-item" :aria-label="d.label" :title="d.label" @click="openWin(d.id)">
          <Icon :name="d.icon" />
          <span v-if="wins[d.id].open" class="os-dock-dot"></span>
        </button>
        <span class="os-dock-sep"></span>
        <button class="os-dock-item os-dock-item--hire" aria-label="hire-me.pdf" title="hire-me.pdf" @click="openWin('hire')">
          <Icon name="ph:file-pdf" />
          <span v-if="wins.hire.open" class="os-dock-dot"></span>
        </button>
      </nav>
    </template>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { projects } from '~/data/projects';

const CLIENTS = ['Carlsberg', 'Danske Bank', 'Native Instruments', 'DSB', 'Roskilde Festival', 'TDC', 'YouSee', 'Rockwool', 'Skattestyrelsen', 'MobilePay', 'ATP', 'Forsvaret', 'Københavns Universitet', 'Psykiatrifonden', '3', 'Output', 'BMS', 'SUS'];

export default {
  data() {
    return {
      booted: false,
      crt: false,
      clock: '--:--',
      menuOpen: null,
      zCounter: 10,
      activeId: 'about',
      selected: null,
      wins: reactive({
        about:    { id: 'about',    title: 'About Jarl',                 open: true,  min: false, max: false, x: 90,  y: 70,  w: 680, z: 5 },
        projects: { id: 'projects', title: 'Projects — 16 items',        open: false, min: false, max: false, x: 240, y: 110, w: 640, z: 4 },
        preview:  { id: 'preview',  title: 'Preview',                    open: false, min: false, max: false, x: 320, y: 90,  w: 640, z: 4 },
        skills:   { id: 'skills',   title: 'Activity Monitor — Skills',  open: false, min: false, max: false, x: 380, y: 140, w: 560, z: 4 },
        clients:  { id: 'clients',  title: 'Terminal — clients.log',     open: false, min: false, max: false, x: 200, y: 170, w: 560, z: 4 },
        contact:  { id: 'contact',  title: 'Mail — New Message',         open: false, min: false, max: false, x: 420, y: 120, w: 460, z: 4 },
        music:    { id: 'music',    title: 'Studio — Now Playing',       open: false, min: false, max: false, x: 300, y: 160, w: 480, z: 4 },
        hire:     { id: 'hire',     title: 'hire-me.pdf — Preview',      open: false, min: false, max: false, x: 160, y: 60,  w: 600, z: 4 },
        trash:    { id: 'trash',    title: 'Trash',                      open: false, min: false, max: false, x: 460, y: 180, w: 460, z: 4 },
        error:    { id: 'error',    title: 'System Alert',               open: false, min: false, max: false, x: 400, y: 220, w: 360, z: 4 },
      }),
      dock: [
        { id: 'about',    icon: 'ph:user-circle',    label: 'About Jarl' },
        { id: 'projects', icon: 'ph:squares-four',   label: 'Projects' },
        { id: 'skills',   icon: 'ph:pulse',          label: 'Skills' },
        { id: 'clients',  icon: 'ph:terminal-window', label: 'Clients' },
        { id: 'music',    icon: 'ph:waveform',       label: 'Studio' },
        { id: 'contact',  icon: 'ph:envelope',       label: 'Contact' },
        { id: 'trash',    icon: 'ph:trash',          label: 'Trash' },
      ],
      processes: [
        { name: 'motion-curve-tweaker', cpu: 99.9 },
        { name: 'swiftui-renderer', cpu: 84.2 },
        { name: 'design-system-daemon', cpu: 76.5 },
        { name: 'vue-nuxt-compiler', cpu: 88.1 },
        { name: 'react-reconciler', cpu: 61.3 },
        { name: 'ableton-live', cpu: 47.8 },
        { name: 'strategy-brainstorm', cpu: 72.0 },
        { name: 'coffee.service', cpu: 100 },
      ],
      clockTimer: null,
      // --- easter eggs ---
      termCmd: '',
      termLines: [],
      matrixOn: false,
      saverOn: false,
      panicOn: false,
      konamiBuf: [],
      logoClicks: [],
      idleTimer: null,
      matrixRaf: null,
      matrixStopTimer: null,
      saverRaf: null,
      reduced: false,
    };
  },
  computed: {
    projectList() {
      const { $config } = useNuxtApp();
      const baseURL = $config?.app?.baseURL || '/';
      const clean = baseURL.endsWith('/') ? baseURL : `${baseURL}/`;
      return projects.map((p) => ({ ...p, thumb: `${clean}img/projects/${p.thumbnail}` }));
    },
    clientLog() {
      return CLIENTS.map((c) => `  ✓ ${c.toLowerCase().replace(/\s+/g, '-')} .......... engagement complete`).join('\n');
    },
  },
  mounted() {
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.reduced) {
      this.booted = true;
    } else {
      setTimeout(() => { this.booted = true; }, 1700);
    }
    this.tickClock();
    this.clockTimer = setInterval(this.tickClock, 10000);
    this.termLines = [
      { t: 'cmd', text: 'cat clients.log' },
      { t: 'out', text: this.clientLog },
      { t: 'out', text: '' },
      { t: 'out', text: 'tip: type `help` for available commands.' },
    ];
    window.addEventListener('keydown', this.onGlobalKey);
    window.addEventListener('pointermove', this.resetIdle, { passive: true });
    window.addEventListener('pointerdown', this.resetIdle, { passive: true });
    this.resetIdle();
  },
  beforeUnmount() {
    clearInterval(this.clockTimer);
    clearTimeout(this.idleTimer);
    clearTimeout(this.matrixStopTimer);
    cancelAnimationFrame(this.matrixRaf);
    cancelAnimationFrame(this.saverRaf);
    window.removeEventListener('keydown', this.onGlobalKey);
    window.removeEventListener('pointermove', this.resetIdle);
    window.removeEventListener('pointerdown', this.resetIdle);
  },
  methods: {
    tickClock() {
      this.clock = new Date().toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });
    },
    toggleMenu(id) {
      this.menuOpen = this.menuOpen === id ? null : id;
    },
    openWin(id) {
      const w = this.wins[id];
      w.open = true;
      w.min = false;
      this.focusWin(id);
      this.menuOpen = null;
    },
    focusWin(id) {
      this.wins[id].z = ++this.zCounter;
      this.activeId = id;
    },
    openProject(p) {
      this.selected = p;
      this.wins.preview.title = `${p.title} — Preview`;
      this.openWin('preview');
    },
    rebootOS() {
      this.menuOpen = null;
      this.booted = false;
      setTimeout(() => { this.booted = true; }, 1700);
    },

    /* ===== Easter eggs ===== */
    logoClick() {
      this.toggleMenu('jarl');
      const now = Date.now();
      this.logoClicks = this.logoClicks.filter((t) => now - t < 3000);
      this.logoClicks.push(now);
      if (this.logoClicks.length >= 5) {
        this.logoClicks = [];
        this.menuOpen = null;
        this.panicOn = true;
      }
    },
    onGlobalKey(e) {
      // kernel panic: any key reboots
      if (this.panicOn) {
        this.panicOn = false;
        this.rebootOS();
        return;
      }
      this.resetIdle();
      // konami: up up down down left right left right b a
      const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
      this.konamiBuf.push(e.key);
      if (this.konamiBuf.length > seq.length) this.konamiBuf.shift();
      if (seq.every((k, i) => this.konamiBuf[i] === k)) {
        this.konamiBuf = [];
        this.startMatrix();
      }
    },
    focusTerm() {
      this.$refs.termInput?.focus();
    },
    openTermHelp() {
      this.openWin('clients');
      this.termLines.push({ t: 'cmd', text: 'help' }, { t: 'out', text: this.helpText() });
      this.scrollTerm();
    },
    helpText() {
      return [
        'available commands:',
        '  whoami          who is this guy',
        '  ls              list shipped apps',
        '  open <app>      open an app preview',
        '  hire            the important one',
        '  coffee          brew one',
        '  matrix          you know what this does',
        '  clear · exit    housekeeping',
        '(a few commands are not listed. obviously.)',
      ].join('\n');
    },
    runCmd() {
      const raw = this.termCmd.trim();
      this.termCmd = '';
      if (!raw) return;
      this.termLines.push({ t: 'cmd', text: raw });
      const [cmd, ...rest] = raw.toLowerCase().split(/\s+/);
      const arg = rest.join(' ');
      let out = null;
      if (cmd === 'help') out = this.helpText();
      else if (cmd === 'whoami') out = 'jarl — full stack designer & developer, copenhagen.\n16 shipped products. coffee with a little milk.';
      else if (cmd === 'ls') out = this.projectList.map((p) => '  ' + p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.app').join('\n');
      else if (cmd === 'open' && arg) {
        const hit = this.projectList.find((p) => p.title.toLowerCase().includes(arg));
        if (hit) { this.openProject(hit); out = `opening ${hit.title}…`; }
        else out = `open: ${arg}: no such app. try \`ls\`.`;
      }
      else if (cmd === 'sudo') {
        if (arg.includes('hire')) { this.openWin('hire'); out = 'permission granted. opening hire-me.pdf…'; }
        else out = 'jarl is not in the sudoers file. this incident will be reported (to jarl).';
      }
      else if (cmd === 'hire') { this.openWin('hire'); out = 'good call.'; }
      else if (cmd === 'coffee') out = '☕ brewing… done. (a little milk, as specified)';
      else if (cmd === 'matrix') { this.startMatrix(); out = 'wake up, neo…'; }
      else if (cmd === 'cat' && arg.includes('clients')) out = this.clientLog;
      else if (cmd === 'rm') out = 'nice try. shipped products are immutable.';
      else if (cmd === 'clear') { this.termLines = []; return; }
      else if (cmd === 'exit') { this.wins.clients.open = false; return; }
      else out = `${cmd}: command not found. try \`help\`.`;
      if (out !== null) this.termLines.push({ t: 'out', text: out });
      this.scrollTerm();
    },
    scrollTerm() {
      this.$nextTick(() => {
        this.$refs.termInput?.scrollIntoView({ block: 'nearest' });
      });
    },
    startMatrix() {
      if (this.matrixOn || this.reduced) return;
      this.matrixOn = true;
      this.$nextTick(() => {
        const canvas = this.$refs.matrixCanvas;
        if (!canvas) { this.matrixOn = false; return; }
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const fontSize = 16;
        const cols = Math.floor(canvas.width / fontSize);
        const drops = new Array(cols).fill(1);
        const glyphs = 'アイウエオカキクケコサシスセソ0123456789JARLOS<>/{}=+*';
        const draw = () => {
          ctx.fillStyle = 'rgba(13, 13, 13, 0.08)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#d0ff00';
          ctx.font = fontSize + 'px monospace';
          for (let i = 0; i < drops.length; i++) {
            const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
            ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
          }
          this.matrixRaf = requestAnimationFrame(draw);
        };
        draw();
        this.matrixStopTimer = setTimeout(this.stopMatrix, 9000);
        window.addEventListener('pointerdown', this.stopMatrix, { once: true });
      });
    },
    stopMatrix() {
      cancelAnimationFrame(this.matrixRaf);
      clearTimeout(this.matrixStopTimer);
      this.matrixOn = false;
    },
    resetIdle() {
      if (this.saverOn) this.stopSaver();
      clearTimeout(this.idleTimer);
      if (this.reduced) return;
      this.idleTimer = setTimeout(this.startSaver, 75000);
    },
    startSaver() {
      if (!this.booted || this.panicOn || this.matrixOn) { this.resetIdle(); return; }
      this.saverOn = true;
      this.$nextTick(() => {
        const el = this.$refs.saverLogo;
        if (!el) return;
        let x = 80, y = 120, dx = 2.2, dy = 1.8;
        const step = () => {
          const maxX = window.innerWidth - el.offsetWidth;
          const maxY = window.innerHeight - el.offsetHeight;
          x += dx; y += dy;
          if (x <= 0 || x >= maxX) { dx = -dx; x = Math.max(0, Math.min(x, maxX)); }
          if (y <= 0 || y >= maxY) { dy = -dy; y = Math.max(0, Math.min(y, maxY)); }
          el.style.transform = `translate(${x}px, ${y}px)`;
          this.saverRaf = requestAnimationFrame(step);
        };
        step();
      });
    },
    stopSaver() {
      cancelAnimationFrame(this.saverRaf);
      this.saverOn = false;
    },
  },
};
</script>

<style scoped>
.jarlos {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(90% 70% at 70% 15%, #202020 0%, #161616 60%),
    #161616;
  color: var(--color-white);
  font-family: "Inter", sans-serif;
  overflow: hidden;
  cursor: default;
}

/* faint lime grid on the desktop */
.jarlos::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(208, 255, 0, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(208, 255, 0, 0.025) 1px, transparent 1px);
  background-size: 56px 56px;
  pointer-events: none;
}

/* ===== CRT mode ===== */
.jarlos--crt::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.16) 0 1px, transparent 1px 3px);
  mix-blend-mode: multiply;
}
.jarlos--crt { filter: saturate(1.15) contrast(1.05); }

/* ===== Boot ===== */
.os-boot {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0d0d0d;
  z-index: 100;
  cursor: pointer;
}
.os-boot-log {
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 0.85rem;
  color: var(--color-accent);
  opacity: 0.9;
  margin: 0 0 20px 0;
}
.os-boot-bar {
  height: 4px;
  background: rgba(208, 255, 0, 0.15);
  border-radius: 2px;
  overflow: hidden;
}
.os-boot-bar span {
  display: block;
  height: 100%;
  width: 0;
  background: var(--color-accent);
  box-shadow: 0 0 12px rgba(208, 255, 0, 0.8);
  animation: os-boot-fill 1.5s ease-out forwards;
}
@keyframes os-boot-fill { to { width: 100%; } }
.os-boot-skip {
  margin-top: 16px;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.35;
  text-align: center;
}

/* ===== Menu bar ===== */
.os-menubar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 12px;
  background: rgba(20, 20, 20, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(208, 255, 0, 0.12);
  z-index: 5000;
  font-size: 0.8rem;
}
.os-menu-logo {
  color: var(--color-accent);
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  letter-spacing: 0.04em;
}
.os-menu-logo, .os-menu-item {
  background: none;
  border: none;
  color: inherit;
  padding: 4px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
}
.os-menu-item:hover, .os-menu-logo:hover { background: rgba(208, 255, 0, 0.12); }
.os-menubar-spacer { flex: 1; }
.os-menu-status { opacity: 0.6; font-size: 0.75rem; padding: 0 8px; font-variant-numeric: tabular-nums; }

.os-dropdown {
  position: absolute;
  top: 32px;
  min-width: 200px;
  background: rgba(30, 30, 30, 0.97);
  border: 1px solid rgba(208, 255, 0, 0.15);
  border-radius: 8px;
  padding: 6px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
}
.os-dropdown button {
  background: none;
  border: none;
  color: inherit;
  text-align: left;
  padding: 7px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.82rem;
}
.os-dropdown button:hover:not(:disabled) { background: var(--color-accent); color: var(--color-black); }
.os-dropdown button:disabled { opacity: 0.35; cursor: not-allowed; }
.os-dropdown hr { border: none; border-top: 1px solid rgba(255, 255, 255, 0.08); margin: 5px 8px; }
.os-dropdown-link {
  display: block;
  padding: 7px 12px;
  border-radius: 5px;
  color: inherit;
  text-decoration: none;
  font-size: 0.82rem;
}
.os-dropdown-link:hover { background: var(--color-accent); color: var(--color-black); }

/* ===== Desktop icons ===== */
.os-desktop { position: absolute; inset: 30px 0 0 0; }
.os-desktop-icons {
  position: absolute;
  top: 24px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  z-index: 1;
}
.os-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  width: 92px;
  padding: 8px 4px;
  border-radius: 8px;
}
.os-icon:hover { background: rgba(208, 255, 0, 0.08); }
.os-icon-glyph {
  font-size: 40px;
  color: var(--color-accent);
  filter: drop-shadow(0 4px 12px rgba(208, 255, 0, 0.25));
}
.os-icon-glyph--pdf { color: #ff5f57; filter: drop-shadow(0 4px 12px rgba(255, 95, 87, 0.3)); }
.os-icon-label {
  font-size: 0.72rem;
  background: rgba(0, 0, 0, 0.5);
  padding: 2px 8px;
  border-radius: 4px;
}

/* ===== Dock ===== */
.os-dock {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: rgba(24, 24, 24, 0.8);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(208, 255, 0, 0.15);
  border-radius: 18px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  z-index: 6000;
}
.os-dock-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  font-size: 26px;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  border-radius: 12px;
  color: var(--color-white);
  cursor: pointer;
  transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), background 0.18s ease, color 0.18s ease;
}
.os-dock-item:hover {
  transform: translateY(-8px) scale(1.14);
  background: rgba(208, 255, 0, 0.15);
  color: var(--color-accent);
}
.os-dock-item--hire { color: #ff8a84; }
.os-dock-sep { width: 1px; height: 34px; background: rgba(255, 255, 255, 0.12); margin: 0 4px; }
.os-dock-dot {
  position: absolute;
  bottom: 2px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-accent);
}

/* ===== Window contents ===== */
/* Neutralize the site-wide `p` rules (fluid --text-lg + max-width: 50vw)
   inside windows — OS chrome wants UI-sized text at full width. */
.jarlos p {
  font-size: 0.95rem;
  max-width: none;
}

.mono { font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 0.82rem; }

.about-grid { display: grid; grid-template-columns: 150px 1fr; gap: 20px; }
.about-portrait { width: 150px; border-radius: 10px; border: 1px solid rgba(208, 255, 0, 0.25); }
.about-name { font-family: "Space Grotesk", sans-serif; font-size: 1.5rem; margin: 0; text-transform: uppercase; }
.about-role { color: var(--color-accent); font-size: 0.85rem; margin: 2px 0 12px 0; }
.about-grid p { margin: 0 0 10px 0; }
.about-stats { display: flex; gap: 24px; margin-top: 14px; }
.about-stats strong { display: block; font-family: "Space Grotesk", sans-serif; font-size: 1.4rem; color: var(--color-accent); }
.about-stats span { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.6; }
.about-exit { margin-top: 16px; font-size: 0.82rem; opacity: 0.75; }
.about-exit a { color: var(--color-accent); text-decoration: none; }
.about-exit a:hover { text-decoration: underline; }

.finder-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
.finder-item {
  display: flex; flex-direction: column; align-items: stretch; gap: 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: inherit; cursor: pointer;
  padding: 8px; border-radius: 10px; font-size: 0.78rem;
  text-align: left;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, background 0.2s ease;
}
.finder-item:hover {
  background: rgba(208, 255, 0, 0.08);
  border-color: rgba(208, 255, 0, 0.35);
  transform: translateY(-3px);
}
.finder-item img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  object-position: top;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #0f0f0f;
}
.finder-item span { padding: 0 2px 2px 2px; font-weight: 400; }

.preview-shot {
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 14px;
  background: #0f0f0f;
}
.preview-title { font-family: "Space Grotesk", sans-serif; margin: 0; text-transform: uppercase; font-size: 1.2rem; }
.preview-meta {
  display: inline-block;
  color: var(--color-black);
  background: var(--color-accent);
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 0.68rem;
  font-weight: 700;
  margin: 6px 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.activity-table { width: 100%; border-collapse: collapse; }
.activity-table th { text-align: left; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.5; padding: 4px 8px; }
.activity-table td { padding: 7px 8px; border-top: 1px solid rgba(255,255,255,0.06); }
.cpu-bar { display: block; width: 120px; height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; }
.cpu-bar span { display: block; height: 100%; background: var(--color-accent); border-radius: 3px; box-shadow: 0 0 8px rgba(208,255,0,0.5); }
.activity-note { font-size: 0.78rem; opacity: 0.55; margin: 12px 0 0 0; }

.terminal {
  margin: 0;
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 0.8rem;
  line-height: 1.7;
  color: #d8ffd8;
  min-height: 240px;
  cursor: text;
}
.term-line { white-space: pre-wrap; word-break: break-word; }
.term-line--cmd { color: var(--color-white); }
.term-prompt { color: var(--color-accent); }
.term-input-row { display: flex; gap: 8px; align-items: baseline; }
.term-field {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--color-white);
  font: inherit;
  caret-color: var(--color-accent);
  padding: 0;
}

/* ===== Easter egg overlays ===== */
.os-matrix {
  position: fixed;
  inset: 0;
  z-index: 99990;
  pointer-events: none;
  background: rgba(13, 13, 13, 0.65);
}

.os-saver {
  position: fixed;
  inset: 0;
  z-index: 99995;
  background: #0b0b0b;
}
.os-saver-logo {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: var(--color-accent);
  text-shadow: 0 0 30px rgba(208, 255, 0, 0.5);
  will-change: transform;
}

.os-panic {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: #0b0b0b;
  display: flex;
  align-items: center;
  justify-content: center;
}
.os-panic-text {
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 0.9rem;
  line-height: 1.9;
  color: var(--color-accent);
  text-shadow: 0 0 20px rgba(208, 255, 0, 0.35);
  margin: 0;
  padding: 24px;
}

.contact-list { list-style: none; padding: 0; margin: 14px 0 0 0; display: flex; flex-direction: column; gap: 12px; }
.contact-list li { display: flex; align-items: center; gap: 12px; font-size: 1rem; }
.contact-list a { color: var(--color-white); font-weight: 700; text-decoration: none; border-bottom: 1px solid rgba(208,255,0,0.4); }
.contact-list a:hover { color: var(--color-accent); }

.studio-viz { display: flex; align-items: flex-end; gap: 3px; height: 64px; margin-bottom: 14px; }
.studio-viz span {
  flex: 1; background: var(--color-accent); border-radius: 2px 2px 0 0; height: 20%;
  animation: viz-bounce 1.3s ease-in-out infinite alternate;
  box-shadow: 0 0 10px rgba(208, 255, 0, 0.3);
}
@keyframes viz-bounce { from { height: 12%; opacity: 0.5; } to { height: 95%; opacity: 1; } }
.studio-now { font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-accent); }
.studio a { color: var(--color-white); border-bottom: 1px solid rgba(208,255,0,0.4); text-decoration: none; }

.hire-doc { background: #fafafa; color: #252525; margin: -20px; padding: 28px; font-weight: 400; }
.hire-kicker { font-size: 0.65rem; letter-spacing: 0.22em; color: #c0392b; font-weight: 700; margin: 0 0 8px 0; }
.hire-doc h2 { font-family: "Space Grotesk", sans-serif; text-transform: uppercase; margin: 0 0 14px 0; }
.hire-list { padding-left: 18px; margin: 0 0 20px 0; display: flex; flex-direction: column; gap: 10px; font-size: 0.92rem; line-height: 1.55; }

.os-cta {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--color-black); color: var(--color-accent);
  font-family: "Space Grotesk", sans-serif; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
  padding: 12px 22px; border-radius: 8px; border: none;
  text-decoration: none; cursor: pointer; font-size: 0.85rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.os-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(208, 255, 0, 0.25); }
.os-cta--ghost { background: transparent; color: inherit; border: 1px solid rgba(255,255,255,0.2); }

.trash-list { list-style: none; padding: 0; margin: 0 0 18px 0; display: flex; flex-direction: column; gap: 10px; }
.trash-list em { opacity: 0.5; font-style: normal; }

.error-dialog { text-align: center; padding: 10px 0; }
.error-glyph { font-size: 2.2rem; display: block; margin-bottom: 10px; }

@media (max-width: 768px) {
  .os-desktop-icons { flex-direction: row; top: auto; bottom: 90px; right: 12px; left: 12px; justify-content: space-around; }
  .about-grid { grid-template-columns: 1fr; }
  .about-portrait { width: 110px; }
  .os-menu-item { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .studio-viz span, .term-cursor, .os-boot-bar span { animation: none; }
  .os-boot-bar span { width: 100%; }
  .os-dock-item { transition: none; }
}
</style>
