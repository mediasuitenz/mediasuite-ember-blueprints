import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('new-book', {path: 'book/new'})
  this.route('book', {path: 'book/:book_id'}, function () {
    this.route('view', {path: '/'})
    this.route('edit')
  })
});

export default Router;
