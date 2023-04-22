import { TypeScriptAppProject, TypeScriptProjectOptions } from 'projen/lib/typescript';
import { KikodaStandards } from '../common';

export interface KikodaStarterKitProjectOptions extends TypeScriptProjectOptions {}

/**
 * Closed source starter kit app.
 *
 * @pjid kikoda-starter-kit
 */
export class KikodaStarterKitProject extends TypeScriptAppProject {
  constructor(options: KikodaStarterKitProjectOptions) {
    super({
      prettier: true,
      prettierOptions: KikodaStandards.PrettierOptions,
      ...options,
    });

    //! do things here to setup the project
  }
}
