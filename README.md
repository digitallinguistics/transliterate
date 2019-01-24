# [Transliterate][1]

A small JavaScript library for transliterating and/or sanitizing strings. Works on Node (LTS) or in the browser.

[View the complete documentation for this library here.][8]

[![npm version](https://img.shields.io/npm/v/@digitallinguistics/transliterate.svg)][5]
[![npm downloads](https://img.shields.io/npm/dt/@digitallinguistics/transliterate.svg)][5]
[![GitHub issues](https://img.shields.io/github/issues-raw/digitallinguistics/transliterate.svg)][6]
[![license](https://img.shields.io/npm/l/@digitallinguistics/transliterate.svg)][7]

[![GitHub stars](https://img.shields.io/github/stars/digitallinguistics/transliterate.svg?label=Stars&style=social)][1]
[![GitHub forks](https://img.shields.io/github/forks/digitallinguistics/transliterate.svg?label=Fork&style=social)][1]

## Overview

This library is useful for linguists and data analysts working with language data. It can be used to convert a string from one writing system to another (a process known as "transliteration"), or to remove unwanted characters or sequences of characters from a string (a process known as "sanitization"). This library handles common problems that arise during transliteration and sanitization, including [bleeding][2] and [feeding][3] issues.

## Demo

Check out the [Transliterator tool][4] to see this library in use.

## Issues & Feature Requests

[Click here to open an issue or make a feature request.][6]

## Installation

Install with **npm** or **yarn**:

```sh
npm install @digitallinguistics/transliterate # npm
yarn add @digitallinguistics/transliterate    # yarn
```

## Importing the Library

In the browser, include the library in your HTML (adjust the `src` to point to the location of the `transliterate.js` file in your project):

```html
<!-- Using ES6 modules -->
<script src=transliterate.js type=module></script>

<!-- As a global variable -->
<script src=transliterate.bundle.js></script>
```

In Node, simply require the library:

```js
const { transliterate } = require(`@digitallinguistics/transliterate`);
```

## Basic Usage

The `transliterate` library exports an object with four methods:

- `transliterate`
- `Transliterator`
- `sanitize`
- `Sanitizer`

The `sanitize` and `Sanitizer` exports are essentially just aliases for `transliterate` and `Transliterator` respectively.

To transliterate a string, use the `transliterate` method:

```js
// Import just the "transliterate" method from the library
const { transliterate } = transliterate;

// The list of substitutions to make
const substitutions = {
  p: `b`,
  t: `d`,
  k: `g`,
};

// The string to transliterate
const input = `patak`;

// Transliterate the string
const output = transliterate(input, substitutions);

console.log(output); // --> "badag"
```

To save a set of transliteration rules for reuse on more than one string, use the `Transliterator` class:

```js
// Import just the Transliterator class
const { Transliterator } = transliterate;

// The list of substitutions to use for transliteration
const substitutions = {
  p: `b`,
  t: `d`,
  k: `g`,
};

// Create a transliterate function that always
// applies the same substitutions
const transliterate = new Transliterator(substitutions);

// The string to transliterate
const input = `patak`;

// Transliterate the string
const output = transliterate(input);

console.log(output); // --> "badag"
```

## Contributing

Thanks for contributing to the DLx `transliterate` project! Pull requests for improvements to this library are welcome. Please start by [opening an issue][6] or making sure an issue for the change already exists.

To install the project and its dependencies, first make sure you have the latest LTS release of Node.js installed. Then using the command line, navigate to the project folder, and run `npm install`.

The source code for this project is located in the `transliterate.js` file. An ESLint stylesheet can also be found in the project root. Please check that your code adheres to the ESLint stylesheet (or that exceptions are documented in your code using `eslint-ignore`) before submitting your pull request.

Once you have made your changes, rebuild the project by running `npm run build` from the command line. This will bundle the source code into `transliterate.bundle.js` for use as a library, and generate the documentation for the library.

Tests are run using [Jasmine][9], and can be run from the command line using `npm test`. Be sure to update and run the tests (located in `transliterate.test.js`) as needed before submitting your pull request.

[1]: https://github.com/digitallinguistics/transliterate
[2]: https://en.wikipedia.org/wiki/Bleeding_order
[3]: https://en.wikipedia.org/wiki/Feeding_order
[4]: https://tools.digitallinguistics.io/transliterator
[5]: https://www.npmjs.com/package/@digitallinguistics/transliterate
[6]: https://github.com/digitallinguistics/transliterate/issues
[7]: https://github.com/digitallinguistics/transliterate/blob/master/LICENSE.md
[8]: https://developer.digitallinguistics.io/transliterate
[9]: https://jasmine.github.io/
[10]: https://nodejs.org/en/
