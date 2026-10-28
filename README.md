# Shraddha Gangurde – Portfolio (React + Vite + Framer Motion)

## Run locally
```
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview
```

## Edit content
All text, projects, skills and links live in `src/data.js` (`CONFIG`). Values of `"TODO"` are hidden until you fill them in.
Resume button: put your PDF in `public/` (e.g. `public/Shraddha_Gangurde_Resume.pdf`) and set `resume: "/Shraddha_Gangurde_Resume.pdf"`.

## Deploy
- **Vercel:** push to GitHub, import the repo at vercel.com. Framework is detected as Vite; no settings needed.
- **Netlify:** import the repo (settings come from `netlify.toml`), or drag the `dist/` folder onto app.netlify.com/drop after `npm run build`.
- **GitHub Pages:** upload the contents of `dist/` to the `gh-pages` branch, or use any Pages action. `base: './'` is already set.

Tip: press Ctrl/Cmd + K on the site for the command palette.
