"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KikodaOpenSourceProject = exports.SupportingFiles = exports.DefaultPrTemplateError = exports.InvalidLicenseError = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const fs_1 = require("fs");
const path_1 = require("path");
const projen_1 = require("projen");
/**
 * Error thrown when the package license is not Apache 2.0
 *
 * @export
 * @class InvalidLicenseError
 * @typedef {InvalidLicenseError}
 * @extends {Error}
 */
class InvalidLicenseError {
    /**
     * Creates an instance of InvalidLicenseError.
     *
     * @constructor
     * @param {string} invalidLicense
     */
    constructor(invalidLicense) {
        throw new Error(`Kikoda Open Source Projects must be licensed under the Apache 2.0 open source license. Change the current license from '${invalidLicense}' to 'Apache-2.0'`);
    }
}
exports.InvalidLicenseError = InvalidLicenseError;
_a = JSII_RTTI_SYMBOL_1;
InvalidLicenseError[_a] = { fqn: "@kikoda/projen-templates.InvalidLicenseError", version: "0.0.0" };
/**
 * Error thrown when the default Pull Request teplate is enabled.
 *
 * @export
 * @class DefaultPrTemplateError
 * @typedef {DefaultPrTemplateError}
 * @extends {Error}
 */
class DefaultPrTemplateError {
    /**
     * Creates an instance of DefaultPrTemplateError.
     *
     * @constructor
     */
    constructor() {
        throw new Error('Pull Request Template already exists. Disable the existing PR template to use this component');
    }
}
exports.DefaultPrTemplateError = DefaultPrTemplateError;
_b = JSII_RTTI_SYMBOL_1;
DefaultPrTemplateError[_b] = { fqn: "@kikoda/projen-templates.DefaultPrTemplateError", version: "0.0.0" };
/**
 * Supporting files path enumeration
 *
 * @export
 * @enum {number}
 */
