import Ember from 'ember';
import AuthorizedRoute from './authorized';

export default AuthorizedRoute.extend({
	model: function(params){
		var appKey = "69ea5c8500ae4ff25ecfdd6e4d92a561";
		var token = this.controllerFor("user").get("token");
		var cardId = params.card_id;

		var cardURL = 'https://trello.com/1/cards/' + cardId + '?key=' + appKey + '&token=' + token;
		var commentURL = 'https://trello.com/1/cards/' + cardId + '/actions?filter=commentCard&key=' + appKey + '&token=' + token;

		return Ember.RSVP.hash({
			card: Ember.$.getJSON(cardURL),
			comments: Ember.$.getJSON(commentURL)
		}).then(
			function(results){
				var card = results.card;
				var comments = results.comments;
				
				card.comments = comments;

				return card;
			}
		);
	}
});
