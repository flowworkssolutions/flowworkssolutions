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
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.05
    });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

/* ─────────────────────────────────────────────────────────────────
   F-mark logo
   ───────────────────────────────────────────────────────────────── */
function FlowMark({
  size = 26
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: window.__resources.flowmark,
    alt: "FlowWorks",
    style: {
      width: size * (225 / 278),
      height: size,
      display: 'block'
    },
    draggable: false
  });
}

/* ─────────────────────────────────────────────────────────────────
   Nav
   ───────────────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("nav", {
    className: `nav ${scrolled ? 'nav--scrolled' : ''}`
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav__logo",
    href: "#top"
  }, /*#__PURE__*/React.createElement(FlowMark, {
    size: 26
  }), /*#__PURE__*/React.createElement("span", null, "FlowWorks")), /*#__PURE__*/React.createElement("div", {
    className: "nav__links"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav__link",
    href: "#platform"
  }, "Platform"), /*#__PURE__*/React.createElement("a", {
    className: "nav__link",
    href: "#about"
  }, "About"), /*#__PURE__*/React.createElement("a", {
    className: "nav__link",
    href: "#contact"
  }, "Contact")), /*#__PURE__*/React.createElement("a", {
    className: "btn btn--primary nav__cta",
    href: "#demo"
  }, "Request demo", /*#__PURE__*/React.createElement("svg", {
    className: "arr",
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7h8M8 3l4 4-4 4"
  }))));
}

/* ─────────────────────────────────────────────────────────────────
   Video stage — lazy-loads the trailer iframe on first interaction
   so the rest of the page renders instantly. The trailer is its
   own React+Babel app — we don't want to block paint on it.
   ───────────────────────────────────────────────────────────────── */
function PlayButton() {
  return /*#__PURE__*/React.createElement("div", {
    className: "play-btn",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "28",
    height: "28",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 5v14l11-7z"
  })));
}
function Poster({
  onPlay,
  label
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "video-poster",
    onClick: onPlay,
    "aria-label": "Play trailer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "video-poster__bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "video-poster__grid"
  }), /*#__PURE__*/React.createElement("img", {
    className: "video-poster__mark",
    src: window.__resources.flowmark,
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "video-poster__overlay"
  }, /*#__PURE__*/React.createElement(PlayButton, null), /*#__PURE__*/React.createElement("div", {
    className: "video-poster__meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "video-poster__kicker"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "video-poster__title"
  }, "FlowWorks \u2014 Platform trailer"), /*#__PURE__*/React.createElement("span", {
    className: "video-poster__dur"
  }, "\u25B6 Play \xB7 40 sec"))));
}
function VideoFrame({
  frame = 'sleek'
}) {
  const [playing, setPlaying] = React.useState(false);
  const play = () => setPlaying(true);
  const media = playing ? /*#__PURE__*/React.createElement("iframe", {
    src: window.__resources.trailer,
    title: "FlowWorks Platform Trailer",
    allow: "autoplay; fullscreen"
  }) : /*#__PURE__*/React.createElement(Poster, {
    onPlay: play,
    label: "PLATFORM TRAILER"
  });
  if (frame === 'sleek') {
    return /*#__PURE__*/React.createElement("div", {
      className: "video-sleek"
    }, /*#__PURE__*/React.createElement("div", {
      className: "video-sleek__glow"
    }), /*#__PURE__*/React.createElement("div", {
      className: "video-sleek__frame"
    }, media));
  }
  if (frame === 'bare') {
    return /*#__PURE__*/React.createElement("div", {
      className: "video-stage"
    }, /*#__PURE__*/React.createElement("div", {
      className: "video-stage__glow"
    }), media);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "video-chrome"
  }, /*#__PURE__*/React.createElement("div", {
    className: "video-chrome__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot dot--r"
  }), /*#__PURE__*/React.createElement("span", {
    className: "dot dot--y"
  }), /*#__PURE__*/React.createElement("span", {
    className: "dot dot--g"
  }), /*#__PURE__*/React.createElement("div", {
    className: "addr"
  }, "app.flowworks.com / trailer")), /*#__PURE__*/React.createElement("div", {
    className: "video-chrome__body"
  }, media));
}

