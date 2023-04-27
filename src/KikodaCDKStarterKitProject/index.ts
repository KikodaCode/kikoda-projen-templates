import { readFileSync } from 'fs';
import { resolve } from 'path';
import { SampleDir, SampleFile, SampleReadme } from 'projen';
import { TypeScriptAppProject, TypeScriptProjectOptions } from 'projen/lib/typescript';
import { KikodaStandards } from '../common';

/**
 * CDK starter kit project. This project is designed to help teams bootstrap new efforts faster.
 *
 * @pjid kikoda-cdk-starter-kit
 */
export class KikodaCDKStarterKitProject extends TypeScriptAppProject {
  constructor(options: TypeScriptProjectOptions) {
    super({
      prettier: true,
      prettierOptions: KikodaStandards.PrettierOptions,
      tsconfig: {
        include: ['bin/**/*.ts', 'lib/**/*.ts'],
        compilerOptions: { baseUrl: '.', rootDir: '.' },
        exclude: ['node_modules', 'cdk.out'],
      },
      eslintOptions: {
        dirs: ['bin', 'lib'],
        tsconfigPath: 'tsconfig.eslint.json',
      },
      disableTsconfigDev: true,
      licensed: false,
      gitignore: ['!/lib/', '.cdk.staging', 'cdk.out', '*.d.ts'],
      sampleCode: false,
      ...options,
    });

    // cdk dependencies
    this.addDeps(
      '@kikoda/cdk-constructs',
      '@kikoda/generated-config',
      'aws-cdk-lib',
      'cdk-pipelines-github',
      'constructs',
      'source-map-support',
    );

    // cdk dev dependencies
    this.addDevDeps('aws-cdk');

    // cdk scripts
    this.addScripts({
      cdk: 'cdk',
    });

    // cdk bin folder
    new SampleDir(this, 'bin', {
      sourceDir: this.resolveAssetPath('bin'),
    });

    // cdk config
    new SampleFile(this, 'cdk.json', {
      sourcePath: this.resolveAssetPath('cdk.json'),
    });

    // cdk lib folder
    new SampleDir(this, 'lib', {
      sourceDir: this.resolveAssetPath('lib'),
    });

    // vscode config folder
    new SampleDir(this, '.vscode', {
      sourceDir: this.resolveAssetPath('.vscode'),
    });

    // eslint+ts project config
    new SampleFile(this, 'tsconfig.eslint.json', {
      sourcePath: this.resolveAssetPath('tsconfig.eslint.json'),
    });

    // github config?
    // app?
    //  config
    //  envs / stages
    //  networking
    //  db
    //  blob
    //  compute
    //  api
    //  cdn
    //  dns
    //  emails
    //  auth
    //  alerts / monitoring
    //  ui

    // ignore inherited readme
    const existingReadme = this.components.find(c => c instanceof SampleReadme) as SampleReadme;
    existingReadme.synthesize = () => {};

    // readme
    new SampleReadme(this, {
      filename: 'README.md',
      contents: this.readAsset('README.md'),
    });

    // override tsconfig properties not supported by projen
    const tsconfig = this.tryFindObjectFile('tsconfig.json');

    if (tsconfig) {
      tsconfig.addOverride('ts-node', { require: ['tsconfig-paths/register'] });
    }
  }

  private resolveAssetPath(assetPath: string) {
    return resolve(__dirname, 'assets', assetPath);
  }

  private readAsset(assetPath: string) {
    return readFileSync(this.resolveAssetPath(assetPath), 'utf8').replace(
      /\{\{PACKAGE_NAME\}\}/g,
      this.package.packageName,
    );
  }
}
