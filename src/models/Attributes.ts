export class Attributes<T> {
	constructor(private data: T){}

	// Get a record data. Example: 'id', 'name', 'age'
	get = <K extends keyof T>(key: K): T[K] => {
		return this.data[key];
	}

	set(update: T): void {
		Object.assign(this.data, update);
	}

	// Get all record data
	getAll(): T {
		return this.data;
	}
}
