/* eslint-env node */
const S = require('string')
const fs = require('fs')
const CONSOLE = Object.freeze({
  WARN: '\x1b[33m',
  INFO: "\x1b[32m"
})


module.exports = {
  description: 'Adds crud components for the provided model',

  fileMapTokens: function() {
    // Return custom tokens to be replaced in your files
    return {
      __modelToken__: function(options) {
        return options.dasherizedModuleName;
      },
      __editModelToken__: function (options) {
        return `edit-${options.dasherizedModuleName}`
      },
      __viewModelToken__: function (options) {
        return `view-${options.dasherizedModuleName}`
      },
      __newModelToken__: function (options) {
        return `new-${options.dasherizedModuleName}`
      },
      __newEditMixinName__: function (options) {
        return `new-edit-${options.dasherizedModuleName}`
      }
    }
  },

  locals: function (options) {
    const camelizedModel = S(options.entity.name).camelize().s
    const capitilizedModel = S(camelizedModel).capitalize().s
    const humanModel = S(camelizedModel).humanize().s
    return {
      components: getComponents(options.target, options.entity.name),
      newMixinImport: `import NewOrEdit${capitilizedModel}Mixin from '../mixins/routes/new-edit-${options.entity.name}'`,
      editMixinImport: `import NewOrEdit${capitilizedModel}Mixin from '../../mixins/routes/new-edit-${options.entity.name}'`,
      newEditMixinName: `NewOrEdit${capitilizedModel}Mixin`,
      modelToken: options.entity.name,
      camelizedModel,
      capitilizedModel,
      humanModel,
      S
    }
  },
  //
  afterInstall: function (options) {
    console.log(`${CONSOLE.WARN}Copy this text to your router.js`)
    console.log(`${CONSOLE.INFO}${generateRouterCode(options.entity.name)}`)
  }
};


function generateRouterCode(modelName) {
  const routesTemplate = `
    this.route('new-${modelName}', {path: '${modelName}/new'})
    this.route('${modelName}', {path: '${modelName}/:${modelName}_id'}, function () {
      this.route('view', {path: '/'})
      this.route('edit')
    })
  `
  return routesTemplate
}

function getComponents(modelPath, modelFileName) {
  const contents = fs.readFileSync(`${modelPath}/app/models/${modelFileName}.form.json`)
  return JSON.parse(contents)
}
