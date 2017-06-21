import Ember from 'ember'
<%=editMixinImport%>

export default Ember.Route.extend(<%=newEditMixinName%>, {
  model () {
    const <%=camelizedModel%> = this._super(...arguments)

    return {<%=camelizedModel%>}
  }
})
