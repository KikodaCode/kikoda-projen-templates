import { typescript } from 'projen';
import { KikodaOpenSourceProject, KikodaStandards } from './src/KikodaOpenSourceProject';

const project = new typescript.TypeScriptProject({
  name: 'kikoda-projen-templates',
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  packageName: '@kikoda/projen-templates',
  repository: 'https://github.com/KikodaCode/kikoda-projen-templates.git',
  defaultReleaseBranch: 'main',
  projenrcTs: true,
  prettier: true,
  prettierOptions: KikodaStandards.PrettierOptions,
  tsconfig: { compilerOptions: { esModuleInterop: true } },
  docgen: false,
  pullRequestTemplate: false,
  readme: undefined,
  releaseToNpm: true,

  deps: ['projen'] /* Runtime dependencies of this module. */,
  peerDeps: ['projen'],
  // devDeps: [],             /* Build dependencies for this module. */
});

new KikodaOpenSourceProject(project, {
  title: 'Kikoda Projen Templates',
});

project.synth();
