import { Stack, StackProps, App } from 'aws-cdk-lib';
import { Role, ServicePrincipal, ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { InstanceTarget, LambdaTarget } from 'aws-cdk-lib/aws-elasticloadbalancingv2-targets';
import { Construct } from 'constructs';
import * as fs from 'fs';
import { WakeOnLambda } from '../src/';

export class ExampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'TheVPC', {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
    });

    const instanceRole = new Role(this, 'InstanceRole', {
      assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
    });

    instanceRole.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'),
    );

    const albSg = new ec2.SecurityGroup(this, 'AlbSg', {
      vpc: vpc,
      allowAllOutbound: true,
    });
    albSg.addIngressRule(ec2.Peer.ipv4('myip'), ec2.Port.tcp(80));

    const instanceSg = new ec2.SecurityGroup(this, 'InstanceSg', {
      vpc: vpc,
      allowAllOutbound: true,
    });
    instanceSg.addIngressRule(albSg, ec2.Port.tcp(80));

    const lb = new elbv2.ApplicationLoadBalancer(this, 'LB', {
      vpc,
      securityGroup: albSg,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      internetFacing: true,
    });

    const instance = new ec2.Instance(this, 'TargetInstance', {
      vpc: vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroup: instanceSg,
      role: instanceRole,
      requireImdsv2: true,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
    });

    const userData = fs.readFileSync('user-data.sh', {encoding: 'utf-8'});
    instance.addUserData(userData);

    const wakeOnLambda = new WakeOnLambda(this, 'Default', {
      instanceId: instance.instanceId,
      destinationUrl: `http://${lb.loadBalancerDnsName}`,
    });

    const listener = lb.addListener('Listener', { port: 80 });

    const lambdaTarget = new LambdaTarget(wakeOnLambda.lambdaFn);
    const LambdaTargetGroup = listener.addTargets('LambdaTaget', {
      targets: [lambdaTarget],
    });

    new elbv2.ApplicationListenerRule(this, 'ApplicationListenerRule', {
      listener: listener,
      priority: 100,
      conditions: [elbv2.ListenerCondition.pathPatterns(['/entry'])],
      targetGroups: [LambdaTargetGroup],
    });

    const instanceTarget = new InstanceTarget(instance, 80);
    listener.addTargets('MainTarget', {
      port: 80,
      targets: [instanceTarget],
    });
  }
}

class TestApp extends App {
  constructor() {
    super();

    new ExampleStack(this, 'ExampleStack');
  }
}

new TestApp().synth();