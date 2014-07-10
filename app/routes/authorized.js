import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(){
		var userController = this.controllerFor("user");
		if(userController.get("isAuthorized") === false){
			this.transitionTo("index");
		}
	}
});
