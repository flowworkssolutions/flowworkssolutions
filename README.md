# FlowWorks Solutions — website

Static site. No build step: `index.html` loads React, Babel and the page sources directly.

    index.html            the page (markup, all CSS, font declarations)
    js/app.js             page composition + settings
    js/sections.js        all page sections, incl. the demo form
    js/tweaks-panel.js    editor panel shell
    js/*.jsx              the JSX sources the .js files were compiled from
    vendor/               React, React-DOM
    fonts/  assets/       webfonts and images
    trailer.html          the embedded product trailer

## Demo request form

Requests are mailed via [FormSubmit](https://formsubmit.co) — no server, no API key.
The mailbox is set at the top of `js/sections.jsx` — after editing, recompile it to `js/sections.js` (that is the file the page loads):

    const DEMO_FORM = { to: 'info@flowworkssolutions.com', ... };

The first submission sends that mailbox a one-off activation link; confirm it once
and every later request arrives as e-mail, with the visitor's address as reply-to.

## Publishing

GitHub Pages: Settings → Pages → Deploy from branch → `main` / root.
Strato or any other host: upload the contents of this folder as-is.
Works over http(s) and straight from disk — there is no build step and no runtime transpiler.
