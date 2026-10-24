# Duckrise

A small, responsive landing page with an animated pixel-art duck, a rising sun, and a staggered wordmark reveal. Built with plain HTML, CSS, and JavaScript. No build step or dependencies.

Click or tap the duck to hear it quack, or focus it with Tab and press Enter or Space. The short, raspy arcade-style honk is synthesized with the Web Audio API, with slight pitch variation, and only plays on interaction. A speech bubble provides visual feedback even when audio is unavailable.

## Run

Open `index.html` in a browser, or serve this directory with any static server:

```sh
npx serve .
```

The page respects the system's reduced-motion preference. Google Fonts are optional; system fonts are used if they cannot load.
