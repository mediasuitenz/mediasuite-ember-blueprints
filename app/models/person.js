import DS from 'ember-data'
const {attr, belongsTo} = DS;

export default DS.Model.extend({
  name: attr('string'),
  age: attr('number'),
  role: belongsTo('role')
});
