# Maintainers

## Branching Model

This project follows a simple branching model:

* The `master` branch is always production-ready

* Each issue receives its own branch

* Each issue branch is tested thoroughly and must be production-ready before being merged

* Issue branches are merged directly into the `master` branch

* The project's version number increments each time an issue branch is merged

* When an issue branch is merged, the `master` branch is tagged for a release and GitHub release notes made, and the code published to npm
