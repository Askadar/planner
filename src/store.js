import {Todo} from './todos/todo';

export class Storage {
	constructor() {
		this.store = {
			todos: [new Todo('Zaggu'), new Todo('zangos')]
		};
	}
	get todos() {return this.store.todos;}
	//set todos(todos) {this.store.todos = todos;}
}
