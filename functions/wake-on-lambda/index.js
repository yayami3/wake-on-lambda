const {
  EC2,
  waitUntilInstanceRunning,
} = require("@aws-sdk/client-ec2");
const ec2 = new EC2();


exports.handler = async (event) => {
  const instanceId = process.env.INSTANCE_ID ?? '';
  const destinationUrl = process.env.DESTINATION_URL ?? ';';
  try {
    const instanceState = await getInstanceState(instanceId);

    if (instanceState === 'stopped') {
      await startInstance(instanceId);
    }

    return {
      statusCode: 302,
      headers: {
        Location: destinationUrl,
      },
      body: '',
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};

async function getInstanceState(instanceId) {
  const response = await ec2.describeInstances({
    InstanceIds: [instanceId],
  });

  const instanceState = response.Reservations?.[0].Instances?.[0].State?.Name;
  return instanceState || '';
}

async function startInstance(instanceId) {
  await ec2.startInstances({
    InstanceIds: [instanceId],
  });
  await waitUntilInstanceRunning(
    {
      client: ec2,
      maxWaitTime: 600,
    },
    { InstanceIds: [instanceId] },
  );
}