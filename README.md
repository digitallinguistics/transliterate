# Transliterate

A small JavaScript library for transliterating and/or sanitizing strings. Tested against a variety of edge cases and unusual inputs.

[![npm](https://img.shields.io/npm/dt/@digitallinguistics/transliterate)][npm]
[![GitHub issues](https://img.shields.io/github/issues/digitallinguistics/transliterate)][issues]
[![GitHub status](https://github.com/digitallinguistics/transliterate/workflows/release/badge.svg)][status]
[![DOI](https://zenodo.org/badge/167235084.svg)][Zenodo]
[![GitHub license](https://img.shields.io/github/license/digitallinguistics/transliterate)][license]
[![GitHub stars](https://img.shields.io/github/stars/digitallinguistics/transliterate?style=social)][stargazers]

## Quick Links

* [View the complete documentation for this library here.][docs]
* [View this library on GitHub.][GitHub]
* [Click here to open an issue or make a feature request.][new-issue]

## Overview

This library is useful for linguists and data analysts working with language data. It can be used to convert a string from one writing system to another (a process known as <dfn>transliteration</dfn>), or to remove unwanted characters or sequences of characters from a string (a process known as <dfn>sanitization</dfn>). This library handles common problems that arise during transliteration and sanitization, including [bleeding][bleeding] and [feeding][feeding] issues.

## Demo

Check out the [Transliterator tool][Transliterator] to see this library in use.

## Citation & Attribution

This library is maintained by [Daniel W. Hieber][me]. You can cite this library with its DOI using the following model:

> Hieber, Daniel W. 2020. digitallinguistics/transliterate. doi:[10.5281/zenodo.2550468](https://doi.org/10.5281/zenodo.2550468).

Each version of this library is archived on this project's [Zenodo page][Zenodo].

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

In Node, simply import the library:

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
// Import the "transliterate" method from the library
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
// Import the Transliterator class
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

[bleeding]:       https://en.wikipedia.org/wiki/Bleeding_order
[docs]:           https://developer.digitallinguistics.io/transliterate
[feeding]:        https://en.wikipedia.org/wiki/Feeding_order
[GitHub]:         https://github.com/digitallinguistics/transliterate
[issues]:         https://github.com/digitallinguistics/transliterate/issues
[license]:        https://github.com/digitallinguistics/transliterate/blob/master/LICENSE.md
[new-issue]:      https://github.com/digitallinguistics/transliterate/issues/new
[me]:             https://danielhieber.com
[npm]:            https://www.npmjs.com/package/@digitallinguistics/transliterate
[stargazers]:     https://github.com/digitallinguistics/transliterate/stargazers
[status]:         https://github.com/digitallinguistics/transliterate/actions
[Transliterator]: https://tools.digitallinguistics.io/transliterator
[Zenodo]:         https://doi.org/10.5281/zenodo.2550468
