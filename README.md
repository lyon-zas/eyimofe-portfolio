# Eyimofe "Ted" Orimolade · Portfolio

Personal site for a software and AI engineer. Structure follows gracedaniyan.com
(hero, what I do, selected works, about, journey, contact with a marquee footer);
mobile apps are shown as 3D phones like the old ted.framer.website.

Stack: Vite, React 19, TypeScript, Tailwind CSS 4, React Three Fiber (hero scene),
Framer Motion (tilt, reveals).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
```

`dist/` is plain static files with relative paths, so it deploys to Vercel,
Netlify, Cloudflare Pages or GitHub Pages as-is (build command `npm run build`,
output directory `dist`).

## Editing content

Everything you'd want to change is in `src/data.ts`:

- `profile`: name, email, socials, `photo` (put `me.jpg` in `public/` and set
  `photo: 'me.jpg'`), `resume` (put `resume.pdf` in `public/`).
- `apps`: each mobile app. `screens` takes two entries. Use
  `{ src: 'apps/<slug>/<file>.jpg' }` for a real screenshot in
  `public/apps/<slug>/`, or `{ mock: 'wallet' | 'nfc' | 'exchange' | 'lms' |
  'health' | 'rides' | 'community' | 'web3' }` for a designed stand-in screen.
  Phone screens are 1179x2556 (iPhone 15). Full-device screenshots at that
  size can be dropped in directly. For cropped screenshots, put the original
  in `raw-screenshots/<slug>/` and run
  `python3 scripts/frame_screenshot.py raw-screenshots/<slug>/x.jpg public/apps/<slug>/screens/x.jpg`
  (needs Pillow). It adds a status bar, fits the image to the screen width
  without cropping, and writes the small copy the 3D phones use.
- `aiWork`, `journey`, `education`, `services`, `numbers`, `traits`.

The hero 3D scene (`src/components/HeroScene.tsx`) uses Owego, Kulawise and Nearpays
screenshots; swap the `src` props to feature other apps.
