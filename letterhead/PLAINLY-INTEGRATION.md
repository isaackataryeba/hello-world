# Adding the letterhead generator to Plainly

Instructions for the session that has Plainly's code (plainly.astridtechnology.site).

## What this is
`index.html` is a self-contained page. It needs no build step and no server code.
Paste a message into it, see a live A4 preview, then download a PDF on Astrid Technology Limited letterhead.
- Its only outside resources are jsPDF 2.5.1 (cdnjs) and the Inter font (Google Fonts).
- When served from an astridtechnology.site subdomain, it tries to load the logo from
  https://astridtechnology.site/brand/at-logo.png. That load only works if the image is served with CORS headers.
  If it fails, the page uses a built-in vector mark, and the user can upload the logo.
- The draft and the uploaded logo are kept in the browser's localStorage under `astrid-letter-draft` and `astrid-letter-logo`.

## Suggested integration
1. Serve `index.html` at `/letterhead` (for example `public/letterhead/index.html`), behind Plainly's existing login.
2. Add a **Letterhead** entry beside the existing "Email reply" and "Chat" tabs.
3. Optional: add a **Send to letterhead** action on a drafted reply. The page reads its fields from
   localStorage on load, so one way is to set
   `localStorage['astrid-letter-draft'] = JSON.stringify({"f-body": replyText, "f-date": "...", "f-subject": "...", "f-to": "", "f-closing": "Yours faithfully,", "f-name": "", "f-title": "", sign: true})`
   and then open `/letterhead`. The two pages need the same origin for this to work.
4. Match Plainly's look: brand blue #3D93D1, ink #111827, Inter. Both already match.

## Files
- `index.html`: the standalone page (deploy this one).
- `letterhead.body.html`: the same page without the html/head wrapper (the Claude Artifact version).
- `README.md`: usage notes.
Company details are in the `CO` object near the top of the script.
