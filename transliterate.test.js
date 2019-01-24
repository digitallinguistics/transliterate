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

  it(`transliterates Chatino`, () => {

    const substitutions = {
      ' -':  ``,
      '=':   ``,
      '-':   ``,
      7:     "'",
      a:     `a`,
      'a!':  `á`,
      'a!&': `ä́`,
      'a&':  `ä`,
      a_:    `a̱`,
      'a_&': `ä̱`,
      b:     `b`,
      ch:    `ch`,
      e:     `e`,
      'e!':  `é`,
      'e!&': `ë́`,
      'e&':  `ë`,
      e_:    `e̱`,
      'e_&': `ë̱`,
      i:     `i`,
      'i!':  `í`,
      'i!&': `ḯ`,
      'i&':  `ï`,
      i_:    `i̱`,
      'i_&': `ï̱`,
      j:     `j`,
      k:     `k`,
      kw:    `ku`,
      ky:    `ky`,
      l:     `l`,
      ly:    `ly`,
      m:     `m`,
      n:     `n`,
      ny:    `ny`,
      o:     `o`,
      'o!':  `ó`,
      'o!&': `ö́`,
      'o&':  `ö`,
      o_:    `o̱`,
      'o_&': `ö̱`,
      p:     `p`,
      r:     `r`,
      s:     `s`,
      sh:    `sh`,
      t:     `t`,
      ts:    `ts`,
      ty:    `ty`,
      u:     `u`,
      'u!':  `ú`,
      'u!&': `ǘ`,
      'u&':  `ü`,
      u_:    `u̱`,
      'u_&': `ü̱`,
      w:     `u`,
      y:     `y`,
    };

    const input         = `ji_& xiku_na!7a laa7 nka7nelo!7o_ na! nkata_a!`;
    const correctOutput = `jï̱ xiku̱ná'a laa' nka'neló'o̱ ná nkata̱á`;
    const actualOutput  = transliterate(input, substitutions);

    expect(actualOutput).toBe(correctOutput);

  });

});
