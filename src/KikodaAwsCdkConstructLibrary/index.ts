import { cdktf } from 'projen';
import { KikodaOpenSourceProject } from '..';

export class KikodaAwsCdkConstructLibrary extends cdktf.ConstructLibraryCdktf {
  constructor(options: any) {
    // generate base template
    const base = new KikodaOpenSourceProject();

    // create project
    super({ ...base.options, ...options });

    // add artifacts
    base.addSupportingArtifacts(this, {
      title: 'Kikoda CDKTF Constructs Library',
      packageName: this.package.packageName,
      repoUrl: options.repositoryUrl,
    });
  }
}
