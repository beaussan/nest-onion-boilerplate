<h1 align="center">Welcome to Nest Onion Boilerplate 👋</h1>
<p align="center">
    <a href="https://forthebadge.com/">
        <img alt="build with love" src="https://forthebadge.com/images/badges/built-with-love.svg">
    </a>
    <a href="https://forthebadge.com/">
        <img alt="build with love" src="https://forthebadge.com/images/badges/made-with-javascript.svg">
    </a>
</p>
<p align="center">
    <a href="https://greenkeeper.io/">
        <img src="https://badges.greenkeeper.io/beaussart/nest-onion-boilerplate.svg" alt="Greenkeeper badge" />
    </a>
    <a href="https://circleci.com/gh/beaussart/nest-onion-boilerplate/tree/master">
        <img src="https://img.shields.io/circleci/build/github/beaussart/nest-onion-boilerplate/master?style=flat-square" alt="CircleCI" />
        </a>
    <a href="https://codecov.io/gh/beaussart/nest-onion-boilerplate">
      <img src="https://img.shields.io/codecov/c/github/beaussart/nest-onion-boilerplate?style=flat-square" />
    </a>
    <a href="https://gitmoji.carloscuesta.me">
        <img src="https://img.shields.io/badge/commit%20convention-gitmoji-green.svg?style=flat-square"
             alt="Gitmoji">
    </a>
    <a href="#badge">
        <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
    </a>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?style=flat-square" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" />
  </a>
  <a href="https://twitter.com/Beaussart_n" target="_blank">
    <img alt="Twitter: Beaussart_n" src="https://img.shields.io/twitter/follow/Beaussart_n.svg?style=social" />
  </a>
</p>

> A starter kit for a production ready Nestjs application

## What's in it

| Feat                | Techno                                 | Status      |
| ------------------- | -------------------------------------- | ----------- |
| Database            | Typeorm (pluged for now on postgresql) | Done        |
| Env config          | Dotenv + Joi for validation            | Done        |
| Docker              | dockerfile                             | Done        |
| Swagger             |                                        | Done        |
| Testing             | Jest + supertest                       | In progress |
| Auth                | Nest Passport + jwt                    | In progress |
| Metrics             | Prometheus                             | In progress |
| Logger              | Winston                                | In progress |
| Code generator      | Hygen                                  | In progress |
| S3 / GCP storage    |                                        | To do       |
| Mailing             |                                        | To do       |
| Search with algolia |                                        | To do       |
| Search with Elastic |                                        | To do       |
| Error Reporting     | Sentry                                 | To do       |

And any features requested by future users.

## Installation

```bash
$ npm install
# Or
$ yarn install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Lints

```bash
$ npm run format:check

$ npm run lint
```

## Generate

```bash
$ npm run generate module with-crud --name myModule
```

## Author

👤 **Nicolas Beaussart <nic.beaussart@gmail.com>**

- Twitter: [@Beaussart_n](https://twitter.com/Beaussart_n)
- Github: [@beaussart](https://github.com/beaussart)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/beaussart/nest-onion-boilerplate/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
