export class role {
	id: number;
	type: number;

	constructor(id?: number, type?: number) {
		this.id = id || 0;
		this.type = type || 0;
	}
}