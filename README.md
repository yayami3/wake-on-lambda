# WakeOnLambda CDK Construct

## Overview

The WakeOnLambda CDK Construct simplifies the process of starting an Amazon EC2 instance by providing a serverless solution that can be triggered effortlessly via a web service URL. The primary goal of this package is to enable users to initiate the instance startup process seamlessly, allowing them to access their web service without the need for manual intervention.

## Key Features

- **Ease of Use**: By deploying this construct, users can trigger the Lambda function by accessing a specific URL, streamlining the process of starting an EC2 instance.
  
- **Cost Optimization**: From an operational standpoint, the construct eliminates the need to keep instances running continuously. Instead, instances can be started on-demand, contributing to cost savings by only incurring charges when necessary.


## Installation

To use this construct in your AWS CDK application, you can install it via npm. Run the following command:

```bash
npm install wake-on-lambda
```

## Usage
See [example](/wake-on-lambda/example/index.ts)



