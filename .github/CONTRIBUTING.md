# Contributing

Thanks for contributing to the DLx `transliterate` project! Pull requests for improvements to this library are welcome. Follow these steps to get started.

1. [Open an issue][2] for the changes you'd like to make, if one doesn't already exist.

1. [Install the latest LTS release of Node.js.][3]

1. [Clone the repository.][4]

1. Create an issue branch for the changes you'll be making.

1. Install the project: From the command line, navigate to the project folder and run `npm install`.

1. Update the documentation for the changes you plan to make.

1. Update or write (failing) tests for the changes you plan to make. Tests are written using [Jasmine][1] and can be run using `npm test` from the command line.

1. Make your changes in the `transliterate.js` file. Please check that your code adheres to the [ESLint stylesheet][5] located in the project root (`.eslintrc.yml`), and document exceptions using `eslint-ignore`.

1. Make sure you update inline code comments, if you haven't already.

1. Rebuild the project: `npm run build`. This bundles the source code into `transliterate.bundle.js` for use as a library, and generates the documentation for the library.

1. Rerun the tests (`npm test`) and adjust your code as needed to pass the tests.

1. Update your branch with the latest changes from the `master` branch, adjusting your code and rerunning tests as necessary.

1. [Open a pull request][6] from your issue branch into the `master` branch.

[1]: https://jasmine.github.io/
[2]: https://github.com/digitallinguistics/transliterate/issues
[3]: https://nodejs.org/en/
[4]: https://github.com/digitallinguistics/transliterate
[5]: https://eslint.org/
[6]: https://github.com/digitallinguistics/transliterate/pull/new/master
