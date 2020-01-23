import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

// Generic structure to define a collection from different types of data
export class Collection<T, K> {
	models: T[] = [];
	events: Eventing = new Eventing();

	constructor(
		public rootUrl: string,
		public deserialize: (json: K) => T
	) {}

	get on() {
		return this.events.on;
	}

	get trigger() {
		return this.events.trigger;
	}

	// Generate a new collection from T type
	fetch(): void {
		axios.get(this.rootUrl)
			.then((response: AxiosResponse) => {
				response.data.forEach((value: K) => {
					this.models.push(this.deserialize(value));
				});

				this.trigger('change');
			}
		);
	}
}
