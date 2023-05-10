import { readFileSync } from 'fs';
import { resolve } from 'path';
import { IgnoreFile } from 'projen';
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
  // gitignore doesn't work right, see overrides below
  gitignore: ['!.jsii'],
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
  devDeps: ['projen'] /* Build dependencies for this module. */,
});

project.compileTask.exec('rm -rf lib/KikodaOpenSourceProject/assets');

project.compileTask.exec(
  'cp -a assets/KikodaOpenSourceProject lib/KikodaOpenSourceProject/assets/',
);

project.compileTask.exec('rm -rf lib/KikodaCDKStarterKitProject/assets');

project.compileTask.exec(
  'cp -a assets/KikodaCDKStarterKitProject lib/KikodaCDKStarterKitProject/assets/',
);

new KikodaOpenSourceProject(project, {
  title: 'Kikoda Projen Templates',
});

// ignore inherited .gitignore
// we are doing this only because projen doesn't properly handle the overrides passed to super above
project.tryRemoveFile('.gitignore');

// .gitignore
const gitignore = new IgnoreFile(project, '.gitignore');

gitignore.addPatterns(...readAssetAsArray('gitignore'));

project.synth();

function resolveAssetPath(assetPath: string) {
  return resolve(__dirname, 'assets', assetPath);
}

function readAsset(assetPath: string) {
  return readFileSync(resolveAssetPath(assetPath), 'utf8');
}

function readAssetAsArray(assetPath: string) {
  return readAsset(assetPath).split(/\r?\n/);
}
