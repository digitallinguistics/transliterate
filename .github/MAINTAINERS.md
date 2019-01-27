# Maintainers

## Branching Model

This project follows a simple branching model:

* The `master` branch is always production-ready

* Each issue receives its own branch

* Each issue branch is tested thoroughly and must be production-ready before being merged

* Issue branches are merged directly into the `master` branch

## Release Process

Once a pull request is reviewed and merged, follow these release steps:

1. Increment the project's version number (`npm version major|minor|patch`) on the `master` branch, with no commit message

1. Upload the library to the DLx CDN: `npm run upload`

1. Create a GitHub release, tagging the `master` branch and adding release notes

1. Library is automatically deployed to npm
