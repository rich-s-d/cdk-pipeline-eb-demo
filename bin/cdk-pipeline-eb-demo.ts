#!/usr/bin/env node

// import "source-map-support/register";
// import * as cdk from "aws-cdk-lib";
// import { CdkPipelineStack } from "../lib/cdk-pipeline-stack";
// import * as AWS from "aws-sdk";

// const app = new cdk.App();

// // Create an AWS Secrets Manager client
// const secretsManager = new AWS.SecretsManager({ region: "eu-west-1" }); // Specify the appropriate region

// // Fetch the AWS account ID from Secrets Manager
// secretsManager.getSecretValue({ SecretId: "AWSAccountID" }, (err: any, data: any) => {
//   if (err) {
//     console.error("Error fetching AWS account ID from Secrets Manager:", err);
//     process.exit(1);
//   }

//   const account = JSON.parse(data.SecretString).AWSAccountID;

//   // Create the CDK stack with the retrieved account ID
//   new CdkPipelineStack(app, "CdkPipelineStack", {
//     env: { account, region: "eu-west-1" },
//   });

//   app.synth();
// });

//TODO: set up a role in aws, then enter credentials in the cli using aws configure, then npx cdk bootstrap aws://ACCOUNT-NUMBER/REGION should run without a credentials exception.

import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkPipelineStack } from "../lib/cdk-pipeline-stack";

const app = new cdk.App();

new CdkPipelineStack(app, "CdkPipelineStack", {
  env: { account: "282888159845", region: "eu-west-1" },
});

app.synth();
