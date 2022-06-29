# Contributing

We love pull requests. Here's a quick guide.

_Please refer to the README.md for information about the structure of this repo_

1. Fork, clone and branch off `main`:
    ```bash
    git clone git@github.com:<your-username>/{{PROJECT_NAME}}.git
    git checkout -b <my-branch>
    ```
2. If you're using an editor that supports [Dev Containers](https://devcontainers.github.io), you can optionally start your editor with the provided Dev Container configuratiuon. If not, be sure to install dependencies with `yarn install`.
3. Make your changes ( and write some tests ;) ). This repository follows the [Conventional Commits spec](https://www.conventionalcommits.org/en/v1.0.0/). Be sure your commits follow this pattern.
4. Run unit tests with `yarn test`.
5. Manually test your changes using CDK commands such as `cdk synth`, `cdk diff`, and `cdk deploy`.
6. Push to your fork and submit a Pull Request back to `main`.

At this point you're waiting on us. We may suggest some changes or improvements or alternatives.