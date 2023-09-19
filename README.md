# Saturn Network Explorer

A geospatial visualization for [Saturn](https://saturn.tech) network stats. Live at [https://explorer.saturn.tech](https://explorer.saturn.tech).

**Table of Contents**

- [Setup](#setup)
- [Development](#development)
- [Storybook](#storybook)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contribution Guidelines](#contribution-guidelines)
- [Resources](#resources)
- [About](#about)

## Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Before starting, make sure you have Git and NodeJS installed. We're using [asdf](https://asdf-vm.com/guide/introduction.html) to manage `node` versions, it is recommended but not necessary.

First, clone & setup the repository:

```bash
git clone git@github.com:filecoin-saturn/explorer.git
cd explorer
asdf install
npm install
```

After that, open or create the `.env` file in your editor and fill in the required secret value for the [Mapbox](https://www.mapbox.com/) API.

```
REACT_APP_MAP_BOX_ACCESS_TOKEN=<your_secret_token>
```

## Development

To start your development environment run:

```
npm start
```

## Storybook

We use [Storybook](https://storybook.js.org/) to document the project components and their usage.

To start Storybook run:

```
npm run storybook
```

## Deployment

Deployments are currently automated by, and deployed to, [Netlify](https://www.netlify.com/).

For local, production builds, run

```
npm run build
```

This builds the app for production to the `build/` directory. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include hashes. The app is ready to be deployed!

## Contribution Guidelines

This codebase was originally written following [Subvisual's guides](https://github.com/subvisual/guides). For consistency, contributions should also follow this guide and its styles.

## About

Saturn Network Explorer was created and is maintained with :heart: by
[Subvisual][subvisual].

The explorer's design work can be found [here](https://www.figma.com/file/QcysmeYSRsbPTfoxgllQPa/Saturn---World-Map?node-id=0%3A1&t=tEOcvtLOtNx0tkf4-0).

[![Subvisual][subvisual-logo]][subvisual]

[subvisual]: http://subvisual.com
[subvisual-logo]: https://raw.githubusercontent.com/subvisual/guides/master/github/templates/logos/blue.png
