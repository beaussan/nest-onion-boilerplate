# Contributing to onion boilerplate

First of all thank you for expressing interest in onion boilerplate! :+1:<br />
We are very happy to welcome new contributors. :tada:

## How can I contribute? :man_technologist:

### Report a bug :bug:

If you think you have found a bug, please search [our issue tracker][issues] to see if anyone has already reported it.<br />
If you are the first to have noticed it, please [create an issue][new_issue], and make sure to provide any information that might help us resolve it.<br />
You are welcome to try and fix it by submitting a pull request if you would like to (see Pull requests section for more information).

### Feature requests and enhancements :sparkles:

We are open to feature requests, be sure to search [our issue tracker][issues] to see if anyone has already asked for it.<br />
If not, please [create an issue][new_issue] describing what you want, what your use case is, and an example of code.<br />
You are welcome to try and do it yourself by submitting a pull request if you would like to (see Pull requests section for more information).<br />
As immutadot is still a very young project, we are also open to enhancement suggestions; if you think of anything that might help us improve the project, please [create an issue][new_issue] and we will be happy to discuss it with you.

### Pull requests :arrow_up:

#### Installation :package:

We use [yarn](https://yarnpkg.com/) as our package manager.<br />
We don't support [npm](https://www.npmjs.com/) due to the overhead of managing two lock files and the inconsistency of `package-lock.json` between Linux and MacOS (see npm/npm#17722).<br />
Once you have cloned the project, run `yarn` to install all the dependencies.

#### Tests and Code style :policeman:

If you write any code, be sure to write the test that goes with it in a file located at the same place and named `<something>.spec.js`.<br />
We use [tslint](https://palantir.github.io/tslint/) to enforce some coding rules (2 spaces indentation, etc.), ideally use an IDE to help you comply with these rules.<br />
We use [prettier](https://prettier.io/) to have a uniform code style for everybody. It should run on pre commit automatically :tada:.<br />
Before pushing anything, please be sure to check that the tests are OK by running `yarn test` and that your code complies with the coding rules by running `yarn lint && yarn format:check`.

#### Documentation :bulb:

The better the documentation, the fewer things users will have to wonder about.<br />
We [use jsdoc](http://usejsdoc.org/) to document our code, if you write any new code please write the documentation with it and try to conform to the existing documention.<br />

#### emojis :beers:

We really :heart: emojis, and we would like you to share our :heart:.<br />
Each and every commit message has to be prefixed by an emoji.<br />
Please refer to [the gitmoji guide](https://gitmoji.carloscuesta.me/) to know which one to use.

## Any questions :question:

If you are not sure whether to report a bug or ask for a new feature, or if you just have a question about anything, please [create an issue][new_issue].

## Code of conduct :page_facing_up:

In order to keep a happy and respectful atmosphere around the project, we expect everyone participating in it to follow our [Code of conduct](https://github.com/beaussart/nest-onion-boilerplate/blob/master/.github/CODE_OF_CONDUCT.md).

[issues]: https://github.com/beaussart/nest-onion-boilerplate/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc
[new_issue]: https://github.com/beaussart/nest-onion-boilerplate/issues/new
