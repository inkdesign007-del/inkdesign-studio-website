# InkDesign Studio website

Static GitHub Pages website for [inkdesignstudio.co.in](https://inkdesignstudio.co.in/).

## Local preview

Open `index.html` in a browser, or use any static-file server from this folder. No build step or package installation is required.

## Enquiries

The enquiry form validates its required fields in the browser and opens WhatsApp with a pre-filled message to `+91 88509 15636`. It deliberately does not submit or store contact details on a third-party form service.

To also collect form submissions by email or a CRM, replace the JavaScript submission handler in `script.js` with the chosen provider's endpoint and update the privacy notice before publishing.

## Analytics

The site writes named interaction events to `window.dataLayer`; connect a Google Tag Manager or other analytics snippet in `index.html` to activate tracking. No analytics vendor is configured by default.

## Publishing

1. Commit and push the files to the repository's publishing branch (currently `main`).
2. In GitHub, open **Settings → Pages** and confirm it deploys from the selected branch/root.
3. Keep the existing `CNAME` file unchanged. It maps GitHub Pages to `inkdesignstudio.co.in` and requires no DNS change for this update.
