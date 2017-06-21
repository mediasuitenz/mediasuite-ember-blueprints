/* eslint-env node */
const S = require('string')
const fs = require('fs')
const CONSOLE = Object.freeze({
  WARN: '\x1b[33m',
  INFO: "\x1b[32m"
})


module.exports = {
  description: 'Adds crud components for the provided model',

  //todo: write something about this
  availableOptions: [
    {
      name: 'model',
      type: String,
      default: ''
    }
  ],

  // beforeInstall: function (options) {
  //   console.log('before install')
  //   // todo: Add a dasherized version of the model name to the options if possible
  //   // options.entity.dasherized = 'test-name'
  //   console.warn(`${CONSOLE.WARN}Warning: if model name "${options.entity.name}" is not dasherised, this will fail`)
  //
  //   // todo: check a model and config actually exists
  //   return this._super(...arguments)
  // },
  // beforeUninstall: function() {
  //   console.log('before uninstall')
  //   return this._super(...arguments)
  // },
  // afterUninstall: function () {
  //   console.log('after uninstall')
  //   return this._super(...arguments)
  // },
  // filesPath: function () {
  //   console.log('filesPath')
  //   return this._super(...arguments)
  // },
  // normalizeEntityName: function () {
  //   console.log('normalizeentity name')
  //   console.log(this._super(...arguments))
  //   return this._super(...arguments)
  // },


  fileMapTokens: function() {
    // console.log('filemaptokens')
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
    // console.log('locals')
    console.log('model', options.model)
    const camelizedModel = S(options.entity.name).camelize().s
    const capitilizedModel = S(camelizedModel).capitalize().s
    return {
      components: getComponents(options.target, options.entity.name),
      newMixinImport: `import NewOrEdit${capitilizedModel}Mixin from '../mixins/routes/new_edit_${options.entity.name}'`,
      editMixinImport: `import NewOrEdit${capitilizedModel}Mixin from '../../mixins/routes/new_edit_${options.entity.name}'`,
      newEditMixinName: `NewOrEdit${capitilizedModel}Mixin`,
      modelToken: options.entity.name,
      camelizedModel,
      capitilizedModel
    }
  },
  //
  afterInstall: function (options) {
    console.log(`${CONSOLE.WARN}Copy this text to your router.js`)
    console.log(`${CONSOLE.INFO}${generateRouterCode(options.entity.name)}`)
    // console.log('afterInstall')
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
