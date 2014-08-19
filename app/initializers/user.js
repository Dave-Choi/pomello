export default {
	name: 'user',

	initialize: function(container, app) {
		app.inject('adapter', 'user', 'controller:user');
	}
};
