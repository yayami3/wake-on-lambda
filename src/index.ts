import { join } from 'path';
import { Duration } from 'aws-cdk-lib';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export interface WakeOnLambdaProps {
  /**
   *The instance id of destination server.
   *
   */
  readonly instanceId: string;

  /**
   * The url of destination server.
   *
   */
  readonly destinationUrl: string;
}

export class WakeOnLambda extends Construct {
  public readonly lambdaFn: Function;
  constructor(scope: Construct, id: string, props: WakeOnLambdaProps) {
    super(scope, id);

    this.lambdaFn = new Function(this, 'WakeOnLambdaFunction', {
      code: Code.fromAsset(join(__dirname, '../functions/wake-on-lambda')),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_20_X,
      timeout: Duration.seconds(600),
      environment: {
        INSTANCE_ID: props.instanceId,
        ALB_DNS_NAME: props.destinationUrl,
      },
    });

    this.lambdaFn.addToRolePolicy(
      new PolicyStatement({
        actions: ['ec2:DescribeInstanceStatus', 'ec2:DescribeInstances'],
        resources: ['*'],
      }),
    );

    this.lambdaFn.addToRolePolicy(
      new PolicyStatement({
        actions: ['ec2:StartInstances'],
        resources: ['*'],
        conditions: {
          StringEquals: { 'ec2:InstanceID': props.instanceId },
        },
      }),
    );
  }
}
