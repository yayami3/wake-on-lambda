import { awscdk } from 'projen';
import { TrailingComma } from 'projen/lib/javascript';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yayami3',
  authorAddress: '116920988+yayami3@users.noreply.github.com',
  cdkVersion: '2.124.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: 'wake-on-lambda',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/116920988+yayami3/wake-on-lambda.git',
  eslintOptions: {
    dirs: [],
    ignorePatterns: ['*.d.ts', 'functions/**/*'],
  },
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
      jsxSingleQuote: true,
      trailingComma: TrailingComma.ALL,
      semi: true,
      printWidth: 100,
    },
  },
  // deps: [], /* Runtime dependencies of this module. */
  keywords: ['cdk', 'awscdk', 'aws-cdk', 'lambda', 'cost'],
  gitignore: ['*.js', '*.d.ts', '!test/.*.snapshot/**/*'],
  license: 'Apache-2.0',
  tsconfigDev: {
    compilerOptions: {},
    exclude: ['example', 'test/.*.snapshot'],
  },
  description:
    'Wake-on-Lambda is a module centered around a lambda function that receives HTTP requests. In the event that the destination server is inactive, it initiates the server and subsequently redirects the user to the destination.' /* The description is just a string that helps people understand the purpose of the package. */,
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: [
    '@types/jest',
    'aws-sdk',
    '@aws-cdk/integ-runner@2.124.0',
    '@aws-cdk/integ-tests-alpha@2.124.0-alpha.0',
  ] /* Build dependencies for this module. */,
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
