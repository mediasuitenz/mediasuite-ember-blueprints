import Ember from 'ember'

const { get, set, RSVP } = Ember

export default Ember.Mixin.create({
  afterModel (model) {
    // Need to fetch all the related models for belongsTo
    <%
    const belongsTo = components
      .filter(component => component.type === 'belongsTo')
    %>
    return RSVP.hash({<%
      belongsTo.forEach((component, index) => {%>
        <%=component.options%>: get(this, 'store').findAll('<%=component.relatedModel%>')<%= index !== belongsTo.length - 1 ? ',' : '' %>
      <%})%>
    }).then(({<%=belongsTo.map(component => component.options).join(',')%>}) => {
      <%belongsTo.forEach((component) => {%>
        set(model, '<%=component.options%>', <%=component.options%>)
      <%})%>
      return model
    })
  },

  actions: {
    save (<%=camelizedModel%>, returnPath) {
      // TODO: Modify all as required
      const wasNew = get(<%=camelizedModel%>, 'isNew')
      return <%=camelizedModel%>.save()
        .then(() => {
          // Force <%=modelToken%> to reload in case we need any data added by the server during save
          get(this, 'store').find('<%=modelToken%>', get(<%=modelToken%>, 'id'))
          get(this, 'flashMessages').success('<%=capitilizedModel%> successfully saved')

          if (!returnPath) return

          // If the model was new, return to the list of models.
          // Else return to the specific view screen
          if (wasNew) {
            this.transitionTo(returnPath)
          } else {
            this.transitionTo(returnPath, <%=camelizedModel%>)
          }
        })
        .catch(error => {
          let message = ''
          if (error.errors !== undefined) {
            message = message + ' (' + error.errors[0].detail + ')'
          }
          get(this, 'flashMessages').danger('There was a problem saving this <%=capitilizedModel%> ' + message)
        })
    },

    willTransition () {
      const <%=camelizedModel%> = get(this, 'controller.model.<%=camelizedModel%>')
      <%=camelizedModel%>.rollbackAttributes()
    }
  }
})

<%

%>
