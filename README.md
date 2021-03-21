# Univerxities

A simple web app to search for universities around the world, using data provided by [Hipo University Domains and Names Data API](https://github.com/Hipo/university-domains-list).

## Features

- Universities list with search and favorites capability
- Favorite universities list
- Newsletter subscription form
- Responsive design
- Authentication and registration
- Dark mode

## Tech Stack

Alongside the required technologies like React JS and Typescript, the app uses a few other libraries to support development.

- [NextJS](https://nextjs.org/) - ReactJS-based SSR app framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Axios](https://github.com/axios/axios) - HTTP client
- [Framer Motion](https://www.framer.com/motion/) - ReactJS animation library
- [Styled Icons](https://styled-icons.js.org/) - Icon library
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) - String hash library
- [Cypress](https://www.cypress.io/) - E2E test runner

## Getting Started

### Requirements

Please make sure the following software are installed on your system.

- NodeJS >= 10.13
- Yarn 1.x
- Git
- Web Browser

### Installation

Firstly, clone this repo to your machine.

```shell
$ git clone https://github.com/ndyhrdy/ideal-goggles univerxities # using https
$ git clone git@github.com:ndyhrdy/ideal-goggles.git univerxities # using ssh
```

Change into the project directory and install dependencies.

```shell
$ cd univerxities
$ yarn
```

The app can now be served locally using the `yarn dev` script. Then open a browser and navigate to `http://localhost:3000` to access the app.

```shell
$ yarn dev
```

## Running Tests

This app uses Cypress for testing. The Cypress UI can be started using the script `yarn cy`. But first make sure the NextJS dev server is running.

```shell
$ yarn dev # if server is not running yet
$ yarn cy
```

All integration tests are listed in the Cypress UI. Click on a single spec to run the tests defined in it, or click `Run x integration specs` to run all tests. Cypress will automatically open an installed browser in headless mode to begin testing.
