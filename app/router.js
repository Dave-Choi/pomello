import Ember from 'ember';

var Router = Ember.Router.extend({
  location: PomelloENV.locationType
});

Router.map(function(){
	this.resource("trello", function(){ // Transitioned to after Trello authorization
		this.resource("cards", function(){
			this.resource("card", { path: ":card_id" });
		});
	});
});

export default Router;
