import * as gconfig from '@kikoda/generated-config';

/**
 * Base configration properties that all stages will start from.
 * This is usually used for properties that do not necessarily need to be stage specific.
 * The default base values are defined in base.ts.
 */
export interface BaseConfig {
  //readonly baseDomain: string;
}

/**
 * Stage specific configration properties.
 * This is usually used for properties that should be different for each stage.
 * The values for each stage are defined in dev.ts, staging.ts, and prod.ts.
 */
export interface Config extends BaseConfig {
  //readonly subDomain: string;
}

export type StageConfig = gconfig.ConfigLayer<BaseConfig, Config>;

export * from './base';
export * from './dev';
export * from './staging';
export * from './prod';
