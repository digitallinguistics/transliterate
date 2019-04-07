/* eslint-disable max-nested-callbacks */

const { transliterate } = require(`./transliterate.bundle`);

describe(`transliterate`, () => {

  it(`accepts empty strings`, () => {

    const substitutions = { t: `d` };
    const output = transliterate(``, substitutions);

    expect(output).toBe(``);

  });

  it(`handles bleeding problems`, () => {

    const substitutions = {
      s:  `z`,
      ts: `c`,
    };

    const input         = `atsa`;
    const correctOutput = `aca`;
    const actualOutput  = transliterate(input, substitutions);

    expect(actualOutput).toBe(correctOutput);

  });

  it(`handles feeding problems`, () => {

    const substitutions = {
      d: `θ`,
      t: `d`,
    };

    const input         = `atada`;
    const correctOutput = `adaθa`;
    const actualOutput  = transliterate(input, substitutions);

    expect(actualOutput).toBe(correctOutput);

  });

  it(`handles naughty strings`, () => {

    const substitutions = { ʃ: `s` };

    // eslint-disable-next-line global-require
    const blns = require(`./constants/blns.json`);

    blns.forEach(str => {
      expect(transliterate(str, substitutions)).toBe(str);
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

    expect(actualOutput).toBe(correctOutput);

  });

  it(`retains line breaks`, () => {

    const substitutions = {};

    const input = `Hello world,
    This is some multi-line input.\nThis is also multi-line.`;

    const output = transliterate(input, substitutions);

    expect(output).toEqual(input);

  });

  it(`transliterates Chatino`, () => {

    // eslint-disable-next-line global-require
    const substitutions = require(`./constants/chatino.json`);

    const input         = `ji_& xiku_na!7a laa7 nka7nelo!7o_ na! nkata_a!`;
    const correctOutput = `jï̱ xiku̱ná'a laa' nka'neló'o̱ ná nkata̱á`;
    const actualOutput  = transliterate(input, substitutions);

    expect(actualOutput).toBe(correctOutput);

  });

});
