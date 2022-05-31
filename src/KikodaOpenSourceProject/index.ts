import { Component, SampleReadme, TextFile } from 'projen';
import { ArrowParens, EndOfLine, NodeProject, TrailingComma } from 'projen/lib/javascript';

/**
 * Error thrown when the package license is not Apache 2.0
 *
 * @export
 * @class InvalidLicenseError
 * @typedef {InvalidLicenseError}
 * @extends {Error}
 */
export class InvalidLicenseError extends Error {
  /**
   * Creates an instance of InvalidLicenseError.
   *
   * @constructor
   * @param {string} invalidLicense
   */
  constructor(invalidLicense: string) {
    super(
      `Kikoda Open Source Projects must be licensed under the Apache 2.0 open source license. Change the current license from '${invalidLicense}' to 'Apache-2.0'`,
    );
  }
}

/**
 * Error thrown when the default Pull Request teplate is enabled.
 *
 * @export
 * @class DefaultPrTemplateError
 * @typedef {DefaultPrTemplateError}
 * @extends {Error}
 */
export class DefaultPrTemplateError extends Error {
  /**
   * Creates an instance of DefaultPrTemplateError.
   *
   * @constructor
   */
  constructor() {
    super(
      'Pull Request Template already exists. Disable the existing PR template to use this component',
    );
  }
}

/**
 * Collection of sensible defaults for use in Projen options/constructors
 */
export const KikodaStandards = {
  PrettierOptions: {
    settings: {
      printWidth: 100,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
      trailingComma: TrailingComma.ALL,
      arrowParens: ArrowParens.AVOID,
      endOfLine: EndOfLine.LF,
    },
  },
};

/**
 * Supporting files path enumeration
 *
 * @export
 * @enum {number}
 */
export enum SupportingFiles {
  LICENSE = 'LICENSE',
  NOTICE = 'NOTICE',
  README = 'README.md',
  CODE_OF_CONDUCT = 'CODE_OF_CONDUCT.md',
  CONTRIBUTING = 'CONTRIBUTING.md',
}

/**
 * Options used to generate Kikoda Open Source Project and Artifacts
 *
 * @export
 * @interface KikodaOpenSourceProjectOptions
 * @typedef {KikodaOpenSourceProjectOptions}
 */
export interface KikodaOpenSourceProjectOptions {
  /**
   * Describe your project. This will be used in various files like README, NOTICE, etc.
   *
   * @readonly
   * @type {string}
   */
  title: string;
}

/**
 * Generates standardized files and artifacts associated with a Kikoda
 * Open Source Project.
 *
 * @export
 * @class KikodaOpenSourceProject
 * @typedef {KikodaOpenSourceProject}
 * @template T extends NodeProject
 * @extends {Component}
 */
