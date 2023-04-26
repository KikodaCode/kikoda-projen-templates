import * as gconfig from '@kikoda/generated-config';

export interface BaseConfig {
  //...
}

export interface Config extends BaseConfig {
  //...
}

export type StageConfig = gconfig.ConfigLayer<BaseConfig, Config>;

export * from './base';
export * from './dev';
export * from './staging';
export * from './prod';
