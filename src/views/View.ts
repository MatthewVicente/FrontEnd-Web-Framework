import { User } from '../models/User';

export abstract class View {
	constructor(public parent: Element, public model: User) {
		this.model.on('change', () => {
			this.bindModel();
		});
	}

	// Map events that will be binded to HTML using the structure event_name:element
	abstract eventsMap(): { [key:string]: () => void };

	// Generate html that will be renderer
	abstract template(): string;

	bindModel(): void {
		this.model.on('change', () => {
			this.render();
		})
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