export class KikodaOpenSourceProject<T extends NodeProject> extends Component {
  /**
   * Creates an instance of KikodaOpenSourceProject.
   *
   * @constructor
   * @param {T} project
   * @param {KikodaOpenSourceProjectOptions} options
   */
  constructor(project: T, options: KikodaOpenSourceProjectOptions) {
    super(project);

    project.package.addField('author', { name: 'Kikoda, LLC', organization: true });

    if (project.package.license !== 'Apache-2.0')
      throw new InvalidLicenseError(project.package.license!);

    new TextFile(project, SupportingFiles.NOTICE, {
      marker: false,
      lines: [
        options.title,
        'Copyright 2022-2022 Kikoda, LLC',
        '',
        'This product includes software developed at Kikoda (https://www.kikoda.com)',
      ],
    });

    // Remove existing PR Template...
    try {
      project.github?.addPullRequestTemplate(
        ...[
          '## Proposed changes',
          '',
          '_Describe the big picture of your changes here to communicate to the maintainers why we should accept this pull request.If it fixes a bug or resolves a feature request, be sure to link to that issue._',
          '',
          '### Commentary',
          '',
          '_Anything else we should know when reviewing?_',
          '',
          '### Types of Changes',
          '',
          'What types of changes does your code introduce? _Chedk all the boxes that apply_',
          '',
          '- [ ] Bugfix (non - breaking change which fixes an issue)',
          '- [ ] New feature or Enhancement (non - breaking change which adds functionality)',
          '- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)',
          '- [ ] Chore (documentation, refactoring, dependency upgrade, etc.)',
          '',
          '### Chores',
          '',
          '_Check all the boxes that apply_',
          '',
          '- [ ] This PR includes breaking changes which are documented in the description and associated commit messages (see the [Contributing Guide](../CONTRIBUTING.md) for more information on how this should be done)',
          '- [ ] This PR impacts documentation, and it has been updated(or an issue has been created and linked)',
          "- [ ] This PR's changes are covered by the automated tests",
        ],
      );
    } catch {
      throw new DefaultPrTemplateError();
    }

    new TextFile(project, SupportingFiles.CONTRIBUTING, {
      marker: true,
      lines: [
        '# Contributing',
        '',
        "We love pull requests.Here's a quick guide.",
        '',
        '_Please refer to the README.md for information about the structure of this repo_',
        '',
        '1. Fork, clone and branch off `main`:',
        '      ```bash',
        `    git clone git@github.com:<your-username>/${project.name}.git`,
        '    git checkout -b <my-branch>',
        '    ```',
        "2. If you're using an editor that supports [Dev Containers](https://devcontainers.github.io), you can optionally start your editor with the provided Dev Container configuratiuon. If not, be sure to install dependencies with `yarn install`.",
        '3. Make your changes(and write some tests ;) ). This repository follows the [Conventional Commits spec](https://www.conventionalcommits.org/en/v1.0.0/). Be sure your commits follow this pattern.',
        '4. Run unit tests with `yarn test`.',
        '5. Manually test your changes using CDK commands such as `cdk synth`, `cdk diff`, and`cdk deploy`.',
        '6. Push to your fork and submit a Pull Request back to`main`.',
        '',
        "At this point you're waiting on us. We may suggest some changes or improvements or alternatives.",
      ],
    });

    new TextFile(project, SupportingFiles.CODE_OF_CONDUCT, {
      marker: true,
      lines: [
        '# Contributor Covenant Code of Conduct',
        '',
        '## Our Pledge',
        '',
        'We as members, contributors, and leaders pledge to make participation in our',
        'community a harassment-free experience for everyone, regardless of age, body',
        'size, visible or invisible disability, ethnicity, sex characteristics, gender',
        'identity and expression, level of experience, education, socio-economic status,',
        'nationality, personal appearance, race, caste, color, religion, or sexual',
        'identity and orientation.',
        '',
        'We pledge to act and interact in ways that contribute to an open, welcoming,',
        'diverse, inclusive, and healthy community.',
        '',
        '## Our Standards',
        '',
        'Examples of behavior that contributes to a positive environment for our',
        'community include:',
        '',
        '* Demonstrating empathy and kindness toward other people',
        '* Being respectful of differing opinions, viewpoints, and experiences',
        '* Giving and gracefully accepting constructive feedback',
        '* Accepting responsibility and apologizing to those affected by our mistakes,',
        'and learning from the experience',
        '* Focusing on what is best not just for us as individuals, but for the overall',
        'community',
        '',
        'Examples of unacceptable behavior include:',
        '',
        '* The use of sexualized language or imagery, and sexual attention or advances of',
        'any kind',
        '* Trolling, insulting or derogatory comments, and personal or political attacks',
        '* Public or private harassment',
        "* Publishing others' private information, such as a physical or email address, ",
        'without their explicit permission',
        '* Other conduct which could reasonably be considered inappropriate in a',
        'professional setting',
        '',
        '## Enforcement Responsibilities',
        '',
        'Community leaders are responsible for clarifying and enforcing our standards of',
        'acceptable behavior and will take appropriate and fair corrective action in',
        'response to any behavior that they deem inappropriate, threatening, offensive,',
        'or harmful.',
        '',
        'Community leaders have the right and responsibility to remove, edit, or reject',
        'comments, commits, code, wiki edits, issues, and other contributions that are',
        'not aligned to this Code of Conduct, and will communicate reasons for moderation',
        'decisions when appropriate.',
        '',
        '## Scope',
        '',
        'This Code of Conduct applies within all community spaces, and also applies when',
        'an individual is officially representing the community in public spaces.',
        'Examples of representing our community include using an official e-mail address,',
        'posting via an official social media account, or acting as an appointed',
        'representative at an online or offline event.',
        '',
        '## Enforcement',
        '',
        'Instances of abusive, harassing, or otherwise unacceptable behavior may be',
        'reported to the community leaders responsible for enforcement at',
        '[INSERT CONTACT METHOD].',
        'All complaints will be reviewed and investigated promptly and fairly.',
        '',
        'All community leaders are obligated to respect the privacy and security of the',
        'reporter of any incident.',
        '',
        '## Enforcement Guidelines',
        '',
        'Community leaders will follow these Community Impact Guidelines in determining',
        'the consequences for any action they deem in violation of this Code of Conduct:',
        '',
        '### 1. Correction',
        '',
        '**Community Impact**: Use of inappropriate language or other behavior deemed',
        'unprofessional or unwelcome in the community.',
        '',
        '**Consequence**: A private, written warning from community leaders, providing',
        'clarity around the nature of the violation and an explanation of why the',
        'behavior was inappropriate. A public apology may be requested.',
        '',
        '### 2. Warning',
        '',
        '**Community Impact**: A violation through a single incident or series of',
        'actions.',
        '',
        '**Consequence**: A warning with consequences for continued behavior. No',
        'interaction with the people involved, including unsolicited interaction with',
        'those enforcing the Code of Conduct, for a specified period of time. This',
        'includes avoiding interactions in community spaces as well as external channels',
        'like social media. Violating these terms may lead to a temporary or permanent',
        'ban.',
        '',
        '### 3. Temporary Ban',
        '',
        '**Community Impact**: A serious violation of community standards, including',
        'sustained inappropriate behavior.',
        '',
        '**Consequence**: A temporary ban from any sort of interaction or public',
        'communication with the community for a specified period of time. No public or',
        'private interaction with the people involved, including unsolicited interaction',
        'with those enforcing the Code of Conduct, is allowed during this period.',
        'Violating these terms may lead to a permanent ban.',
        '',
        '### 4. Permanent Ban',
        '',
        '**Community Impact**: Demonstrating a pattern of violation of community',
        'standards, including sustained inappropriate behavior, harassment of an',
        'individual, or aggression toward or disparagement of classes of individuals.',
        '',
        '**Consequence**: A permanent ban from any sort of public interaction within the',
        'community.',
        '',
        '## Attribution',
        '',
        'This Code of Conduct is adapted from the [Contributor Covenant][homepage],',
        'version 2.1, available at',
        '[https://www.contributor-covenant.org/version/2/1/code_of_conduct.html][v2.1].',
        '',
        'Community Impact Guidelines were inspired by',
        "[Mozilla's code of conduct enforcement ladder][Mozilla CoC].",
        '',
        'For answers to common questions about this code of conduct, see the FAQ at',
        '[https://www.contributor-covenant.org/faq][FAQ]. Translations are available at',
        '[https://www.contributor-covenant.org/translations][translations].',
        '',
        '[homepage]: https://www.contributor-covenant.org',
        '[v2.1]: https://www.contributor-covenant.org/version/2/1/code_of_conduct.html',
        '[Mozilla CoC]: https://github.com/mozilla/diversity',
        '[FAQ]: https://www.contributor-covenant.org/faq',
        '[translations]: https://www.contributor-covenant.org/translations',
      ],
    });

    // if there is an existing SampleReadme, don't synthesize it.. we'll replace this with ours.
    const existingReadme = project.components.find(c => c instanceof SampleReadme) as SampleReadme;
    existingReadme.synthesize = () => {};

    new SampleReadme(project, {
      filename: SupportingFiles.README,
      contents: [
        '[<img src="https://kikoda.com/wp-content/uploads/2019/07/Logo_White_bg.svg" width="300"/>](https://kikoda.com)',
        `# ${options.title}`,
        '',
        `[![NPM](https://img.shields.io/npm/v/${project.package.packageName}?color=39a356)](https://www.npmjs.com/package/${project.package.packageName})`,
        `[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](${project.package.manifest.repository.url}/blob/main/LICENSE)`,
        '',
        `Use this ${options.title} to architect and model modern applications`,
        '',
        '## Install from NPM:',
        '```',
        `yarn add --dev ${project.package.packageName}`,
        '',
        '# or',
        '',
        `npm install ${project.package.packageName} --save-dev`,
        '```',
        '',
        '## Usage',
        '<!-- TODO: add Usage & Examples -->',
        '',
        '## Opening Issues',
        '',
        'If you encounter a bug with this package, we want to hear about it. Before opening a new issue, search the existing issues to avoid duplicates.',
        '',
        'When opening an issue, include the Kikoda Construct Library version, Node version, and stack trace if available. In addition, include the steps to reproduce when appropriate.',
        '',
        'You can also open an issue for a feature request.',
        '',
        '## Contributing',
        '',
        'If you find an issue with this package and have a fix, please feel free to open a pull request following the [procedures](CONTRIBUTING.md).',
        '',
        '## Testing',
        '',
        'If you contribute to this package you can run the tests using `yarn test`.',
        '',
        '## License',
        '',
        'Unless explicitly stated otherwise all files in this repository are licensed under the Apache License Version 2.0.',
        '',
        'This product includes software developed at Kikoda (https://www.kikoda.com). Copyright 2022 Kikoda, LLC.',
      ].join('\n'),
    });
  }
}
