import { ExpectedResult, IntegTest } from '@aws-cdk/integ-tests-alpha';
import { Stack, StackProps, App } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Role, ServicePrincipal, ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { WakeOnLambda } from '../src/';

const app = new App();

export class TestStack extends Stack {
  public readonly wakeOnLambda: WakeOnLambda;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'TheVPC', {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
      createInternetGateway: false,
      maxAzs: 1,
      natGateways: 0,
    });

    const instanceRole = new Role(this, 'InstanceRole', {
      assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
    });

    instanceRole.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'),
    );

    const instanceSg = new ec2.SecurityGroup(this, 'InstanceSg', {
      vpc: vpc,
      allowAllOutbound: true,
    });

    const instance = new ec2.Instance(this, 'TargetInstance', {
      vpc: vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      securityGroup: instanceSg,
      role: instanceRole,
      requireImdsv2: true,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
    });

    this.wakeOnLambda = new WakeOnLambda(this, 'Default', {
      instanceId: instance.instanceId,
      destinationUrl: 'http://xxx.com',
    });
  }
}

const stack = new TestStack(app, 'WakeOnLambdaIntegTest');

const integ = new IntegTest(app, 'Test', {
  testCases: [stack],
  diffAssets: true,
});

const input = {
  // InvocationRequest
  FunctionName: stack.wakeOnLambda.lambdaFn.functionName, // required
  InvocationType: 'RequestResponse',
  LogType: 'None',
};

const assertion = integ.assertions
  .awsApiCall('lambda', 'InvokeCommand', {
    ...input,
  })
  .expect(
    ExpectedResult.objectLike({
      Payload: '{"statusCode":302,"headers":{"Location":"http://xxx.com"},"body":""}',
    }),
  );

// Add the required permissions to the api call
assertion.provider.addToRolePolicy({
  Effect: 'Allow',
  Action: ['lambda:*'],
  Resource: [stack.wakeOnLambda.lambdaFn.functionArn],
});
