# FlowWorks Solutions — website

Two files, both in the repository root. No folders, no build step.

    index.html     the whole page (markup, CSS, scripts, logo — all inline)
    trailer.html   the product trailer, loaded in an iframe by index.html

Fonts and React load from public CDNs, so nothing else has to be uploaded.

## Demo request form

Requests are e-mailed through [FormSubmit](https://formsubmit.co) — no server, no API key.
The mailbox sits in `index.html`, in the `DEMO_FORM` block:

    const DEMO_FORM = { to: 'info@flowworkssolutions.com', ... };

The first submission sends that mailbox a one-off activation link. Confirm it once;
after that every request arrives as e-mail, with the visitor's address as reply-to.

## Publishing

GitHub Pages: Settings -> Pages -> Deploy from branch -> `main` / `/ (root)`.
Any other host (Strato included): upload both files to the web root.
