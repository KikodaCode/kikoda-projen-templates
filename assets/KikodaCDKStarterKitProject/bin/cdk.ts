#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
// import * as config from 'bin/config';
import * as components from 'lib/components';

// put your aws account number here
const awsAccount = '999999999999';
// put your aws region here
const awsRegion = 'us-east-1';
// put your github repo name here. 'KikodaCode/kikoda-projen-templates'
const repoName = 'repoName';

// const gitHubActionRoleArn = `arn:aws:iam::${awsAccount}:role/GitHubActionRole`;

const env = {
  account: awsAccount,
  region: awsRegion,
};

export enum StageName {
  DEV = 'dev',
  STAGING = 'staging',
  PROD = 'prod',
}

export const app = new cdk.App();

new components.AccountResourcesStack(app, 'AccountResourcesStack', {
  env,
  repoName: repoName,
});

app.synth();
