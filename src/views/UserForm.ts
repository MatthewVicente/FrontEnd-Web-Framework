import { User } from '../models/User';

export class UserForm {
	constructor(public parent: Element, public model: User) {
		this.model.on('change', () => {
			this.bindModel();
		});
	}

	bindModel(): void {
		this.model.on('change', () => {
			this.render();
		})
	}

	// Map events that will be binded to HTML using the structure event_name:element
	eventsMap(): { [key: string]: () => void } {
		return {
			'click:#set-age': this.onSetAgeClick,
			'click:#set-name': this.onSetNameClick
		}
	}

	onSetNameClick = (): void => {
		const input = this.parent.querySelector('input');

		if (input) {
			const name = input.value;

			this.model.set({ name });
		}

	}

	onSetAgeClick = (): void => {
		this.model.setRandomAge();
	}

	// Generate html that will be renderer
	template(): string {
		return `
			<div>
				<h1>User Form</h1>
				<div>User name: ${this.model.get('name')}</div>
				<div>User age: ${this.model.get('age')}</div>
				<input />
				<button id="set-name">Change Name</button>
				<button id="set-age">Set Random Age</button>
			</div>
		`
	}

	// Bind events from EventMap to the elements defined
	bindEvents(fragment: DocumentFragment): void {
		const eventsMap = this.eventsMap();

		for (let eventkey in eventsMap) {
			const [eventName, selector] = eventkey.split(':');

			fragment.querySelectorAll(selector).forEach(element => {
				element.addEventListener(eventName, eventsMap[eventkey]);
			});
		}

	}

	// Render template and run bindEvents()
	render(): void {
		this.parent.innerHTML = '';

		const templateElement = document.createElement('template');
		templateElement.innerHTML = this.template();

		this.bindEvents(templateElement.content);

		this.parent.append(templateElement.content);
	}
}
