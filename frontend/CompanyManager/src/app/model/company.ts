import { product } from "./product";

export class company {
	id: number;
	name: string;
	products: product[];

	constructor(id?: number, name?: string, products?: product[]) {
		this.id = id || 0;
		this.name = name || '';
		this.products = products || null;
	}
}