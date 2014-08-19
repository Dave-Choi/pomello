import DS from 'ember-data';

export default DS.Model.extend({
	text: DS.attr("string"),

	card: DS.belongsTo("card"),
	creator: DS.belongsTo("member")
});
