/* eslint-disable
  func-names,
  max-nested-callbacks,
  prefer-arrow-callback,
*/

import { createRequire } from 'module';
import expect            from 'expect.js';
import { transliterate } from './transliterate.js';

const require              = createRequire(import.meta.url);
const blns                 = require(`./constants/blns.json`);
const chatinoSubstitutions = require(`./constants/chatino.json`);

describe(`transliterate`, function() {

  it(`accepts empty strings`, function() {

    const substitutions = { t: `d` };
    const output = transliterate(``, substitutions);

    expect(output).to.be.empty();

  });

  it(`handles bleeding problems`, function() {

    const substitutions = {
      s:  `z`,
      ts: `c`,
    };

    const input         = `atsa`;
    const correctOutput = `aca`;
    const actualOutput  = transliterate(input, substitutions);

    expect(actualOutput).to.be(correctOutput);

  });

  it(`handles feeding problems`, function() {

    const substitutions = {
      d: `θ`,
      t: `d`,
    };

    const input         = `atada`;
    const correctOutput = `adaθa`;
    const actualOutput  = transliterate(input, substitutions);

    expect(actualOutput).to.be(correctOutput);

  });

  it(`handles naughty strings`, function() {

    const substitutions = { ʃ: `s` };

    blns.forEach(str => {
      expect(transliterate(str, substitutions)).to.be(str);
    });

  });

  it(`handles numbers as inputs`, () => {

    const substitutions = {
      0: `a`,
      1: `b`,
      2: `c`,
      3: `d`,
      4: `e`,
      5: `f`,
      6: `g`,
      7: `h`,
      8: `i`,
      9: `j`,
    };

    const input         = `0123456789`;
    const correctOutput = `abcdefghij`;
    const actualOutput  = transliterate(input, substitutions);

    expect(actualOutput).to.be(correctOutput);

  });

  it(`retains line breaks`, () => {

    const substitutions = {};

    const input = `Hello world,
    This is some multi-line input.\nThis is also multi-line.`;

    const output = transliterate(input, substitutions);

    expect(output).to.equal(input);

  });

  it(`transliterates Chatino`, () => {

    const input         = `ji_& xiku_na!7a laa7 nka7nelo!7o_ na! nkata_a!`;
    const correctOutput = `jï̱ xiku̱ná'a laa' nka'neló'o̱ ná nkata̱á`;
    const actualOutput  = transliterate(input, chatinoSubstitutions);

    expect(actualOutput).to.be(correctOutput);

  });

});
