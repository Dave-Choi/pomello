import { test, moduleFor } from 'ember-qunit';
import TrelloMock from 'pomello/tests/helpers/trello-mock';

moduleFor('controller:user', 'UserController', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  setup: function(){
  	TrelloMock.setupTrello();
  },
  teardown: function(){
  	TrelloMock.teardownTrello();
  }
});

// Replace this with your real tests.
test('it exists', function() {
  var controller = this.subject();
  ok(controller);
});
