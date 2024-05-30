# Transliterate

A small JavaScript library for transliterating and/or sanitizing strings. Tested against a variety of edge cases and unusual inputs.

![GitHub Release](https://img.shields.io/github/v/release/digitallinguistics/transliterate)
[![GitHub issues](https://img.shields.io/github/issues/digitallinguistics/transliterate)][issues]
[![DOI](https://zenodo.org/badge/167235084.svg)][Zenodo]
[![GitHub license](https://img.shields.io/github/license/digitallinguistics/transliterate)][license]
[![GitHub stars](https://img.shields.io/github/stars/digitallinguistics/transliterate?style=social)][stargazers]

## Overview

This library is useful for linguists and data analysts working with language data. It can be used to convert a string from one writing system to another (a process known as **transliteration**), or to remove unwanted characters or sequences of characters from a string (a process known as **sanitization**). This library handles common problems that arise during transliteration and sanitization, including [bleeding][bleeding] and [feeding][feeding] issues.

- [Get answers to questions here.][discussions]
- [Report a problem here.][new-issue]
- [Request a change or feature here.][new-issue]
- [View the complete API for this library here.][API]

## Citation & Attribution

This library is maintained by [Daniel W. Hieber][me]. You can cite this library with its DOI using the following model:

> Hieber, Daniel W. 2019. digitallinguistics/transliterate. DOI: [10.5281/zenodo.2550468](https://doi.org/10.5281/zenodo.2550468).

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

**[View the entire API for this library here.][API]**

## Working with Substitution Rules

The transliterate library already handles several tricky cases on your behalf. For example, say you have the following substitution rules, and want to use them on the string `abc`:

Input | Output
:----:|:-----:
  a   |   b
  b   |   c

In this case, you probably intend the output to be `bcc`. But if you apply the `a → b` rule before the `b → c` rule, you get the output `ccc`. This is called a [<dfn>feeding problem</dfn>][feeding]. The transliterate library automatically avoids feeding problems, so that you get the expected result `bcc` rather than `ccc`.

Now say that you want to apply the following rules to the string `abacad`.

Input | Output
:----:|:-----:
  a   |   b
 ac   |   d

You probably intend the output to be `abdbd`. But if you apply the `a → b` rule before the `ac → d` rule, you get the output `bbbcbd`. This is called a [<dfn>bleeding problem</dfn>][bleeding]. The transliterate library automatically avoids bleeding problems as well, so that you get the expected result `abdbd` rather than `bbbcbd`.

Here are some things to remember about how the transliterate library applies substitutions:

- Longer substitutions are always made first. If you have substitution rules for both `ch` and `c`, the library will first substitute all instances of `ch` with its replacement, followed by all instances of `c`.

- If two substitution inputs are the same length, the substitutions will be applied in the order they were passed to the library. For example, if you have the rules `ab → d` and `bc → e`, in that order, the `ab → d` substitutions will be applied first.

Sometimes the way you want to transliterate a character or sequence of characters will depend on context. For example, you might want `a` to sometimes become `b`, and other times become `c`. In this case you have several options:

- **Update the original text** to indicate the difference. For example, you might change all the `a`s that you want to become `c`s to `ɑ` or maybe `ac` or `aa` or `\a`, or whatever makes sense for your project.

- **Update the substitution rules** to take more context into account. For example, if `a` becomes `b` before `c` and becomes `d` elsewhere, you could write your rules like this:

  Input | Output
  :----:|:-----:
   ab   |   c
    a   |   d

- **Update both the original text and the subsitution rules.** For example, you could update the original text to indicate syllable boundaries, and then update your substitution rules to use those boundaries. For instance, the sequence `abc` could be syllabified as `a.bc` or `ab.c`. After updating the original text with syllable boundaries, you could change your rules to target syllable-initial vs. syllable-final `b`; for example: `.b → d` (syllable-initial) and `b. → e` (syllable-final).

[API]:            https://developer.digitallinguistics.io/transliterate
[bleeding]:       https://en.wikipedia.org/wiki/Bleeding_order
[discussions]:    https://github.com/orgs/digitallinguistics/discussions?discussions_q=is%3Aopen+label%3A%22%F0%9F%94%84+Transliterate%22
[feeding]:        https://en.wikipedia.org/wiki/Feeding_order
[issues]:         https://github.com/digitallinguistics/transliterate/issues
[license]:        https://github.com/digitallinguistics/transliterate/blob/master/LICENSE.md
[new-issue]:      https://github.com/digitallinguistics/transliterate/issues/new
[me]:             https://github.com/dwhieb
[stargazers]:     https://github.com/digitallinguistics/transliterate/stargazers
[Zenodo]:         https://doi.org/10.5281/zenodo.2550468
