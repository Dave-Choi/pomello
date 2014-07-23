import Ember from 'ember';
import ProgressDonut from './progress-donut';

export default ProgressDonut.extend({
	classNameBindings: ["isTiming:pulse"]
});
