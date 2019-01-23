module.exports = {
  entry:  `./transliterate.js`,
  mode:   `production`,
  output: {
    filename:      `transliterate.bundle.js`,
    globalObject:  `this`,
    library:       `transliterate`,
    libraryTarget: `umd`,
    path:          __dirname,
  },
};
