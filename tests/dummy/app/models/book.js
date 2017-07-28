import DS from 'ember-data'
const {attr, belongsTo} = DS

export default DS.Model.extend({
  title: attr('string'),
  synopsis: attr('string'),
  rating: attr('number'),
  author: belongsTo('author')
})
