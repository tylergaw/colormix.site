# [colormix.style](https://www.colormix.style) [![Netlify Status](https://api.netlify.com/api/v1/badges/375eb780-e886-40ed-bbb1-d47ec261388f/deploy-status)](https://app.netlify.com/sites/color-mix-style/deploys)

A site to visualize the CSS [`color-mix`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) function.

- Production: [colormix.style](https://www.colormix.style)
- Staging: Every pull request gets a preview deploy URL
- Figma: [figma.com/file/X2rvL8LtTk5Cw4rxECTqdY/colormix](https://www.figma.com/file/X2rvL8LtTk5Cw4rxECTqdY/colormix)

## Technology overview

- This is a static site built with [Astro](https://astro.build/)
- TypeScript (most of the time)
- Makes use of [Preact](https://preactjs.com) and [Nano Stores](https://github.com/nanostores/nanostores)
- Hosted on Netlify

## Local setup

**Install dependencies**

```
yarn
```

**Start development server**

```
yarn start
```

The site will be available at [http://localhost:3000](http://localhost:3000)

**Preview production**

Do a production build and local server to mimic a production environment. Note that there's no reload when files are changed.

```
yarn preview
```

**Build for production**

Generates static content into the `dist` directory that can be served using any static content hosting service.

```
yarn build
```

## Deployment

### To production

This site is hosted on Netlify. Anything merged into the `main` branch is deployed to production.

### To staging

This site uses Netlify preview builds. To see any branch in a live environment, push the branch to the remote and open a pull request.
