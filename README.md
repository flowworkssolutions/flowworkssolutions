# FlowWorks Solutions — website

Static site. No build step: `index.html` loads React, Babel and the page sources directly.

    index.html            the page (markup, all CSS, font declarations)
    js/app.jsx            page composition + settings
    js/sections.jsx       all page sections, incl. the demo form
    js/tweaks-panel.jsx   editor panel shell
    vendor/               React, React-DOM, Babel
    fonts/  assets/       webfonts and images
    trailer.html          the embedded product trailer

## Demo request form

Requests are mailed via [FormSubmit](https://formsubmit.co) — no server, no API key.
The mailbox is set at the top of `js/sections.jsx`:

    const DEMO_FORM = { to: 'info@flowworkssolutions.com', ... };

The first submission sends that mailbox a one-off activation link; confirm it once
and every later request arrives as e-mail, with the visitor's address as reply-to.

## Publishing

GitHub Pages: Settings → Pages → Deploy from branch → `main` / root.
Strato or any other host: upload the contents of this folder as-is.
Must be served over http(s) — opening `index.html` from disk blocks the .jsx files.
