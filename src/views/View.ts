import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K> {
	regions: { [key: string]: Element } = {};

	constructor(public parent: Element, public model: T) {
		this.bindModel();
	}

	regionsMap(): { [key: string]: string } {
		return {};
	}

	// Map events that will be binded to HTML using the structure event_name:element
	eventsMap(): { [key:string]: () => void } {
		return {};
	};

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

	mapRegions(fragment: DocumentFragment): void {
		const regionsMap = this.regionsMap();

		for (let key in regionsMap) {
			const selector = regionsMap[key];
			const element = fragment.querySelector(selector);

			if (element) {
				this.regions[key] = element;
			}
		}
	}

	onRender(): void {

	}

	// Render template and run bindEvents()
	render(): void {
		this.parent.innerHTML = '';

		const templateElement = document.createElement('template');
		templateElement.innerHTML = this.template();

		this.bindEvents(templateElement.content);
		this.mapRegions(templateElement.content);

		this.onRender();

		this.parent.append(templateElement.content);
	}
}
