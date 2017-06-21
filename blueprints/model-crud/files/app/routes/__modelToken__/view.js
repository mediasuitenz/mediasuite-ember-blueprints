import Ember from 'ember'

export default Ember.Route.extend({
  model () {
    const <%=camelizedModel%> = this._super(...arguments)
    // TODO: Potentially force a reload here if any other screens can cause a change to this model (e.g. unpublish)
    // <%=camelizedModel%>.reload()
    return {<%=camelizedModel%>}
  }
})
