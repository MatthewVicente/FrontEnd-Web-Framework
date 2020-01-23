type Callback = () => void;

export class Eventing {
	events: { [key: string]: Callback[] } = {};

	// Define new event and bind it to the record
	on = (eventName: string, callback: Callback): void => {
		const handlers = this.events[eventName] || [];
		handlers.push(callback);
		this.events[eventName] = handlers;
	}

	// Trigger the event binded to the record
	trigger = (eventName: string): void => {
		const handlers = this.events[eventName];

		if (!handlers || handlers.length === 0) {
			return;
		}

		handlers.forEach(callback => {
			callback();
		})
	}
}
