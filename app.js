// app.jsx — FlowWorks landing page composition + Tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "theatre",
  "accent": "#15B5A8"
} /*EDITMODE-END*/;
const HERO_OPTIONS = [{
  value: 'theatre',
  label: 'Theatre'
}, {
  value: 'split',
  label: 'Split'
}, {
  value: 'full',
  label: 'Full-bleed'
}, {
  value: 'editorial',
  label: 'Editorial'
}];
const HERO_BLURBS = {
  theatre: 'Dark cinematic block · video front-and-centre',
  split: 'Text left, framed video right · classic SaaS',
  full: 'Trailer fills the viewport · most cinematic',
  editorial: 'Centred video · mono corner kickers'
};
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply accent to CSS custom property so any --teal usage updates
  React.useEffect(() => {
    document.documentElement.style.setProperty('--teal', t.accent);
  }, [t.accent]);

  // Tag body with active hero variant so CSS can adapt nav contrast etc.
  React.useEffect(() => {
    document.body.dataset.hero = t.hero;
  }, [t.hero]);

  // Run reveal observer whenever the page mounts / hero changes
  useReveal();
  React.useEffect(() => {
    // Re-scan after hero swap (DOM changed)
    const id = window.setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        if (!el.classList.contains('is-visible')) {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight * 0.95) el.classList.add('is-visible');
        }
      });
    }, 50);
    return () => window.clearTimeout(id);
  }, [t.hero]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, {
    variant: t.hero
  }), /*#__PURE__*/React.createElement(DemoSection, null), /*#__PURE__*/React.createElement(PlatformSection, null), /*#__PURE__*/React.createElement(FoundersSection, null)), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Landing Tweaks",
    noDeckControls: true
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Hero treatment"
  }, /*#__PURE__*/React.createElement(TweakSelect, {
    label: "Variant",
    value: t.hero,
    options: HERO_OPTIONS,
    onChange: v => setTweak('hero', v)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '4px 0 8px',
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      color: '#888',
      lineHeight: 1.5
    }
  }, HERO_BLURBS[t.hero])), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Accent colour"
  }, /*#__PURE__*/React.createElement(TweakColor, {
    label: "Brand teal",
    value: t.accent,
    options: ['#15B5A8', '#0F8F85', '#2DC084', '#1E8FB5', '#0E2E2C'],
    onChange: v => setTweak('accent', v)
  }))));
}
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(/*#__PURE__*/React.createElement(App, null));