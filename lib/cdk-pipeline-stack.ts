import { CodePipeline, CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { SecretValue, Stack, StackProps } from "aws-cdk-lib";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";

// /**
//  * The stack that defines the application pipeline
//  */
// export class CdkPipelineStack extends Stack {
//   constructor(scope: Construct, id: string, props?: StackProps) {
//     super(scope, id, props);

//     const pipeline = new CodePipeline(this, "Pipeline", {
//       // The pipeline name
//       pipelineName: "MyServicePipeline",

//       // How it will be built and synthesized
//       synth: new ShellStep("Synth", {
//         // Where the source can be found
//         input: CodePipelineSource.gitHub("rich-s-d/cdk-pipeline-eb-demo", "main"),

//         // Install dependencies, build and run cdk synth
//         installCommands: ["npm i -g npm@latest"],
//         commands: ["npm ci", "npm run build", "npx cdk synth"],
//       }),
//     });

//     // This is where we add the application stages
//   }
// }

export class CdkPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Define the AWS Secrets Manager secret containing your GitHub token
    const githubTokenSecret = Secret.fromSecretNameV2(this, "GitHubTokenSecret", "github-token-v3");

    const pipeline = new CodePipeline(this, "Pipeline", {
      // The pipeline name
      pipelineName: "MyServicePipeline",

      // How it will be built and synthesized
      synth: new ShellStep("Synth", {
        // Where the source can be found
        input: CodePipelineSource.gitHub("rich-s-d/cdk-pipeline-eb-demo", "main", {
          authentication: SecretValue.secretsManager(githubTokenSecret.secretArn),
        }),

        // Install dependencies, build and run cdk synth
        installCommands: ["npm i -g npm@latest"],
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    // This is where we add the application stages
  }
}
