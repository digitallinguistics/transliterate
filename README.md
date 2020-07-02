# [Transliterate][1]

A small JavaScript library for transliterating and/or sanitizing strings. Tested against a variety of edge cases and unusual inputs.

[View the complete documentation for this library here.][8]

[![npm version](https://img.shields.io/npm/v/@digitallinguistics/transliterate.svg)][5]
[![npm downloads](https://img.shields.io/npm/dt/@digitallinguistics/transliterate.svg)][5]
[![GitHub issues](https://img.shields.io/github/issues-raw/digitallinguistics/transliterate.svg)][6]
[![license](https://img.shields.io/npm/l/@digitallinguistics/transliterate.svg)][7]

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.2550470.svg)][12]
[![GitHub stars](https://img.shields.io/github/stars/digitallinguistics/transliterate.svg?label=Stars&style=social)][1]
[![GitHub forks](https://img.shields.io/github/forks/digitallinguistics/transliterate.svg?label=Fork&style=social)][1]

## Overview

This library is useful for linguists and data analysts working with language data. It can be used to convert a string from one writing system to another (a process known as <dfn>transliteration</dfn>), or to remove unwanted characters or sequences of characters from a string (a process known as <dfn>sanitization</dfn>). This library handles common problems that arise during transliteration and sanitization, including [bleeding][2] and [feeding][3] issues.

## Demo

Check out the [Transliterator tool][4] to see this library in use.

## Issues & Feature Requests

[Click here to open an issue or make a feature request.][6]

## Citation & Attribution

This library is maintained by [Daniel W. Hieber][11]. To cite this library, please see the citation information on this repository's [Zenodo page][12].

## Installation

Install with **npm** or **yarn**:

```sh
npm install @digitallinguistics/transliterate # npm
yarn add @digitallinguistics/transliterate    # yarn
```

## Importing the Library

In the browser, include the library in your HTML (adjust the `src` to point to the location of the `transliterate.js` file in your project):

```html
<script src=transliterate.js type=module></script>
```

In Node, simply require the library:

```js
import { transliterate } from '@digitallinguistics/transliterate';
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
import { transliterate } from '@digitallinguistics/transliterate';

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
import { Transliterator } from '@digitallinguistics/transliterate';

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

[Check out the Contributing Guide][9]

[1]: https://github.com/digitallinguistics/transliterate
[2]: https://en.wikipedia.org/wiki/Bleeding_order
[3]: https://en.wikipedia.org/wiki/Feeding_order
[4]: https://tools.digitallinguistics.io/transliterator
[5]: https://www.npmjs.com/package/@digitallinguistics/transliterate
[6]: https://github.com/digitallinguistics/transliterate/issues
[7]: https://github.com/digitallinguistics/transliterate/blob/master/LICENSE.md
[8]: https://developer.digitallinguistics.io/transliterate
[9]: https://github.com/digitallinguistics/transliterate/blob/master/.github/CONTRIBUTING.md
[10]: https://nodejs.org/en/
[11]: https://danielhieber.com
[12]: https://doi.org/10.5281/zenodo.2550470
