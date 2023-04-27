import * as gconfig from '@kikoda/generated-config';
import * as config from 'bin/config';

const devConfig: config.StageConfig = {
  //...
};

export const dev = new gconfig.LayeredConfig(config.base, devConfig) as config.Config;
