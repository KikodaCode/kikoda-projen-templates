# {{PACKAGE_NAME}}

This was bootstrapped with the [Kikoda CDK Starter Kit](https://github.com/KikodaCode/kikoda-projen-templates).

## Next Steps

> TODO: finish steps and details needed to deploy this application.

1. Install and configure AWS CLI...
1. Edit `bin/cdk.ts` to include the appropriate AWS account number and GitHub repository.
1. Manually deploy account core stack...
    1. `yarn`
    1. `yarn cdk synth`
    1. `yarn cdk bootstrap aws://1234/us-east-1 --profile 1234`
    1. `yarn cdk deploy AccountResourcesStack --profile 1234`
1. Link GitHub...
1. Start building...

## Stages

Stages, also known as development environments, are used as part of the standard software development life cycle to control the rate and types of changes introduced to a specific set of users. They are normally used as part of a larger change and release management process.

- `dev` — Used by the engineering team for rapid development and exploration. Often buggy and incomplete.
- `staging` — Used by the customer, or product owner, to review and approve of changes before they are made to production. Should be bug free and complete.
- `prod` — Used by the end user. Should be bug free and complete.

Each stage may have a slightly different configuration, which can be adjusted using the files in `bin/config/`.

## Folder Structure

```text
./                                - Repository root.
├── .github/                      - GitHub configuration files.
│   ├── workflows/                - GitHub CI/CD pipelines (actions & workflows).
│   └── pull_request_template.md  - Template used for new pull requests.
├── .projen/                      - projen managed configuration files.
├── .vscode/                      - VS Code configuration files.
├── bin/                          - CDK startup files.
│   ├── config/                   - Stage (development environment) configuration files.
│   └── cdk.ts                    - CDK application entry point.
├── lib/                          - Application and infrastructure code.
│   ├── components/               - ???
│   └── constructs/               - ???
├── package.json                  - Node configuration file. 
└── *                             - Various other configuration files (eslint, prettier, git, typescript).
```

## Useful commands

- `yarn cdk ls` — List infrastructure stacks.
- `yarn cdk diff` — Diff infrastructure against what is in CloudFormation.
- `yarn eject` — Eject from projen.
