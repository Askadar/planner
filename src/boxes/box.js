export class Box {
	constructor(box) {
		this.header = box.header;
		this.height = box.height;
		this.size = box.size;
		this.class = box.class ? box.class : 'myTab';
	}
}
