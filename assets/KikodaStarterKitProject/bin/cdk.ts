#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
// import * as config from 'bin/config';
import * as components from 'lib/components';

const awsAccount = '999999999999';
const repoName = 'repoName'

const gitHubActionRoleArn = `arn:aws:iam::${awsAccount}:role/GitHubActionRole`;

const env = {
  account: awsAccount,
  region: 'us-east-1',
};

export enum StageName {
  DEV = 'dev',
  STAGING = 'staging',
  PROD = 'prod',
}

export const app = new cdk.App();

new components.AccountResourcesStack(app, 'AccountResourcesStack', {
  repoName: repoName,
});

app.synth();
