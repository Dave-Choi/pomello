import Ember from 'ember';

export default Ember.ArrayController.extend({
	itemController: "card",
	filterString: "",
	filterExpression: function(){
		return new RegExp(this.get("filterString"));
	}.property("filterString"),

	searchTargets: [
		"name",
		"desc",
		"board.name"
	],

	filtered: function(){
		return this.filter(function(card){
			var filterExpression = this.get("filterExpression");
			var targets = this.get("searchTargets");

			var targetProperties = targets.map(function(targetName){
				return card.get(targetName);
			}).join(" "); // This just makes one string to test per card

			return filterExpression.test(targetProperties);
		}.bind(this));
	}.property("model.@each", "filterExpression")
});
