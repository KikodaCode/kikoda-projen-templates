import { typescript } from 'projen';
import { KikodaOpenSourceProject } from './src/KikodaOpenSourceProject';

const base = new KikodaOpenSourceProject();
const project = new typescript.TypeScriptProject({
  ...base.options,
  name: 'kikoda-projen-templates',
  packageName: '@kikoda/projen-templates',
  repository: 'https://github.com/KikodaCode/kikoda-projen-templates.git',
  defaultReleaseBranch: 'main',
  tsconfig: { compilerOptions: { esModuleInterop: true } },
  docgen: false,

  deps: ['projen'] /* Runtime dependencies of this module. */,
  peerDeps: ['projen'],
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

base.addSupportingArtifacts(project, {
  title: 'Kikoda Projen Templates',
  packageName: project.package.packageName,
  repoUrl: 'https://github.com/KikodaCode/kikoda-projen-templates.git',
});

project.synth();
