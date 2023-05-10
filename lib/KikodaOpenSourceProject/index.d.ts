import { Component } from 'projen';
import { NodeProject } from 'projen/lib/javascript';
/**
 * Error thrown when the package license is not Apache 2.0
 *
 * @export
 * @class InvalidLicenseError
 * @typedef {InvalidLicenseError}
 * @extends {Error}
 */
export declare class InvalidLicenseError {
    /**
     * Creates an instance of InvalidLicenseError.
     *
     * @constructor
     * @param {string} invalidLicense
     */
    constructor(invalidLicense: string);
}
/**
 * Error thrown when the default Pull Request teplate is enabled.
 *
 * @export
 * @class DefaultPrTemplateError
 * @typedef {DefaultPrTemplateError}
 * @extends {Error}
 */
export declare class DefaultPrTemplateError {
    /**
     * Creates an instance of DefaultPrTemplateError.
     *
     * @constructor
     */
    constructor();
}
/**
 * Supporting files path enumeration
 *
 * @export
 * @enum {number}
 */
export declare enum SupportingFiles {
    LICENSE = "LICENSE",
    NOTICE = "NOTICE",
    README = "README.md",
    CODE_OF_CONDUCT = "CODE_OF_CONDUCT.md",
    CONTRIBUTING = "CONTRIBUTING.md",
    BUG_REPORT = ".github/ISSUE_TEMPLATE/bug-report.yml",
    FEATURE_REQUEST = ".github/ISSUE_TEMPLATE/feature-request.yml",
    GITHUB_ISSUES_CONFIG = ".github/ISSUE_TEMPLATE/config.yml"
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
export declare class KikodaOpenSourceProject extends Component {
    /**
     * Creates an instance of KikodaOpenSourceProject.
     *
     * @constructor
     * @param {KikodaOpenSourceProjectOptions} options
     */
    constructor(project: NodeProject, options: KikodaOpenSourceProjectOptions);
    private resolveAssetPath;
}
