/* global require, describe, it, process, console */
'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const ember = require('ember-cli-blueprint-test-helpers/lib/helpers/ember');
const { setupTestHooks, emberNew, emberGenerate, modifyPackages } = blueprintHelpers;

const expect = require('ember-cli-blueprint-test-helpers/chai').expect;
const fs = require('fs-extra')
const path = require('path')
const { exec } = require('child_process');

describe('Acceptance: ember generate and destroy model-crud', function() {

  // Record our current working directory; we'll need it later to grab our fixture files.  Need to grab it before we run
  // the setupTestHooks as this moves the working directory to the context of the test Ember instance
  const thisPath = process.cwd();

  // Set up the temporary folder and move the working directory (process.cwd()) to this location
  setupTestHooks(this);

  it('model-crud book', function() {
    this.timeout(10 * 60 * 1000) // 10 minutes
    const dummy = path.join(thisPath, 'tests', 'dummy')

    // pass any additional command line options in the arguments array
    return emberNew()
      .then(() => {
        const models = ['book.form.json', 'author.js', 'book.js']

        // Copy across our model and model config files
        models.forEach((file) => fs.copySync(path.join(dummy, 'app', 'models', file), path.join(process.cwd(), 'app', 'models', file)))

        // copy across the router
        fs.copySync(path.join(dummy, 'app', 'router.js'), path.join(process.cwd(), 'app', 'router.js'))

        // copy across the tests and testem
        fs.copySync(path.join(dummy, 'tests'), path.join(process.cwd(), 'tests'))
        fs.copySync(path.join(dummy, 'testem.js'), path.join(process.cwd(), 'testem.js'))

        // yarn install
        // Note: in local tests yarn is about 3x faster than npm
        modifyPackages([{name: 'mediasuite-ember-blueprints', delete: true}])
        return new Promise((resolve, reject) => exec('yarn install', (err) => {
          if (err) {
            console.error(err)
            return reject(err)
          }
          modifyPackages([{name: 'mediasuite-ember-blueprints', dev: true}])
          return resolve()
        }))
      })
      .then(() => {
        // Generate the Blueprint instance
        return emberGenerate(['model-crud', 'book'])
      })
      .then(() => {
        // Run ember tests
        // See https://github.com/ember-cli/ember-cli/blob/master/tests/helpers/ember.js#L29
        return ember(['test'])
      })
  });
});
