import {Todo} from './todos/todo';
import {Box} from './boxes/box';

export class Storage {
	constructor() {
		this.store = {
			todos: [new Todo('Zaggu'), new Todo('zangos')],
			boxes: [
				new Box({size: 12, height: 8, header: "today I'm grateful for"}),
				new Box({size: 12, height: 8, header: "daily goals"}),
				new Box({size: 4, height: 8, header: "breakfast"}),
				new Box({size: 4, height: 8, header: "lunch"}),
				new Box({size: 4, height: 8, header: "dinner"}),
				new Box({size: 12, height: 6, header: "water", class: "water-container"}),
				new Box({size: 12, height: 6, header: "snacks"}),
				new Box({size: 6, height: 6, header: "fitness"}),
				new Box({size: 6, height: 6, header: "mood"})
			]
		};
	}
	get todos() {return this.store.todos;}
	get boxes() {return this.store.boxes;}
	//set todos(todos) {this.store.todos = todos;}
}
