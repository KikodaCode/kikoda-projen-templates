import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Component, SampleFile, SampleReadme, TextFile } from 'projen';
import { NodeProject } from 'projen/lib/javascript';

/**
 * Error thrown when the package license is not Apache 2.0
 *
 * @export
 * @class InvalidLicenseError
 * @typedef {InvalidLicenseError}
 * @extends {Error}
 */
export class InvalidLicenseError {
  /**
   * Creates an instance of InvalidLicenseError.
   *
   * @constructor
   * @param {string} invalidLicense
   */
  constructor(invalidLicense: string) {
    throw new Error(
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
export class DefaultPrTemplateError {
  /**
   * Creates an instance of DefaultPrTemplateError.
   *
   * @constructor
   */
  constructor() {
    throw new Error(
      'Pull Request Template already exists. Disable the existing PR template to use this component',
    );
  }
}

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
  BUG_REPORT = '.github/ISSUE_TEMPLATE/bug-report.yml',
  FEATURE_REQUEST = '.github/ISSUE_TEMPLATE/feature-request.yml',
  GITHUB_ISSUES_CONFIG = '.github/ISSUE_TEMPLATE/config.yml',
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
  readonly title: string;
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
export class KikodaOpenSourceProject extends Component {
  /**
   * Creates an instance of KikodaOpenSourceProject.
   *
   * @constructor
   * @param {KikodaOpenSourceProjectOptions} options
   */
  constructor(project: NodeProject, options: KikodaOpenSourceProjectOptions) {
    super(project);

    project.package.addField('author', { name: 'Kikoda, LLC', organization: true });

    if (project.package.license !== 'Apache-2.0')
      throw new InvalidLicenseError(project.package.license!);

    new SampleFile(project, SupportingFiles.NOTICE, {
      contents: `${options.title}
Copyright 2022-2022 Kikoda, LLC

This product includes software developed at Kikoda (https://www.kikoda.com),
      `,
    });

    // replace existing PR Template...
    try {
      project.github?.addPullRequestTemplate(
        readFileSync(this.resolveAssetPath('pull_request_template.md'), 'utf8'),
      );
    } catch {
      throw new DefaultPrTemplateError();
    }

    new TextFile(project, SupportingFiles.CONTRIBUTING, {
      marker: true,
      lines: readFileSync(this.resolveAssetPath(SupportingFiles.CONTRIBUTING), 'utf8')
        .replace(/\{\{PROJECT_NAME\}\}/g, project.name)
        .split('\n'),
    });

    new TextFile(project, SupportingFiles.CODE_OF_CONDUCT, {
      marker: true,
      lines: readFileSync(this.resolveAssetPath(SupportingFiles.CODE_OF_CONDUCT), 'utf8').split(
        '\n',
      ),
    });

    new SampleFile(project, SupportingFiles.BUG_REPORT, {
      contents: readFileSync(this.resolveAssetPath('bug-report.yml'), 'utf8'),
    });

    new SampleFile(project, SupportingFiles.FEATURE_REQUEST, {
      contents: readFileSync(this.resolveAssetPath('feature-request.yml'), 'utf8'),
    });

    new SampleFile(project, SupportingFiles.GITHUB_ISSUES_CONFIG, {
      contents: readFileSync(this.resolveAssetPath('github-issues-config.yml'), 'utf8'),
    });

    // if there is an existing SampleReadme, don't synthesize it.. we'll replace this with ours.
    const existingReadme = project.components.find(c => c instanceof SampleReadme) as SampleReadme;
    existingReadme.synthesize = () => {};

    new SampleReadme(project, {
      filename: SupportingFiles.README,
      contents: readFileSync(this.resolveAssetPath(SupportingFiles.README), 'utf8')
        .replace(/\{\{TITLE\}\}/g, options.title)
        .replace(/\{\{PACKAGE_NAME\}\}/g, project.package.packageName)
        .replace(/\{\{REPO_URL\}\}/g, project.package.manifest.repository.url),
    });
  }

  private resolveAssetPath(assetPath: string) {
    return resolve(__dirname, '..', '..', 'assets', 'KikodaOpenSourceProject', assetPath);
  }
}
