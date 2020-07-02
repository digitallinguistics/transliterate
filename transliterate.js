/* eslint-disable
  no-constructor-return,
*/

/**
 * Gets a random code point from the Unicode geometric shapes block
 * @private
 * @return {String} Returns the random Unicode character
 */
function getRandomCodePoint() {
  const blockBegin  = 9632;
  const blockLength = 95;
  return String.fromCodePoint(Math.floor(Math.random() * blockLength) + blockBegin);
}

/**
 * An alias for the {@link transliterate} method
 * @see transliterate
 */
function sanitize(string, substitutions) {
  return transliterate(string, substitutions);
}

/**
 * An alias for the {@link Transliterator} class
 * @see Transliterator
 */
class Sanitizer {
  constructor(substitutions) {
    this.substitutions = substitutions;
    return string => sanitize(string, substitutions);
  }
}

/**
 * Makes a series of substitutions on a string. Can be used to convert a string from one writing system to another (a process known as "transliteration") or to remove unwanted characters or sequences of characters from a string (a process known as "sanitization").
 * @param  {String} [string=``]          The string to transliterate or sanitize.
 * @param  {Object} [substitutions = {}] A hash of substitutions to make on the string. Each key in this object should be a string of characters you want to replace, and the value for that key should be the new string of characters to replace it with. For example, setting `"s": "z"` will replace all `s` characters with `z`. To sanitize a string, provide each unwanted character or sequence of characters as as a key, and set the value of that key to an empty string. For example, setting `"ts": ""` in this object will remove all sequences of `ts` from the string (but leave individual instances of `t` and `s` that do not appear in sequence).
 * @return {String}                      Returns a new string with all substitutions made.
 * @example {@lang javascript}
 * const substitutions = {
 *   tʼ: `d`,
 *   ts: `c`,
 * };
 *
 * const input  = `tsatʼ`;
 * const output = transliterate(input, substitutions);
 * console.log(output); // --> "cad"
 */
function transliterate(string = ``, substitutions = {}) {

  // Type Checking

  if (typeof string !== `string`) {
    throw new TypeError(`The first argument passed to the transliterate function must be a string.`);
  }

  if (!(
    typeof substitutions === `object`
    && Object.values(substitutions).every(val => typeof val === `string`)
  )) {
    throw new TypeError(`The second argument passed to the transliterate function must be an object whose attributes and values are both strings.`);
  }

  // Variables

  const inputs = Object.keys(substitutions); // a list of the inputs
  const subs   = new Map;                    // holds the set of substitutions that need to be made
  const temps  = new Map;                    // tracks of any temporary placeholders
  let str      = string;                     // the string to manipulate

  // Transliteration Steps

  // get the list of substitutions
  Object.entries(substitutions)

  // sort the substitutions by length of the input (avoids partial replacements)
  .sort(([a], [b]) => b.length - a.length)

  // make each substitution on the string, using temporary placeholders if needed
  .forEach(([input, replacement]) => {

    // escape regexp special characters in the input
    const escapedInput = input.replace(/[.*+?^${}()|[\]\\]/gu, `\\$&`);

    // add the escaped substitution to the set of substitutions to make
    subs.set(escapedInput, replacement);

    // check for feeding problems, and create temporary placeholder substitutions if found
    if (inputs.includes(replacement)) {

      // get a random temporary placeholder to substitute
      let temp = getRandomCodePoint();

      // make sure you haven't already used that placeholder, and generate a new one if so
      while (temps.has(temp)) temp = getRandomCodePoint();

      // add the placeholder to the set of temporary substitutions
      temps.set(temp, replacement);

      // update the list of substitutions to use the temporary placeholder
      subs.set(escapedInput, temp);

    }

    // make the substitution on the string, using the temporary placeholder if present
    const regexp = new RegExp(escapedInput, `gu`);
    str = str.replace(regexp, subs.get(escapedInput));

  });

  // replace the temporary placeholders with their original values
  temps.forEach((replacement, temp) => {
    const regexp = new RegExp(temp, `gu`);
    str = str.replace(regexp, replacement);
  });

  // return the transliterated string
  return str;

}

/**
 * A Transliterator class that saves a set of transliteration rules for repeated use.
 * @prop {Object}   substitutions The set of substitution rules for this Transliterator. You can update the substitution rules used by this Transliterator at any time by modifying this object. See the {@link transliterate} method for documentation on how this substitutions object should be formatted.
 * @example {@lang javascript}
 * const substitutions = {
 *   tʼ: `d`,
 *   ts: `c`,
 * };
 *
 * const transliterate = new Transliterator(substitutions);
 * const input         = `tsatʼ`;
 * const output        = transliterate(input);
 * console.log(output); // --> "cad"
 */
class Transliterator {
  /**
   * Create a new Transliterator
   * @param {Object}    substitutions The set of substitution rules that this Transliterator should use. See the {@link transliterate} method for documentation on how this substitutions object should be formatted.
   * @return {Function}               Returns a transliterate function that accepts a string and makes the substitutions provided in the `transliterate` argument.
   */
  constructor(substitutions) {
    this.substitutions = substitutions;
    return string => transliterate(string, this.substitutions);
  }
}

// Exports

export {
  sanitize,
  Sanitizer,
  transliterate,
  Transliterator,
};
