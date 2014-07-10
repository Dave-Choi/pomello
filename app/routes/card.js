import Ember from 'ember';
import AuthorizedRoute from './authorized';

export default AuthorizedRoute.extend({
	model: function(params){
		var token = this.controllerFor("user").get("token");
		var cardId = params.card_id;
		return Ember.$.getJSON('https://trello.com/1/cards/' + cardId + '?key=69ea5c8500ae4ff25ecfdd6e4d92a561&token=' + token).then(function(card){
			return Ember.$.getJSON('https://trello.com/1/cards/' + cardId + '/actions?filter=commentCard&key=69ea5c8500ae4ff25ecfdd6e4d92a561&token=' + token).then(function(comments){
				card.comments = comments;
				return card;
			});
		});
	}
});
