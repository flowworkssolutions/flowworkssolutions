// sections.jsx — FlowWorks landing page sections
// Premium logistics portal landing — built on brand visual DNA

/* ─────────────────────────────────────────────────────────────────
   Reveal hook — IntersectionObserver scroll-in animation
   ───────────────────────────────────────────────────────────────── */
function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

/* ─────────────────────────────────────────────────────────────────
   F-mark logo
   ───────────────────────────────────────────────────────────────── */
function FlowMark({ size = 26 }) {
  return (
    <img
      src={window.__resources.flowmark}
      alt="FlowWorks"
      style={{ width: size * (225/278), height: size, display: 'block' }}
      draggable={false}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────
   Nav
   ───────────────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a className="nav__logo" href="#top">
        <FlowMark size={26}/>
        <span>FlowWorks</span>
      </a>
      <div className="nav__links">
        <a className="nav__link" href="#platform">Platform</a>
        <a className="nav__link" href="#about">About</a>
        <a className="nav__link" href="#contact">Contact</a>
      </div>
      <a className="btn btn--primary nav__cta" href="#demo">
        Request demo
        <svg className="arr" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h8M8 3l4 4-4 4"/></svg>
      </a>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Video stage — lazy-loads the trailer iframe on first interaction
   so the rest of the page renders instantly. The trailer is its
   own React+Babel app — we don't want to block paint on it.
   ───────────────────────────────────────────────────────────────── */
function PlayButton() {
  return (
    <div className="play-btn" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
    </div>
  );
}

function Poster({ onPlay, label }) {
  return (
    <button type="button" className="video-poster" onClick={onPlay} aria-label="Play trailer">
      <div className="video-poster__bg"/>
      <div className="video-poster__grid"/>
      <img className="video-poster__mark" src={window.__resources.flowmark} alt=""/>
      <div className="video-poster__overlay">
        <PlayButton/>
        <div className="video-poster__meta">
          <span className="video-poster__kicker">{label}</span>
          <span className="video-poster__title">FlowWorks — Platform trailer</span>
          <span className="video-poster__dur">▶ Play · 40 sec</span>
        </div>
      </div>
    </button>
  );
}

function VideoFrame({ frame = 'sleek' }) {
  const [playing, setPlaying] = React.useState(false);
  const play = () => setPlaying(true);

  const media = playing ? (
    <iframe
      src={window.__resources.trailer}
      title="FlowWorks Platform Trailer"
      allow="autoplay; fullscreen"
    />
  ) : (
    <Poster onPlay={play} label="PLATFORM TRAILER"/>
  );

  if (frame === 'sleek') {
    return (
      <div className="video-sleek">
        <div className="video-sleek__glow"/>
        <div className="video-sleek__frame">
          {media}
        </div>
      </div>
    );
  }
  if (frame === 'bare') {
    return (
      <div className="video-stage">
        <div className="video-stage__glow"/>
        {media}
      </div>
    );
  }
  return (
    <div className="video-chrome">
      <div className="video-chrome__bar">
        <span className="dot dot--r"/>
        <span className="dot dot--y"/>
        <span className="dot dot--g"/>
        <div className="addr">app.flowworks.com / trailer</div>
      </div>
      <div className="video-chrome__body">
        {media}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Hero variants
   ───────────────────────────────────────────────────────────────── */

const HERO_KICKER  = "PLATFORM TRAILER · 40 SECONDS";
const HERO_TITLE_1 = "Logistics,";
const HERO_TITLE_2 = "in flow.";
const HERO_SUB     = "Connect people, processes, and data in one custom portal — designed to fit your operations perfectly.";

function HeroCTAs() {
  return (
    <div className="hero__ctas">
      <a className="btn btn--primary btn--lg" href="#demo">
        Request a demo
        <svg className="arr" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h8M8 3l4 4-4 4"/></svg>
      </a>
      <a className="btn btn--ghost-dark btn--lg" href="#platform">Explore the platform</a>
    </div>
  );
}

function HeroTheatre() {
  return (
    <section className="hero hero--theatre" id="top">
      <div className="grid-bg grid-bg--dark"/>
      <div className="hero__inner">
        <div className="hero__kicker reveal"><span className="kicker">{HERO_KICKER}</span></div>
        <h1 className="display display-xl hero__title reveal reveal--d1">
          {HERO_TITLE_1} <span className="teal">{HERO_TITLE_2}</span>
        </h1>
        <p className="lead hero__sub reveal reveal--d2">{HERO_SUB}</p>
        <div className="reveal reveal--d3"><HeroCTAs/></div>
        <div className="reveal reveal--d4"><VideoFrame frame="sleek"/></div>
        <div className="reveal reveal--d5" style={{ marginTop: 28 }}>
          <span className="scroll-cue">
            <span>Scroll</span>
            <span className="bar"/>
          </span>
        </div>
      </div>
    </section>
  );
}

function HeroSplit() {
  return (
    <section className="hero hero--split" id="top">
      <div className="grid-bg"/>
      <div className="hero__inner">
        <div>
          <div className="hero__kicker reveal"><span className="kicker">{HERO_KICKER}</span></div>
          <h1 className="display display-lg hero__title reveal reveal--d1" style={{ marginTop: 28 }}>
            {HERO_TITLE_1} <span className="teal">{HERO_TITLE_2}</span>
          </h1>
          <p className="lead hero__sub reveal reveal--d2">{HERO_SUB}</p>
          <div className="reveal reveal--d3"><HeroCTAs/></div>
          <div className="reveal reveal--d4" style={{ marginTop: 28 }}>
            <span className="tape"><span className="tape__dot"/>Live across 3 tailor-made portals</span>
          </div>
        </div>
        <div className="reveal reveal--d2">
          <VideoFrame frame="sleek"/>
        </div>
      </div>
    </section>
  );
}

function HeroFull() {
  const [playing, setPlaying] = React.useState(false);
  return (
    <section className="hero hero--full" id="top">
      <div className="hero--full__video">
        {playing ? (
          <iframe
            src={window.__resources.trailer}
            title="FlowWorks Platform Trailer"
            allow="autoplay; fullscreen"
          />
        ) : (
          <div className="hero--full__poster">
            <div className="hero--full__poster-grid"/>
          </div>
        )}
      </div>
      <div className="hero--full__veil"/>
      <div className="hero__inner">
        <div className="hero__kicker reveal"><span className="kicker">{HERO_KICKER}</span></div>
        <h1 className="display display-xl hero__title reveal reveal--d1">
          {HERO_TITLE_1} <span className="teal">{HERO_TITLE_2}</span>
        </h1>
        <p className="lead hero__sub reveal reveal--d2">{HERO_SUB}</p>
        <div className="reveal reveal--d3">
          <div className="hero__ctas">
            <button
              type="button"
              className="btn btn--primary btn--lg"
              onClick={() => setPlaying(true)}
              style={{ display: playing ? 'none' : 'inline-flex' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Play trailer · 40 sec
            </button>
            <a className="btn btn--primary btn--lg" href="#demo" style={{ display: playing ? 'inline-flex' : 'none' }}>
              Request a demo
              <svg className="arr" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h8M8 3l4 4-4 4"/></svg>
            </a>
            <a className="btn btn--ghost-dark btn--lg" href="#platform">Explore the platform</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroEditorial() {
  return (
    <section className="hero hero--editorial" id="top">
      <div className="grid-bg"/>
      <div className="hero__corners">
        <div className="corner corner--tl">FlowWorks · v2.5</div>
        <div className="corner corner--tr">Rotterdam · 2025</div>
        <div className="corner corner--bl">Logistics Portal</div>
        <div className="corner corner--br">40 sec · Watch the trailer ↓</div>
      </div>
      <div className="hero__inner">
        <div className="hero__kicker reveal"><span className="kicker">{HERO_KICKER}</span></div>
        <h1 className="display display-xl hero__title reveal reveal--d1">
          {HERO_TITLE_1} <span className="teal">{HERO_TITLE_2}</span>
        </h1>
        <p className="lead hero__sub reveal reveal--d2">{HERO_SUB}</p>
        <div className="reveal reveal--d3"><HeroCTAs/></div>
        <div className="reveal reveal--d4"><VideoFrame frame="sleek"/></div>
      </div>
    </section>
  );
}

function Hero({ variant = 'theatre' }) {
  // Re-mount on variant change so the iframe + animations reset cleanly
  return (
    <React.Fragment key={variant}>
      {variant === 'theatre'   && <HeroTheatre/>}
      {variant === 'split'     && <HeroSplit/>}
      {variant === 'full'      && <HeroFull/>}
      {variant === 'editorial' && <HeroEditorial/>}
    </React.Fragment>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Demo Request — inline form
   ───────────────────────────────────────────────────────────────── */
/* ── Demo form delivery ──────────────────────────────────────────
   ONE setting: put the mailbox that should receive demo requests in
   DEMO_FORM.to. Delivery runs through FormSubmit (formsubmit.co) —
   no account, no server, no API key. The very first submission sends
   that mailbox a one-click activation link; after confirming it, every
   request arrives as a normal e-mail with the visitor's address as
   reply-to.

   Optional: if you'd rather use Web3Forms, paste its access key in
   web3formsKey below and that route is used instead.
   ────────────────────────────────────────────────────────────── */
const DEMO_FORM = {
  to: 'info@flowworkssolutions.com',
  subject: 'New demo request — FlowWorks website',
  web3formsKey: '',
};

const MAIL_RE = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/;

function DemoSection() {
  const [status, setStatus] = React.useState('idle'); // idle | sending | ok | error
  const submitted = status === 'ok';

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.botcheck) return; // honeypot

    const configured = MAIL_RE.test(DEMO_FORM.to);

    // Not configured yet — hand off to the visitor's mail client so
    // nothing is silently lost.
    if (!configured && !DEMO_FORM.web3formsKey) {
      const body = ['Name: ' + (data.name || ''), 'Company: ' + (data.company || ''),
        'E-mail: ' + (data.email || ''), '', data.message || ''].join('\n');
      window.location.href = 'mailto:' + DEMO_FORM.to
        + '?subject=' + encodeURIComponent(DEMO_FORM.subject)
        + '&body=' + encodeURIComponent(body);
      setStatus('ok');
      form.reset();
      return;
    }

    setStatus('sending');
    try {
      const useWeb3 = !!DEMO_FORM.web3formsKey;
      const url = useWeb3
        ? 'https://api.web3forms.com/submit'
        : 'https://formsubmit.co/ajax/' + encodeURIComponent(DEMO_FORM.to);
      const payload = useWeb3
        ? { access_key: DEMO_FORM.web3formsKey, subject: DEMO_FORM.subject,
            from_name: 'FlowWorks website', replyto: data.email,
            name: data.name, company: data.company, email: data.email, message: data.message }
        : { _subject: DEMO_FORM.subject, _template: 'table', _captcha: 'false',
            Name: data.name, Company: data.company, email: data.email, Message: data.message };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false || json.success === 'false') {
        throw new Error(json.message || ('HTTP ' + res.status));
      }
      setStatus('ok');
      form.reset();
    } catch (err) {
      console.error('Demo request failed:', err);
      setStatus('error');
    }
  };
  return (
    <section className="section demo-section" id="demo">
      <div className="container demo-grid">
        <div className="demo-grid__pitch">
          <span className="kicker reveal">00 / Request a demo</span>
          <h2 className="display display-md reveal reveal--d1" style={{ marginTop: 16 }}>
            See your operations <span className="teal">in flow.</span>
          </h2>
          <p className="lead reveal reveal--d2">
            Fill out the form and we'll set up a personalised walkthrough — tailored
            to your shipments, your processes, and the data you already have.
          </p>
          <ul className="demo-bullets reveal reveal--d3">
            <li><span className="tick">✓</span>30-minute call, no slide deck</li>
            <li><span className="tick">✓</span>Live demo on shipments that look like yours</li>
            <li><span className="tick">✓</span>Custom portal scoping discussion</li>
            <li><span className="tick">✓</span>Reply within one business day</li>
          </ul>
        </div>

        <form className="form reveal reveal--d2" onSubmit={onSubmit}>
          <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" style={{ display: 'none' }}/>
          <div className="form__row form__row--2">
            <div className="field">
              <label>Name <span className="req">*</span></label>
              <input type="text" name="name" required placeholder="Jane Doe"/>
            </div>
            <div className="field">
              <label>Company <span className="req">*</span></label>
              <input type="text" name="company" required placeholder="Company B.V."/>
            </div>
          </div>
          <div className="field">
            <label>E-mail <span className="req">*</span></label>
            <input type="email" name="email" required placeholder="jane@company.com"/>
          </div>
          <div className="field">
            <label>Message <span className="req">*</span></label>
            <textarea name="message" required placeholder="Tell us about your operations — number of shipments, current tools, what you'd like to improve."></textarea>
          </div>
          <div className="form__footer">
            <span className="form__hint">* Required field</span>
            <button className="btn btn--primary btn--lg" type="submit" disabled={status === 'sending'}
              style={status === 'sending' ? { opacity: 0.6, cursor: 'wait' } : null}>
              {status === 'sending' ? 'Sending…' : 'Send request'}
              <svg className="arr" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h8M8 3l4 4-4 4"/></svg>
            </button>
          </div>
          {submitted && (
            <div className="form__success">
              <span style={{
                width: 22, height: 22, borderRadius: '50%',
                background: 'var(--green)', color: '#fff',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, flex: '0 0 22px',
              }}>✓</span>
              Thank you — we'll get in touch within one business day.
            </div>
          )}
          {status === 'error' && (
            <div className="form__success" style={{ color: '#8c2f22' }}>
              <span style={{
                width: 22, height: 22, borderRadius: '50%',
                background: '#c0392b', color: '#fff',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, flex: '0 0 22px',
              }}>!</span>
              Something went wrong sending your request. Please e-mail us at{' '}
              {MAIL_RE.test(DEMO_FORM.to) ? DEMO_FORM.to : 'our team'} instead.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Platform features
   ───────────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    tag: 'F.01', icon: '◆',
    title: 'Real-time tracking',
    desc: 'Shipments and containers, visible across every leg of the journey — sea, road, inland — with live ETA and voyage progress.',
  },
  {
    tag: 'F.02', icon: '⌘',
    title: 'AI document analysis',
    desc: 'Upload once. Extract every output: quotations, BL instructions, customs docs, transport orders — no manual re-typing.',
  },
  {
    tag: 'F.03', icon: '↔',
    title: 'Seamless data transfer',
    desc: 'Connect to the systems you already run — TMS, ERP, carrier APIs. Data flows in, data flows out, nothing in between.',
  },
  {
    tag: 'F.04', icon: '◯',
    title: 'CO₂ monitoring',
    desc: 'Emissions tracked per shipment, per route, per leg — ready for ESG reporting and Scope 3 disclosures.',
  },
  {
    tag: 'F.05', icon: '◤',
    title: 'BI dashboards',
    desc: 'Live KPIs, historical trends, carrier performance — owner and client see the same numbers, side by side.',
  },
  {
    tag: 'F.06', icon: '✦',
    title: 'Tailor-made portals',
    desc: 'Forwarders, inland shipping, container ops — the platform adapts to your workflow, not the other way around.',
  },
];

function PlatformSection() {
  return (
    <section className="section section--dark platform-dark" id="platform">
      <div className="grid-bg grid-bg--dark"/>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="features-head">
          <div>
            <span className="kicker reveal">01 / Platform</span>
            <h2 className="display display-lg reveal reveal--d1" style={{ marginTop: 28 }}>
              Built for every<br/><span className="teal">link in the chain.</span>
            </h2>
          </div>
          <p className="lead reveal reveal--d2">
            FlowWorks is more than container tracking. It's tailor-made software that
            adapts to your operation — from tracking and inventory to inland shipping,
            customs, and the BI tools that tell you what to do next.
          </p>
        </div>

        <div className="features">
          {FEATURES.map((f, i) => (
            <article key={f.title} className={`feature feature--dark reveal reveal--d${(i % 3) + 1}`}>
              <span className="feature__tag">{f.tag}</span>
              <div className="feature__icon">{f.icon}</div>
              <h3 className="feature__title">{f.title}</h3>
              <p className="feature__desc">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Portfolio section removed per request — trailer covers it. */

/* ─────────────────────────────────────────────────────────────────
   Founders
   ───────────────────────────────────────────────────────────────── */
function FoundersSection() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="features-head">
          <div>
            <span className="kicker reveal">03 / About</span>
            <h2 className="display display-lg reveal reveal--d1" style={{ marginTop: 28 }}>
              Built by people<br/>who've <span className="teal">moved the cargo.</span>
            </h2>
          </div>
          <p className="lead reveal reveal--d2">
            FlowWorks is co-founded by two people who lived the problem long
            before they built the solution — combining hands-on IT and decades
            of logistics operations into one platform.
          </p>
        </div>

        <div className="founders">
          <article className="founder reveal reveal--d1">
            <div className="founder__photo">Photo<br/>Tygo de Groot</div>
            <div>
              <h3 className="founder__name">Tygo de Groot</h3>
              <div className="founder__role">Co-Founder · IT &amp; Product</div>
              <p className="founder__bio">
                Tygo combines a hands-on IT background with practical experience in
                logistics, giving him a unique perspective on how technology can solve
                real-world operational challenges. He's passionate about digitalizing
                processes and building portals that are intuitive, efficient, and
                tailored to the way teams actually work.
              </p>
              <div className="founder__links">
                <a className="icon-link" href="https://www.linkedin.com/flowworkssolutions" target="_blank" rel="noopener">LinkedIn ↗</a>
                <a className="icon-link" href="mailto:info@flowworkssolutions.com">Email</a>
              </div>
            </div>
          </article>

          <article className="founder reveal reveal--d2">
            <div className="founder__photo">Photo<br/>Mike de Heer</div>
            <div>
              <h3 className="founder__name">Mike de Heer</h3>
              <div className="founder__role">Co-Founder · Operations &amp; Logistics</div>
              <p className="founder__bio">
                Mike has a comprehensive background in logistics — operations,
                planning, supply-chain management, process optimization. This breadth
                lets him design practical, well-thought-out solutions that address
                the day-to-day challenges logistics teams face, enabling organisations
                to collaborate better and maintain full control.
              </p>
              <div className="founder__links">
                <a className="icon-link" href="https://www.linkedin.com/flowworkssolutions" target="_blank" rel="noopener">LinkedIn ↗</a>
                <a className="icon-link" href="mailto:info@flowworkssolutions.com">Email</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Footer
   ───────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="grid-bg grid-bg--dark"/>
      <div className="footer__grid" style={{ position: 'relative', zIndex: 1 }}>
        <div>
          <div className="footer__brand">
            <FlowMark size={30}/>
            <span>FlowWorks</span>
          </div>
          <div className="footer__tag">Logistics, in flow</div>
          <p className="footer__about">
            One custom portal for shipments, documents, BI and CO₂ — built to fit your operation.
          </p>
        </div>

        <div className="footer__col">
          <h4>Platform</h4>
          <ul>
            <li><a href="#platform">Features</a></li>
            <li><a href="#about">About us</a></li>
            <li><a href="#demo">Request demo</a></li>
            <li><a href={window.__resources.trailer} target="_blank" rel="noopener">Watch trailer ↗</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="mailto:info@flowworkssolutions.com">info@flowworkssolutions.com</a></li>
            <li><a href="https://www.linkedin.com/flowworkssolutions" target="_blank" rel="noopener">LinkedIn ↗</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Get in touch</h4>
          <ul>
            <li><a className="btn btn--primary" href="#demo" style={{ marginTop: -4 }}>Request a demo</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© 2025 FlowWorks Solutions · All rights reserved</span>
        <span>v2.5 · Rotterdam</span>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Exports
   ───────────────────────────────────────────────────────────────── */
Object.assign(window, {
  useReveal,
  Nav, Hero, DemoSection, PlatformSection, FoundersSection, Footer,
});
