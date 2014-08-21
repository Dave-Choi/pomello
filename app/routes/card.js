import Ember from 'ember';
import AuthorizedRoute from './authorized';

export default AuthorizedRoute.extend({
	model: function(params){
		/*
			The card result returned by the Trello server doesn't include
			references to its commments, so these are fetched together,
			and folded in.

			The Pomello application doesn't save cards, just creates and edits
			card comments, so there aren't issues with rejected card saves from
			the server that complain about included comment ids.
		*/
		return Ember.RSVP.hash({
			card: this.store.find("card", params.card_id),
			comments: this.store.find("comment", { card: params.card_id })
		}).then(function(hash){
			return hash.card.get("comments").then(function(comments){
				comments.addObjects(hash.comments);
				return hash.card;
			});
		});
	},

	actions: {
		resetCommentForm: function(){
			this.controllerFor("timer").send("resetCommentForm");
		}
	}
});
