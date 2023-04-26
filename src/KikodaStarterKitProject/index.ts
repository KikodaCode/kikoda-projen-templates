import { readFileSync } from 'fs';
import { resolve } from 'path';
import { SampleDir, SampleFile, SampleReadme } from 'projen';
import { TypeScriptAppProject, TypeScriptProjectOptions } from 'projen/lib/typescript';
import { KikodaStandards } from '../common';

export enum DatabaseType {
  POSTGRESQL = 'PostgreSQL',
  MYSQL = 'MySQL',
}

export interface KikodaStarterKitProjectOptions extends TypeScriptProjectOptions {
  readonly databaseType?: DatabaseType;
}

/**
 * Starter kit project. This project is designed to help teams bootstrap new efforts and projects faster.
 *
 * @pjid kikoda-starter-kit
 */
export class KikodaStarterKitProject extends TypeScriptAppProject {
  // private options: KikodaStarterKitProjectOptions;

  constructor(options: KikodaStarterKitProjectOptions) {
    super({
      prettier: true,
      prettierOptions: KikodaStandards.PrettierOptions,
      tsconfig: {
        include: ['bin/**/*.ts', 'lib/**/*.ts'],
        compilerOptions: { baseUrl: '.', rootDir: '.' },
      },
      licensed: false,
      gitignore: ['!/lib/'],
      ...options,
    });

    // this.options = options;

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
