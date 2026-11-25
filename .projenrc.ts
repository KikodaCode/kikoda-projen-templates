import { typescript } from 'projen';
import { GithubCredentials } from 'projen/lib/github';
import { NodePackageManager } from 'projen/lib/javascript';
import { KikodaOpenSourceProject, KikodaStandards } from './src/KikodaOpenSourceProject';

const project = new typescript.TypeScriptProject({
  name: 'kikoda-projen-templates',
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  packageName: '@kikoda/projen-templates',
  packageManager: NodePackageManager.YARN_CLASSIC,
  repository: 'https://github.com/KikodaCode/kikoda-projen-templates.git',
  defaultReleaseBranch: 'main',
  projenrcTs: true,
  prettier: true,
  prettierOptions: KikodaStandards.PrettierOptions,
  tsconfig: {
    compilerOptions: { esModuleInterop: true, skipLibCheck: true },
  },
  docgen: false,
  pullRequestTemplate: false,
  releaseToNpm: true,
  jestOptions: {
    jestConfig: {
      coveragePathIgnorePatterns: ['/node_modules/', '/test/mocks/'],
      moduleNameMapper: {
        '^dax$': '<rootDir>/test/mocks/dax.ts',
        '^properties-file/editor$':
          '<rootDir>/node_modules/properties-file/dist/cjs/editor/index.js',
      },
    },
  },
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

project.compileTask.exec(
  'mkdir -p lib/KikodaOpenSourceProject && cp -r src/KikodaOpenSourceProject/assets/. lib/KikodaOpenSourceProject/assets',
);

new KikodaOpenSourceProject(project, {
  title: 'Kikoda Projen Templates',
});

project.synth();
