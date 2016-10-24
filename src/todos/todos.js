import {Todo} from './todo';
import {moveBefore, Dragula} from 'aurelia-dragula';
import {Storage} from '../store';

export class Todos {
	static inject = [Storage];

	constructor(store) {
		this.header = 'stringy';
		this.todos = store.todos;
		this.text = '';
		this.dragula = new Dragula();
	}
	addTodo() {
		this.text = this.text.trim();
		if (this.text !== '') {
			this.todos.push(new Todo(this.text));
			this.text = '';
		}
	}
	removeTodo(todo) {
		this.todos = this.todos.filter(td=>td === todo);
	}
	toggleTodo(todo) {
		let i = this.todos.indexOf(todo);
		this.todos[i].done = !this.todos[i].done;
	}
	drop(item, target, source, sibling, itemVM, siblingVM) {
		let a = item.dataset.id;
		let b = sibling ? sibling.dataset.id : null;
		moveBefore(this.todos, todo=>todo.id === a, todo=>todo.id === b);
		// this.todos[a] = this.todos.splice(b, 1, this.todos[a])[0];
	}
}
