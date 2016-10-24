import uuid from 'node-uuid';

export class Todo {
	constructor(text) {
		this.text = text;
		this.done = false;
		this.id = uuid.v4();
	}
	toggleDone() {
		this.done = !this.done;
	}
}
