import Ember from 'ember'
<%=newMixinImport%>
const {get} = Ember

export default Ember.Route.extend(<%=newEditMixinName%>, {
  model () {
    return {<%=camelizedModel%>: get(this, 'store').createRecord('<%=modelToken%>')}
  },
  cancelTransition () {
    this.transitionTo('/')
  }
})
