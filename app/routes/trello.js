import Ember from 'ember';
import AuthorizedRoute from './authorized';

export default AuthorizedRoute.extend({
	model: function(){
		var token = this.controllerFor("user").get("token");
		return Ember.$.getJSON('https://trello.com/1/members/me/cards?key=69ea5c8500ae4ff25ecfdd6e4d92a561&token=' + token);
	},

	setupController: function(controller, model){
		var userController = this.controllerFor("user");
		userController.set("model", model);
	}
});