/* ─────────────────────────────────────────────────────────────────
   Hero variants
   ───────────────────────────────────────────────────────────────── */

const HERO_KICKER = "PLATFORM TRAILER · 40 SECONDS";
const HERO_TITLE_1 = "Logistics,";
const HERO_TITLE_2 = "in flow.";
const HERO_SUB = "Connect people, processes, and data in one custom portal — designed to fit your operations perfectly.";
function HeroCTAs() {
  return /*#__PURE__*/React.createElement("div", {
    className: "hero__ctas"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn--primary btn--lg",
    href: "#demo"
  }, "Request a demo", /*#__PURE__*/React.createElement("svg", {
    className: "arr",
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7h8M8 3l4 4-4 4"
  }))), /*#__PURE__*/React.createElement("a", {
    className: "btn btn--ghost-dark btn--lg",
    href: "#platform"
  }, "Explore the platform"));
}
function HeroTheatre() {
  return /*#__PURE__*/React.createElement("section", {
    className: "hero hero--theatre",
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-bg grid-bg--dark"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__kicker reveal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, HERO_KICKER)), /*#__PURE__*/React.createElement("h1", {
    className: "display display-xl hero__title reveal reveal--d1"
  }, HERO_TITLE_1, " ", /*#__PURE__*/React.createElement("span", {
    className: "teal"
  }, HERO_TITLE_2)), /*#__PURE__*/React.createElement("p", {
    className: "lead hero__sub reveal reveal--d2"
  }, HERO_SUB), /*#__PURE__*/React.createElement("div", {
    className: "reveal reveal--d3"
  }, /*#__PURE__*/React.createElement(HeroCTAs, null)), /*#__PURE__*/React.createElement("div", {
    className: "reveal reveal--d4"
  }, /*#__PURE__*/React.createElement(VideoFrame, {
    frame: "sleek"
  })), /*#__PURE__*/React.createElement("div", {
    className: "reveal reveal--d5",
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "scroll-cue"
  }, /*#__PURE__*/React.createElement("span", null, "Scroll"), /*#__PURE__*/React.createElement("span", {
    className: "bar"
  })))));
}
function HeroSplit() {
  return /*#__PURE__*/React.createElement("section", {
    className: "hero hero--split",
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero__inner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero__kicker reveal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, HERO_KICKER)), /*#__PURE__*/React.createElement("h1", {
    className: "display display-lg hero__title reveal reveal--d1",
    style: {
      marginTop: 28
    }
  }, HERO_TITLE_1, " ", /*#__PURE__*/React.createElement("span", {
    className: "teal"
  }, HERO_TITLE_2)), /*#__PURE__*/React.createElement("p", {
    className: "lead hero__sub reveal reveal--d2"
  }, HERO_SUB), /*#__PURE__*/React.createElement("div", {
    className: "reveal reveal--d3"
  }, /*#__PURE__*/React.createElement(HeroCTAs, null)), /*#__PURE__*/React.createElement("div", {
    className: "reveal reveal--d4",
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "tape"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tape__dot"
  }), "Live across 3 tailor-made portals"))), /*#__PURE__*/React.createElement("div", {
    className: "reveal reveal--d2"
  }, /*#__PURE__*/React.createElement(VideoFrame, {
    frame: "sleek"
  }))));
}
function HeroFull() {
  const [playing, setPlaying] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    className: "hero hero--full",
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero--full__video"
  }, playing ? /*#__PURE__*/React.createElement("iframe", {
    src: window.__resources.trailer,
    title: "FlowWorks Platform Trailer",
    allow: "autoplay; fullscreen"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "hero--full__poster"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero--full__poster-grid"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hero--full__veil"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__kicker reveal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, HERO_KICKER)), /*#__PURE__*/React.createElement("h1", {
    className: "display display-xl hero__title reveal reveal--d1"
  }, HERO_TITLE_1, " ", /*#__PURE__*/React.createElement("span", {
    className: "teal"
  }, HERO_TITLE_2)), /*#__PURE__*/React.createElement("p", {
    className: "lead hero__sub reveal reveal--d2"
  }, HERO_SUB), /*#__PURE__*/React.createElement("div", {
    className: "reveal reveal--d3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__ctas"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn--primary btn--lg",
    onClick: () => setPlaying(true),
    style: {
      display: playing ? 'none' : 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 5v14l11-7z"
  })), "Play trailer \xB7 40 sec"), /*#__PURE__*/React.createElement("a", {
    className: "btn btn--primary btn--lg",
    href: "#demo",
    style: {
      display: playing ? 'inline-flex' : 'none'
    }
  }, "Request a demo", /*#__PURE__*/React.createElement("svg", {
    className: "arr",
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7h8M8 3l4 4-4 4"
  }))), /*#__PURE__*/React.createElement("a", {
    className: "btn btn--ghost-dark btn--lg",
    href: "#platform"
  }, "Explore the platform")))));
}
function HeroEditorial() {
  return /*#__PURE__*/React.createElement("section", {
    className: "hero hero--editorial",
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero__corners"
  }, /*#__PURE__*/React.createElement("div", {
    className: "corner corner--tl"
  }, "FlowWorks \xB7 v2.5"), /*#__PURE__*/React.createElement("div", {
    className: "corner corner--tr"
  }, "Rotterdam \xB7 2025"), /*#__PURE__*/React.createElement("div", {
    className: "corner corner--bl"
  }, "Logistics Portal"), /*#__PURE__*/React.createElement("div", {
    className: "corner corner--br"
  }, "40 sec \xB7 Watch the trailer \u2193")), /*#__PURE__*/React.createElement("div", {
    className: "hero__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__kicker reveal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, HERO_KICKER)), /*#__PURE__*/React.createElement("h1", {
    className: "display display-xl hero__title reveal reveal--d1"
  }, HERO_TITLE_1, " ", /*#__PURE__*/React.createElement("span", {
    className: "teal"
  }, HERO_TITLE_2)), /*#__PURE__*/React.createElement("p", {
    className: "lead hero__sub reveal reveal--d2"
  }, HERO_SUB), /*#__PURE__*/React.createElement("div", {
    className: "reveal reveal--d3"
  }, /*#__PURE__*/React.createElement(HeroCTAs, null)), /*#__PURE__*/React.createElement("div", {
    className: "reveal reveal--d4"
  }, /*#__PURE__*/React.createElement(VideoFrame, {
    frame: "sleek"
  }))));
}
function Hero({
  variant = 'theatre'
}) {
  // Re-mount on variant change so the iframe + animations reset cleanly
  return /*#__PURE__*/React.createElement(React.Fragment, {
    key: variant
  }, variant === 'theatre' && /*#__PURE__*/React.createElement(HeroTheatre, null), variant === 'split' && /*#__PURE__*/React.createElement(HeroSplit, null), variant === 'full' && /*#__PURE__*/React.createElement(HeroFull, null), variant === 'editorial' && /*#__PURE__*/React.createElement(HeroEditorial, null));
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
  web3formsKey: ''
};
const MAIL_RE = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/;
function DemoSection() {
  const [status, setStatus] = React.useState('idle'); // idle | sending | ok | error
  const submitted = status === 'ok';
  const onSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.botcheck) return; // honeypot

    const configured = MAIL_RE.test(DEMO_FORM.to);

    // Not configured yet — hand off to the visitor's mail client so
    // nothing is silently lost.
    if (!configured && !DEMO_FORM.web3formsKey) {
      const body = ['Name: ' + (data.name || ''), 'Company: ' + (data.company || ''), 'E-mail: ' + (data.email || ''), '', data.message || ''].join('\n');
      window.location.href = 'mailto:' + DEMO_FORM.to + '?subject=' + encodeURIComponent(DEMO_FORM.subject) + '&body=' + encodeURIComponent(body);
      setStatus('ok');
      form.reset();
      return;
    }
    setStatus('sending');
    try {
      const useWeb3 = !!DEMO_FORM.web3formsKey;
      const url = useWeb3 ? 'https://api.web3forms.com/submit' : 'https://formsubmit.co/ajax/' + encodeURIComponent(DEMO_FORM.to);
      const payload = useWeb3 ? {
        access_key: DEMO_FORM.web3formsKey,
        subject: DEMO_FORM.subject,
        from_name: 'FlowWorks website',
        replyto: data.email,
        name: data.name,
        company: data.company,
        email: data.email,
        message: data.message
      } : {
        _subject: DEMO_FORM.subject,
        _template: 'table',
        _captcha: 'false',
        Name: data.name,
        Company: data.company,
        email: data.email,
        Message: data.message
      };
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false || json.success === 'false') {
        throw new Error(json.message || 'HTTP ' + res.status);
      }
      setStatus('ok');
      form.reset();
    } catch (err) {
      console.error('Demo request failed:', err);
      setStatus('error');
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "section demo-section",
    id: "demo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container demo-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "demo-grid__pitch"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker reveal"
  }, "00 / Request a demo"), /*#__PURE__*/React.createElement("h2", {
    className: "display display-md reveal reveal--d1",
    style: {
      marginTop: 16
    }
  }, "See your operations ", /*#__PURE__*/React.createElement("span", {
    className: "teal"
  }, "in flow.")), /*#__PURE__*/React.createElement("p", {
    className: "lead reveal reveal--d2"
  }, "Fill out the form and we'll set up a personalised walkthrough \u2014 tailored to your shipments, your processes, and the data you already have."), /*#__PURE__*/React.createElement("ul", {
    className: "demo-bullets reveal reveal--d3"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }, "\u2713"), "30-minute call, no slide deck"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }, "\u2713"), "Live demo on shipments that look like yours"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }, "\u2713"), "Custom portal scoping discussion"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }, "\u2713"), "Reply within one business day"))), /*#__PURE__*/React.createElement("form", {
    className: "form reveal reveal--d2",
    onSubmit: onSubmit
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "botcheck",
    tabIndex: -1,
    "aria-hidden": "true",
    style: {
      display: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "form__row form__row--2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Name ", /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "name",
    required: true,
    placeholder: "Jane Doe"
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Company ", /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "company",
    required: true,
    placeholder: "Company B.V."
  }))), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "E-mail ", /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "email",
    name: "email",
    required: true,
    placeholder: "jane@company.com"
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Message ", /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*")), /*#__PURE__*/React.createElement("textarea", {
    name: "message",
    required: true,
    placeholder: "Tell us about your operations \u2014 number of shipments, current tools, what you'd like to improve."
  })), /*#__PURE__*/React.createElement("div", {
    className: "form__footer"
  }, /*#__PURE__*/React.createElement("span", {
    className: "form__hint"
  }, "* Required field"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary btn--lg",
    type: "submit",
    disabled: status === 'sending',
    style: status === 'sending' ? {
      opacity: 0.6,
      cursor: 'wait'
    } : null
  }, status === 'sending' ? 'Sending…' : 'Send request', /*#__PURE__*/React.createElement("svg", {
    className: "arr",
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7h8M8 3l4 4-4 4"
  })))), submitted && /*#__PURE__*/React.createElement("div", {
    className: "form__success"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: 'var(--green)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      flex: '0 0 22px'
    }
  }, "\u2713"), "Thank you \u2014 we'll get in touch within one business day."), status === 'error' && /*#__PURE__*/React.createElement("div", {
    className: "form__success",
    style: {
      color: '#8c2f22'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: '#c0392b',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      flex: '0 0 22px'
    }
  }, "!"), "Something went wrong sending your request. Please e-mail us at", ' ', MAIL_RE.test(DEMO_FORM.to) ? DEMO_FORM.to : 'our team', " instead."))));
}

