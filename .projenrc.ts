import { typescript } from 'projen';
import { GithubCredentials } from 'projen/lib/github';
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
  tsconfig: {
    compilerOptions: {
      esModuleInterop: true,
      target: 'es2021',
      lib: ['es2021'],
    },
  },
  docgen: false,
  pullRequestTemplate: false,
  releaseToNpm: true,
  githubOptions: {
    projenCredentials: GithubCredentials.fromApp(),
  },
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ['projen-workflows[bot]'],
  },

  deps: ['projen'] /* Runtime dependencies of this module. */,
  peerDeps: ['projen'],
  // devDeps: [],             /* Build dependencies for this module. */
});

new KikodaOpenSourceProject(project, {
  title: 'Kikoda Projen Templates',
});

project.synth();
