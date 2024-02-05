import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { WakeOnLambda } from '../src/index';

describe('WakeOnLambda Stack', () => {
  it('should create a WakeOnLambda function', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');

    const instanceId = 'i-XXXXXXXXX';
    const destinationUrl = 'xxx.us-west-1.elb.amazonaws.com';

    new WakeOnLambda(stack, 'TestWakeOnLambda', {
      instanceId: instanceId,
      destinationUrl: destinationUrl,
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'nodejs20.x',
      Timeout: 600,
    });
  });
});
