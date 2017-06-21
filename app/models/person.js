// import customModel from 'bluepritns/models/customModel'
import DS from 'ember-data'
const {attr} = DS;

export default DS.Model.extend({
  name: attr('string'),
  age: attr('number')
});

// jons-blueprint/DS-mock

// class MockAttr {
//
// }
//
// module.exports = {
//   Model: {
//     extend: function (...definitions) {
//       this.def = {
//         name: new MockAttr('string')
//
//       }
//     }
//   },
//   attr: function (type) {
//     return new MockAttr(...arguments)
//   },
//   getAttributes: function () {
//     const thingsWeCareAbout = Object.keys(this.def).filter(function (key) {
//       if (this.def[key] instanceof MockAttr) return key
//     })
//   }
// }

///////////////////////
