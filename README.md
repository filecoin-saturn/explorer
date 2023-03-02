[project-management]: https://github.com/orgs/subvisual/projects/2/views/1
[build-page]: https://github.com/subvisual/saturn-network-explorer/actions/
[production]: https://subvisual.github.io/saturn-network-explorer/
[figma]: https://www.figma.com/file/QcysmeYSRsbPTfoxgllQPa/Saturn---World-Map?node-id=0%3A1&t=tEOcvtLOtNx0tkf4-0

# Saturn Network Explorer

![Production build](https://github.com/subvisual/saturn-network-explorer/actions/workflows/deploy.yaml/badge.svg)

A geospatial visualization for Protocol Labs Saturn network stats

- [Project management][project-management]
- [Build Page][build-page]
- [Production][production]
- [Figma][figma]

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

Before starting, make sure you have Git and NodeJS installed.
We're using [asdf](https://asdf-vm.com/guide/introduction.html) to manage `node` verisons, it is recommended but not necessary.

First, clone & setup the repository:

```bash
git clone git@github.com:subvisual/saturn-network-explorer.git
cd saturn-network-explorer
asdf install
npm install
```

After that, open the `.env` file in your editor and fill in the required secret values.

```
MAPBOX_PUBLIC_TOKEN=YOUR_SECRET_TOKEN
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

## Testing

To launch the test runner in the interactive watch mode:

```
npm test
```

See the create-react-app section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Deployment

Deployments are automated using Github actions, check the [build page][build-page] for availble actions.

You can create a build manually by running

```
npm run build
```

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Contribution Guidelines

Contributions must follow [Subvisual's guides](https://github.com/subvisual/guides).

## About

Saturn Network Explorer was created and is maintained with :heart: by
[Subvisual][subvisual].

[![Subvisual][subvisual-logo]][subvisual]

[subvisual]: http://subvisual.com
[subvisual-logo]: https://raw.githubusercontent.com/subvisual/guides/master/github/templates/logos/blue.png
