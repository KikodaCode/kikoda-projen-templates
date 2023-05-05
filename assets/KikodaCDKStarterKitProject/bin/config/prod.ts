import * as gconfig from '@kikoda/generated-config';
import * as config from 'bin/config';

const prodConfig: config.StageConfig = {
  //...
};

export const prod = new gconfig.LayeredConfig(config.base, prodConfig) as config.Config;
