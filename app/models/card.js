import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	dateLastActivity: DS.attr("date"),
	due: DS.attr("date"),

	desc: DS.attr("string"),
	description: Ember.computed.alias("desc"),

	name: DS.attr("string"),
	shortURL: DS.attr("string"),

	board: DS.belongsTo("board"),
	commentCount: DS.attr("number"),
	comments: DS.hasMany("comment", { async: true })
});