/* ─────────────────────────────────────────────────────────────────
   Platform features
   ───────────────────────────────────────────────────────────────── */
const FEATURES = [{
  tag: 'F.01',
  icon: '◆',
  title: 'Real-time tracking',
  desc: 'Shipments and containers, visible across every leg of the journey — sea, road, inland — with live ETA and voyage progress.'
}, {
  tag: 'F.02',
  icon: '⌘',
  title: 'AI document analysis',
  desc: 'Upload once. Extract every output: quotations, BL instructions, customs docs, transport orders — no manual re-typing.'
}, {
  tag: 'F.03',
  icon: '↔',
  title: 'Seamless data transfer',
  desc: 'Connect to the systems you already run — TMS, ERP, carrier APIs. Data flows in, data flows out, nothing in between.'
}, {
  tag: 'F.04',
  icon: '◯',
  title: 'CO₂ monitoring',
  desc: 'Emissions tracked per shipment, per route, per leg — ready for ESG reporting and Scope 3 disclosures.'
}, {
  tag: 'F.05',
  icon: '◤',
  title: 'BI dashboards',
  desc: 'Live KPIs, historical trends, carrier performance — owner and client see the same numbers, side by side.'
}, {
  tag: 'F.06',
  icon: '✦',
  title: 'Tailor-made portals',
  desc: 'Forwarders, inland shipping, container ops — the platform adapts to your workflow, not the other way around.'
}];
function PlatformSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section section--dark platform-dark",
    id: "platform"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-bg grid-bg--dark"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "features-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "kicker reveal"
  }, "01 / Platform"), /*#__PURE__*/React.createElement("h2", {
    className: "display display-lg reveal reveal--d1",
    style: {
      marginTop: 28
    }
  }, "Built for every", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "teal"
  }, "link in the chain."))), /*#__PURE__*/React.createElement("p", {
    className: "lead reveal reveal--d2"
  }, "FlowWorks is more than container tracking. It's tailor-made software that adapts to your operation \u2014 from tracking and inventory to inland shipping, customs, and the BI tools that tell you what to do next.")), /*#__PURE__*/React.createElement("div", {
    className: "features"
  }, FEATURES.map((f, i) => /*#__PURE__*/React.createElement("article", {
    key: f.title,
    className: `feature feature--dark reveal reveal--d${i % 3 + 1}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "feature__tag"
  }, f.tag), /*#__PURE__*/React.createElement("div", {
    className: "feature__icon"
  }, f.icon), /*#__PURE__*/React.createElement("h3", {
    className: "feature__title"
  }, f.title), /*#__PURE__*/React.createElement("p", {
    className: "feature__desc"
  }, f.desc))))));
}

/* Portfolio section removed per request — trailer covers it. */

/* ─────────────────────────────────────────────────────────────────
   Founders
   ───────────────────────────────────────────────────────────────── */
function FoundersSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "features-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "kicker reveal"
  }, "03 / About"), /*#__PURE__*/React.createElement("h2", {
    className: "display display-lg reveal reveal--d1",
    style: {
      marginTop: 28
    }
  }, "Built by people", /*#__PURE__*/React.createElement("br", null), "who've ", /*#__PURE__*/React.createElement("span", {
    className: "teal"
  }, "moved the cargo."))), /*#__PURE__*/React.createElement("p", {
    className: "lead reveal reveal--d2"
  }, "FlowWorks is co-founded by two people who lived the problem long before they built the solution \u2014 combining hands-on IT and decades of logistics operations into one platform.")), /*#__PURE__*/React.createElement("div", {
    className: "founders"
  }, /*#__PURE__*/React.createElement("article", {
    className: "founder reveal reveal--d1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "founder__photo"
  }, "Photo", /*#__PURE__*/React.createElement("br", null), "Tygo de Groot"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "founder__name"
  }, "Tygo de Groot"), /*#__PURE__*/React.createElement("div", {
    className: "founder__role"
  }, "Co-Founder \xB7 IT & Product"), /*#__PURE__*/React.createElement("p", {
    className: "founder__bio"
  }, "Tygo combines a hands-on IT background with practical experience in logistics, giving him a unique perspective on how technology can solve real-world operational challenges. He's passionate about digitalizing processes and building portals that are intuitive, efficient, and tailored to the way teams actually work."), /*#__PURE__*/React.createElement("div", {
    className: "founder__links"
  }, /*#__PURE__*/React.createElement("a", {
    className: "icon-link",
    href: "https://www.linkedin.com/flowworkssolutions",
    target: "_blank",
    rel: "noopener"
  }, "LinkedIn \u2197"), /*#__PURE__*/React.createElement("a", {
    className: "icon-link",
    href: "mailto:info@flowworkssolutions.com"
  }, "Email")))), /*#__PURE__*/React.createElement("article", {
    className: "founder reveal reveal--d2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "founder__photo"
  }, "Photo", /*#__PURE__*/React.createElement("br", null), "Mike de Heer"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "founder__name"
  }, "Mike de Heer"), /*#__PURE__*/React.createElement("div", {
    className: "founder__role"
  }, "Co-Founder \xB7 Operations & Logistics"), /*#__PURE__*/React.createElement("p", {
    className: "founder__bio"
  }, "Mike has a comprehensive background in logistics \u2014 operations, planning, supply-chain management, process optimization. This breadth lets him design practical, well-thought-out solutions that address the day-to-day challenges logistics teams face, enabling organisations to collaborate better and maintain full control."), /*#__PURE__*/React.createElement("div", {
    className: "founder__links"
  }, /*#__PURE__*/React.createElement("a", {
    className: "icon-link",
    href: "https://www.linkedin.com/flowworkssolutions",
    target: "_blank",
    rel: "noopener"
  }, "LinkedIn \u2197"), /*#__PURE__*/React.createElement("a", {
    className: "icon-link",
    href: "mailto:info@flowworkssolutions.com"
  }, "Email")))))));
}

/* ─────────────────────────────────────────────────────────────────
   Footer
   ───────────────────────────────────────────────────────────────── */
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer",
    id: "contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-bg grid-bg--dark"
  }), /*#__PURE__*/React.createElement("div", {
    className: "footer__grid",
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "footer__brand"
  }, /*#__PURE__*/React.createElement(FlowMark, {
    size: 30
  }), /*#__PURE__*/React.createElement("span", null, "FlowWorks")), /*#__PURE__*/React.createElement("div", {
    className: "footer__tag"
  }, "Logistics, in flow"), /*#__PURE__*/React.createElement("p", {
    className: "footer__about"
  }, "One custom portal for shipments, documents, BI and CO\u2082 \u2014 built to fit your operation.")), /*#__PURE__*/React.createElement("div", {
    className: "footer__col"
  }, /*#__PURE__*/React.createElement("h4", null, "Platform"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#platform"
  }, "Features")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#about"
  }, "About us")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#demo"
  }, "Request demo")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: window.__resources.trailer,
    target: "_blank",
    rel: "noopener"
  }, "Watch trailer \u2197")))), /*#__PURE__*/React.createElement("div", {
    className: "footer__col"
  }, /*#__PURE__*/React.createElement("h4", null, "Company"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#about"
  }, "About")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@flowworkssolutions.com"
  }, "info@flowworkssolutions.com")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://www.linkedin.com/flowworkssolutions",
    target: "_blank",
    rel: "noopener"
  }, "LinkedIn \u2197")))), /*#__PURE__*/React.createElement("div", {
    className: "footer__col"
  }, /*#__PURE__*/React.createElement("h4", null, "Get in touch"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    className: "btn btn--primary",
    href: "#demo",
    style: {
      marginTop: -4
    }
  }, "Request a demo"))))), /*#__PURE__*/React.createElement("div", {
    className: "footer__bottom"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2025 FlowWorks Solutions \xB7 All rights reserved"), /*#__PURE__*/React.createElement("span", null, "v2.5 \xB7 Rotterdam")));
}

/* ─────────────────────────────────────────────────────────────────
   Exports
   ───────────────────────────────────────────────────────────────── */
Object.assign(window, {
  useReveal,
  Nav,
  Hero,
  DemoSection,
  PlatformSection,
  FoundersSection,
  Footer
});