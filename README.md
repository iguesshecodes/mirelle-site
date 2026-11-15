# Mirelle Paper Co. website

Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies,
no tracking. Every font and image is in this folder, so nothing is loaded from
anyone else's server.

## Files
- index.html       home page
- checkout.html    product and checkout page, driven by ?p=<id>
- css/style.css    all styling
- js/app.js        menu, scroll reveals, notify form
- fonts/           Gloock, Bagel Fat One, Schibsted Grotesk, Caveat (open licence)
- img/             product previews as webp, favicon

## Before it goes live, change these three things
1. **Gumroad links.** Open checkout.html, find `PRODUCTS` near the bottom, and
   replace the two `url` values that say REPLACE. Until then the buy button
   says it is not wired up yet.
2. **Email address.** Search for `hello@mirellepaper.co` and swap in the real one.
   It appears in index.html, checkout.html and js/app.js.
3. **Pinterest link** in the footer of index.html.

## Put it on Vercel (free)
From this folder on your own computer:

    npx vercel          # sign in, accept the defaults, gives a preview link
    npx vercel --prod   # gives the live link

Or through GitHub: make a new repo, upload this folder, then on vercel.com
choose Add New, Project, Import, pick the repo, and press Deploy. No build
command and no output directory are needed, it is a static site.

## Adding a product later
Add an entry to `PRODUCTS` in checkout.html and a card in index.html. The card
links to `checkout.html?p=your-id`.
