const uuidv1 = require('uuid/v1');
const uuidv5 = require('uuid/v5');
const core = require('@actions/core');
const process = require('process')

async function run() {
  try {
    /* https://github.com/actions/toolkit/issues/1336 use new way of OUTPUT */
    if (!process.env.GITHUB_OUTPUT) {
      process.env.GITHUB_OUTPUT = true
      core.info(`GITHUB_OUTPUT env was not set, it was set to ${process.env.GITHUB_OUTPUT}`)
    }

    const name = core.getInput('name');
    const namespace =
      core.getInput('namespace') || 'f9962f80-1514-11ea-bfe7-1f9e6cf0a044';

    let uuid = uuidv1();
    if (name) {
      uuid = uuidv5(name, namespace);
    }

    core.setOutput('uuid', uuid);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
