# [colormix.site](https://www.colormix.site) [![Netlify Status](https://api.netlify.com/api/v1/badges/375eb780-e886-40ed-bbb1-d47ec261388f/deploy-status)](https://app.netlify.com/sites/color-mix-site/deploys)

A site to visualize the CSS [`color-mix`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) function.

- Production: [colormix.site](https://www.colormix.site)
- Staging: Every pull request gets a preview deploy URL

## Technology overview

- This is a static site built with [Astro](https://astro.build/)
- Uses [Preact](https://preactjs.com)
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

**Build for production**

To build the app for production to the `dist` directory. This command generates static content into the `dist` directory and can be served using any static content hosting service.

```
yarn build
```

## Deployment

### To production

This site is hosted on Netlify. Anything merged into the `main` branch is deployed to production.

### To staging

This site uses Netlify preview builds. To see any branch in a live environment, push the branch to the remote and open a pull request.
