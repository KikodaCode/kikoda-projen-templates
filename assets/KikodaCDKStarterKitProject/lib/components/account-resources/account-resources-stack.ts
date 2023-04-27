import * as cdk from 'aws-cdk-lib';
import * as github from 'cdk-pipelines-github';
import * as constructs from 'constructs';

export interface AccountResourcesStackProps extends cdk.StackProps {
  repoName: string;
}

export class AccountResourcesStack extends cdk.Stack {
  readonly actionRole: github.GitHubActionRole;

  constructor(scope: constructs.Construct, id: string, props: AccountResourcesStackProps) {
    super(scope, id, props);

    this.actionRole = new github.GitHubActionRole(this, 'GithubActionRole', {
      repos: [props.repoName],
    });
  }
}
