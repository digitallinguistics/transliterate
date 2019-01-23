const babelOptions = {
  presets: [
    [
      `@babel/preset-env`, {
        targets: {
          browsers: [
            `last 2 Chrome major versions`,
            `last 2 Edge major versions`,
            `last 2 Firefox major versions`,
            `last 2 iOS major versions`,
            `last 2 Safari major versions`,
          ],
          node: true,
        },
      },
    ],
  ],
};

module.exports = {
  entry:  `./transliterate.js`,
  mode:   `production`,
  module: {
    rules: [
      {
        exclude: /node_modules/u,
        test:    /\.m?js$/u,
        use:     {
          loader:  `babel-loader`,
          options: babelOptions,
        },
      },
    ],
  },
  output: {
    filename:      `transliterate.bundle.js`,
    globalObject:  `this`,
    library:       `transliterate`,
    libraryTarget: `umd`,
    path:          __dirname,
  },
};
