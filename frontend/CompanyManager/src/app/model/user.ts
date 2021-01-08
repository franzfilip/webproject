import { company } from "./company";
import { role } from "./role";

export class user {
	id: number;
	name: string;
	pw: string;
	roleId: number;
	companyId: number;

	constructor(id?: number, name?: string, pw?: string, roleId?: number, companyId?: number) {
		this.id = id || 0;
		this.name = name || '';
		this.pw = pw || '';
		this.roleId = roleId || 0;
		this.companyId = companyId || 0;
	}
}