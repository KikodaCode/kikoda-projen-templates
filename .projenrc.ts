import { JsiiProject } from 'projen/lib/cdk';
import { GithubCredentials } from 'projen/lib/github';
import { KikodaStandards } from './src/common';
import { KikodaOpenSourceProject } from './src/KikodaOpenSourceProject';

const project = new JsiiProject({
  name: 'kikoda-projen-templates',
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  author: 'Kikoda, LLC',
  authorAddress: 'platform@kikoda.com',
  packageName: '@kikoda/projen-templates',
  repository: 'https://github.com/KikodaCode/kikoda-projen-templates.git',
  repositoryUrl: 'https://github.com/KikodaCode/kikoda-projen-templates.git',
  defaultReleaseBranch: 'main',
  projenrcTs: true,
  prettier: true,
  prettierOptions: KikodaStandards.PrettierOptions,
  tsconfig: {
    compilerOptions: { esModuleInterop: true },
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
  devDeps: ['projen'],             /* Build dependencies for this module. */
});

project.compileTask.exec(
  'cp -a src/KikodaOpenSourceProject/assets lib/KikodaOpenSourceProject/assets',
);

new KikodaOpenSourceProject(project, {
  title: 'Kikoda Projen Templates',
});

project.synth();
