import {moveBefore, Dragula} from 'aurelia-dragula';
import {Storage} from '../store';

export class Boxes {
	static inject = [Storage];

	constructor(store) {
		this.boxes = store.boxes;
		console.log(store);
		this.dragula = new Dragula();
	}
	drop(item, x, y, sibling) {
		let a = item.dataset.id;
		let b = sibling ? sibling.dataset.id : null;
		moveBefore(this.boxes, box=>box.id === a, box=>box.id === b);
		// this.todos[a] = this.todos.splice(b, 1, this.todos[a])[0];
	}
}
