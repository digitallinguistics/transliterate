/**
 * Gets a random code point from the Unicode geometric shapes block
 * @return {String} Returns the random Unicode character
 */
function getRandomCodePoint() {
  // eslint-disable-next-line no-magic-numbers
  return String.fromCodePoint(Math.floor(Math.random() * 95) + 9632);
}

function transliterate(string = ``, substitutions) {

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