var SupportingFiles;
(function (SupportingFiles) {
    SupportingFiles["LICENSE"] = "LICENSE";
    SupportingFiles["NOTICE"] = "NOTICE";
    SupportingFiles["README"] = "README.md";
    SupportingFiles["CODE_OF_CONDUCT"] = "CODE_OF_CONDUCT.md";
    SupportingFiles["CONTRIBUTING"] = "CONTRIBUTING.md";
    SupportingFiles["BUG_REPORT"] = ".github/ISSUE_TEMPLATE/bug-report.yml";
    SupportingFiles["FEATURE_REQUEST"] = ".github/ISSUE_TEMPLATE/feature-request.yml";
    SupportingFiles["GITHUB_ISSUES_CONFIG"] = ".github/ISSUE_TEMPLATE/config.yml";
})(SupportingFiles = exports.SupportingFiles || (exports.SupportingFiles = {}));
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
class KikodaOpenSourceProject extends projen_1.Component {
    /**
     * Creates an instance of KikodaOpenSourceProject.
     *
     * @constructor
     * @param {KikodaOpenSourceProjectOptions} options
     */
    constructor(project, options) {
        super(project);
        project.package.addField('author', { name: 'Kikoda, LLC', organization: true });
        if (project.package.license !== 'Apache-2.0')
            throw new InvalidLicenseError(project.package.license);
        new projen_1.SampleFile(project, SupportingFiles.NOTICE, {
            contents: `${options.title}
Copyright 2022-2022 Kikoda, LLC

This product includes software developed at Kikoda (https://www.kikoda.com),
      `,
        });
        // replace existing PR Template...
        try {
            project.github?.addPullRequestTemplate(fs_1.readFileSync(this.resolveAssetPath('pull_request_template.md'), 'utf8'));
        }
        catch {
            throw new DefaultPrTemplateError();
        }
        new projen_1.TextFile(project, SupportingFiles.CONTRIBUTING, {
            marker: true,
            lines: fs_1.readFileSync(this.resolveAssetPath(SupportingFiles.CONTRIBUTING), 'utf8')
                .replace(/\{\{PROJECT_NAME\}\}/g, project.name)
                .split('\n'),
        });
        new projen_1.TextFile(project, SupportingFiles.CODE_OF_CONDUCT, {
            marker: true,
            lines: fs_1.readFileSync(this.resolveAssetPath(SupportingFiles.CODE_OF_CONDUCT), 'utf8').split('\n'),
        });
        new projen_1.SampleFile(project, SupportingFiles.BUG_REPORT, {
            contents: fs_1.readFileSync(this.resolveAssetPath('bug-report.yml'), 'utf8'),
        });
        new projen_1.SampleFile(project, SupportingFiles.FEATURE_REQUEST, {
            contents: fs_1.readFileSync(this.resolveAssetPath('feature-request.yml'), 'utf8'),
        });
        new projen_1.SampleFile(project, SupportingFiles.GITHUB_ISSUES_CONFIG, {
            contents: fs_1.readFileSync(this.resolveAssetPath('github-issues-config.yml'), 'utf8'),
        });
        // if there is an existing SampleReadme, don't synthesize it.. we'll replace this with ours.
        const existingReadme = project.components.find(c => c instanceof projen_1.SampleReadme);
        existingReadme.synthesize = () => { };
        new projen_1.SampleReadme(project, {
            filename: SupportingFiles.README,
            contents: fs_1.readFileSync(this.resolveAssetPath(SupportingFiles.README), 'utf8')
                .replace(/\{\{TITLE\}\}/g, options.title)
                .replace(/\{\{PACKAGE_NAME\}\}/g, project.package.packageName)
                .replace(/\{\{REPO_URL\}\}/g, project.package.manifest.repository.url),
        });
    }
    resolveAssetPath(assetPath) {
        return path_1.resolve(__dirname, '..', '..', 'assets', 'KikodaOpenSourceProject', assetPath);
    }
}
exports.KikodaOpenSourceProject = KikodaOpenSourceProject;
_c = JSII_RTTI_SYMBOL_1;
KikodaOpenSourceProject[_c] = { fqn: "@kikoda/projen-templates.KikodaOpenSourceProject", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvS2lrb2RhT3BlblNvdXJjZVByb2plY3QvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQkFBa0M7QUFDbEMsK0JBQStCO0FBQy9CLG1DQUF1RTtBQUd2RTs7Ozs7OztHQU9HO0FBQ0gsTUFBYSxtQkFBbUI7SUFDOUI7Ozs7O09BS0c7SUFDSCxZQUFZLGNBQXNCO1FBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQ2IsMkhBQTJILGNBQWMsbUJBQW1CLENBQzdKLENBQUM7SUFDSixDQUFDOztBQVhILGtEQVlDOzs7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBYSxzQkFBc0I7SUFDakM7Ozs7T0FJRztJQUNIO1FBQ0UsTUFBTSxJQUFJLEtBQUssQ0FDYiw4RkFBOEYsQ0FDL0YsQ0FBQztJQUNKLENBQUM7O0FBVkgsd0RBV0M7OztBQUVEOzs7OztHQUtHO0FBQ0gsSUFBWSxlQVNYO0FBVEQsV0FBWSxlQUFlO0lBQ3pCLHNDQUFtQixDQUFBO0lBQ25CLG9DQUFpQixDQUFBO0lBQ2pCLHVDQUFvQixDQUFBO0lBQ3BCLHlEQUFzQyxDQUFBO0lBQ3RDLG1EQUFnQyxDQUFBO0lBQ2hDLHVFQUFvRCxDQUFBO0lBQ3BELGlGQUE4RCxDQUFBO0lBQzlELDZFQUEwRCxDQUFBO0FBQzVELENBQUMsRUFUVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQVMxQjtBQW1CRDs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFhLHVCQUF3QixTQUFRLGtCQUFTO0lBQ3BEOzs7OztPQUtHO0lBQ0gsWUFBWSxPQUFvQixFQUFFLE9BQXVDO1FBQ3ZFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVmLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFFaEYsSUFB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Z0IsQ0FBQyxTQUFpQjtRQUN4QyxPQUFPLGNBQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUseUJBQXlCLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDeEYsQ0FBQzs7QUF6RUgsMERBMEVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBTYW1wbGVGaWxlLCBTYW1wbGVSZWFkbWUsIFRleHRGaWxlIH0gZnJvbSAncHJvamVuJztcbmltcG9ydCB7IE5vZGVQcm9qZWN0IH0gZnJvbSAncHJvamVuL2xpYi9qYXZhc2NyaXB0JztcblxuLyoqXG4gKiBFcnJvciB0aHJvd24gd2hlbiB0aGUgcGFja2FnZSBsaWNlbnNlIGlzIG5vdCBBcGFjaGUgMi4wXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEludmFsaWRMaWNlbnNlRXJyb3JcbiAqIEB0eXBlZGVmIHtJbnZhbGlkTGljZW5zZUVycm9yfVxuICogQGV4dGVuZHMge0Vycm9yfVxuICovXG5leHBvcnQgY2xhc3MgSW52YWxpZExpY2Vuc2VFcnJvciB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEludmFsaWRMaWNlbnNlRXJyb3IuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaW52YWxpZExpY2Vuc2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKGludmFsaWRMaWNlbnNlOiBzdHJpbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgS2lrb2RhIE9wZW4gU291cmNlIFByb2plY3RzIG11c3QgYmUgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSAyLjAgb3BlbiBzb3VyY2UgbGljZW5zZS4gQ2hhbmdlIHRoZSBjdXJyZW50IGxpY2Vuc2UgZnJvbSAnJHtpbnZhbGlkTGljZW5zZX0nIHRvICdBcGFjaGUtMi4wJ2AsXG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIEVycm9yIHRocm93biB3aGVuIHRoZSBkZWZhdWx0IFB1bGwgUmVxdWVzdCB0ZXBsYXRlIGlzIGVuYWJsZWQuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIERlZmF1bHRQclRlbXBsYXRlRXJyb3JcbiAqIEB0eXBlZGVmIHtEZWZhdWx0UHJUZW1wbGF0ZUVycm9yfVxuICogQGV4dGVuZHMge0Vycm9yfVxuICovXG5leHBvcnQgY2xhc3MgRGVmYXVsdFByVGVtcGxhdGVFcnJvciB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIERlZmF1bHRQclRlbXBsYXRlRXJyb3IuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ1B1bGwgUmVxdWVzdCBUZW1wbGF0ZSBhbHJlYWR5IGV4aXN0cy4gRGlzYWJsZSB0aGUgZXhpc3RpbmcgUFIgdGVtcGxhdGUgdG8gdXNlIHRoaXMgY29tcG9uZW50JyxcbiAgICApO1xuICB9XG59XG5cbi8qKlxuICogU3VwcG9ydGluZyBmaWxlcyBwYXRoIGVudW1lcmF0aW9uXG4gKlxuICogQGV4cG9ydFxuICogQGVudW0ge251bWJlcn1cbiAqL1xuZXhwb3J0IGVudW0gU3VwcG9ydGluZ0ZpbGVzIHtcbiAgTElDRU5TRSA9ICdMSUNFTlNFJyxcbiAgTk9USUNFID0gJ05PVElDRScsXG4gIFJFQURNRSA9ICdSRUFETUUubWQnLFxuICBDT0RFX09GX0NPTkRVQ1QgPSAnQ09ERV9PRl9DT05EVUNULm1kJyxcbiAgQ09OVFJJQlVUSU5HID0gJ0NPTlRSSUJVVElORy5tZCcsXG4gIEJVR19SRVBPUlQgPSAnLmdpdGh1Yi9JU1NVRV9URU1QTEFURS9idWctcmVwb3J0LnltbCcsXG4gIEZFQVRVUkVfUkVRVUVTVCA9ICcuZ2l0aHViL0lTU1VFX1RFTVBMQVRFL2ZlYXR1cmUtcmVxdWVzdC55bWwnLFxuICBHSVRIVUJfSVNTVUVTX0NPTkZJRyA9ICcuZ2l0aHViL0lTU1VFX1RFTVBMQVRFL2NvbmZpZy55bWwnLFxufVxuXG4vKipcbiAqIE9wdGlvbnMgdXNlZCB0byBnZW5lcmF0ZSBLaWtvZGEgT3BlbiBTb3VyY2UgUHJvamVjdCBhbmQgQXJ0aWZhY3RzXG4gKlxuICogQGV4cG9ydFxuICogQGludGVyZmFjZSBLaWtvZGFPcGVuU291cmNlUHJvamVjdE9wdGlvbnNcbiAqIEB0eXBlZGVmIHtLaWtvZGFPcGVuU291cmNlUHJvamVjdE9wdGlvbnN9XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgS2lrb2RhT3BlblNvdXJjZVByb2plY3RPcHRpb25zIHtcbiAgLyoqXG4gICAqIERlc2NyaWJlIHlvdXIgcHJvamVjdC4gVGhpcyB3aWxsIGJlIHVzZWQgaW4gdmFyaW91cyBmaWxlcyBsaWtlIFJFQURNRSwgTk9USUNFLCBldGMuXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgcmVhZG9ubHkgdGl0bGU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgc3RhbmRhcmRpemVkIGZpbGVzIGFuZCBhcnRpZmFjdHMgYXNzb2NpYXRlZCB3aXRoIGEgS2lrb2RhXG4gKiBPcGVuIFNvdXJjZSBQcm9qZWN0LlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBLaWtvZGFPcGVuU291cmNlUHJvamVjdFxuICogQHR5cGVkZWYge0tpa29kYU9wZW5Tb3VyY2VQcm9qZWN0fVxuICogQHRlbXBsYXRlIFQgZXh0ZW5kcyBOb2RlUHJvamVjdFxuICogQGV4dGVuZHMge0NvbXBvbmVudH1cbiAqL1xuZXhwb3J0IGNsYXNzIEtpa29kYU9wZW5Tb3VyY2VQcm9qZWN0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgS2lrb2RhT3BlblNvdXJjZVByb2plY3QuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0tpa29kYU9wZW5Tb3VyY2VQcm9qZWN0T3B0aW9uc30gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IocHJvamVjdDogTm9kZVByb2plY3QsIG9wdGlvbnM6IEtpa29kYU9wZW5Tb3VyY2VQcm9qZWN0T3B0aW9ucykge1xuICAgIHN1cGVyKHByb2plY3QpO1xuXG4gICAgcHJvamVjdC5wYWNrYWdlLmFkZEZpZWxkKCdhdXRob3InLCB7IG5hbWU6ICdLaWtvZGEsIExMQycsIG9yZ2FuaXphdGlvbjogdHJ1ZSB9KTtcblxuICAgIGlmIChwcm9qZWN0LnBhY2thZ2UubGljZW5zZSAhPT0gJ0FwYWNoZS0yLjAnKVxuICAgICAgdGhyb3cgbmV3IEludmFsaWRMaWNlbnNlRXJyb3IocHJvamVjdC5wYWNrYWdlLmxpY2Vuc2UhKTtcblxuICAgIG5ldyBTYW1wbGVGaWxlKHByb2plY3QsIFN1cHBvcnRpbmdGaWxlcy5OT1RJQ0UsIHtcbiAgICAgIGNvbnRlbnRzOiBgJHtvcHRpb25zLnRpdGxlfVxuQ29weXJpZ2h0IDIwMjItMjAyMiBLaWtvZGEsIExMQ1xuXG5UaGlzIHByb2R1Y3QgaW5jbHVkZXMgc29mdHdhcmUgZGV2ZWxvcGVkIGF0IEtpa29kYSAoaHR0cHM6Ly93d3cua2lrb2RhLmNvbSksXG4gICAgICBgLFxuICAgIH0pO1xuXG4gICAgLy8gcmVwbGFjZSBleGlzdGluZyBQUiBUZW1wbGF0ZS4uLlxuICAgIHRyeSB7XG4gICAgICBwcm9qZWN0LmdpdGh1Yj8uYWRkUHVsbFJlcXVlc3RUZW1wbGF0ZShcbiAgICAgICAgcmVhZEZpbGVTeW5jKHRoaXMucmVzb2x2ZUFzc2V0UGF0aCgncHVsbF9yZXF1ZXN0X3RlbXBsYXRlLm1kJyksICd1dGY4JyksXG4gICAgICApO1xuICAgIH0gY2F0Y2gge1xuICAgICAgdGhyb3cgbmV3IERlZmF1bHRQclRlbXBsYXRlRXJyb3IoKTtcbiAgICB9XG5cbiAgICBuZXcgVGV4dEZpbGUocHJvamVjdCwgU3VwcG9ydGluZ0ZpbGVzLkNPTlRSSUJVVElORywge1xuICAgICAgbWFya2VyOiB0cnVlLFxuICAgICAgbGluZXM6IHJlYWRGaWxlU3luYyh0aGlzLnJlc29sdmVBc3NldFBhdGgoU3VwcG9ydGluZ0ZpbGVzLkNPTlRSSUJVVElORyksICd1dGY4JylcbiAgICAgICAgLnJlcGxhY2UoL1xce1xce1BST0pFQ1RfTkFNRVxcfVxcfS9nLCBwcm9qZWN0Lm5hbWUpXG4gICAgICAgIC5zcGxpdCgnXFxuJyksXG4gICAgfSk7XG5cbiAgICBuZXcgVGV4dEZpbGUocHJvamVjdCwgU3VwcG9ydGluZ0ZpbGVzLkNPREVfT0ZfQ09ORFVDVCwge1xuICAgICAgbWFya2VyOiB0cnVlLFxuICAgICAgbGluZXM6IHJlYWRGaWxlU3luYyh0aGlzLnJlc29sdmVBc3NldFBhdGgoU3VwcG9ydGluZ0ZpbGVzLkNPREVfT0ZfQ09ORFVDVCksICd1dGY4Jykuc3BsaXQoXG4gICAgICAgICdcXG4nLFxuICAgICAgKSxcbiAgICB9KTtcblxuICAgIG5ldyBTYW1wbGVGaWxlKHByb2plY3QsIFN1cHBvcnRpbmdGaWxlcy5CVUdfUkVQT1JULCB7XG4gICAgICBjb250ZW50czogcmVhZEZpbGVTeW5jKHRoaXMucmVzb2x2ZUFzc2V0UGF0aCgnYnVnLXJlcG9ydC55bWwnKSwgJ3V0ZjgnKSxcbiAgICB9KTtcblxuICAgIG5ldyBTYW1wbGVGaWxlKHByb2plY3QsIFN1cHBvcnRpbmdGaWxlcy5GRUFUVVJFX1JFUVVFU1QsIHtcbiAgICAgIGNvbnRlbnRzOiByZWFkRmlsZVN5bmModGhpcy5yZXNvbHZlQXNzZXRQYXRoKCdmZWF0dXJlLXJlcXVlc3QueW1sJyksICd1dGY4JyksXG4gICAgfSk7XG5cbiAgICBuZXcgU2FtcGxlRmlsZShwcm9qZWN0LCBTdXBwb3J0aW5nRmlsZXMuR0lUSFVCX0lTU1VFU19DT05GSUcsIHtcbiAgICAgIGNvbnRlbnRzOiByZWFkRmlsZVN5bmModGhpcy5yZXNvbHZlQXNzZXRQYXRoKCdnaXRodWItaXNzdWVzLWNvbmZpZy55bWwnKSwgJ3V0ZjgnKSxcbiAgICB9KTtcblxuICAgIC8vIGlmIHRoZXJlIGlzIGFuIGV4aXN0aW5nIFNhbXBsZVJlYWRtZSwgZG9uJ3Qgc3ludGhlc2l6ZSBpdC4uIHdlJ2xsIHJlcGxhY2UgdGhpcyB3aXRoIG91cnMuXG4gICAgY29uc3QgZXhpc3RpbmdSZWFkbWUgPSBwcm9qZWN0LmNvbXBvbmVudHMuZmluZChjID0+IGMgaW5zdGFuY2VvZiBTYW1wbGVSZWFkbWUpIGFzIFNhbXBsZVJlYWRtZTtcbiAgICBleGlzdGluZ1JlYWRtZS5zeW50aGVzaXplID0gKCkgPT4ge307XG5cbiAgICBuZXcgU2FtcGxlUmVhZG1lKHByb2plY3QsIHtcbiAgICAgIGZpbGVuYW1lOiBTdXBwb3J0aW5nRmlsZXMuUkVBRE1FLFxuICAgICAgY29udGVudHM6IHJlYWRGaWxlU3luYyh0aGlzLnJlc29sdmVBc3NldFBhdGgoU3VwcG9ydGluZ0ZpbGVzLlJFQURNRSksICd1dGY4JylcbiAgICAgICAgLnJlcGxhY2UoL1xce1xce1RJVExFXFx9XFx9L2csIG9wdGlvbnMudGl0bGUpXG4gICAgICAgIC5yZXBsYWNlKC9cXHtcXHtQQUNLQUdFX05BTUVcXH1cXH0vZywgcHJvamVjdC5wYWNrYWdlLnBhY2thZ2VOYW1lKVxuICAgICAgICAucmVwbGFjZSgvXFx7XFx7UkVQT19VUkxcXH1cXH0vZywgcHJvamVjdC5wYWNrYWdlLm1hbmlmZXN0LnJlcG9zaXRvcnkudXJsKSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZUFzc2V0UGF0aChhc3NldFBhdGg6IHN0cmluZykge1xuICAgIHJldHVybiByZXNvbHZlKF9fZGlybmFtZSwgJy4uJywgJy4uJywgJ2Fzc2V0cycsICdLaWtvZGFPcGVuU291cmNlUHJvamVjdCcsIGFzc2V0UGF0aCk7XG4gIH1cbn1cbiJdfQ==