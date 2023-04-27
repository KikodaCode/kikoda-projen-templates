import * as gconfig from '@kikoda/generated-config';
import * as config from 'bin/config';

const stagingConfig: config.StageConfig = {
  //...
};

export const staging = new gconfig.LayeredConfig(config.base, stagingConfig) as config.Config;
