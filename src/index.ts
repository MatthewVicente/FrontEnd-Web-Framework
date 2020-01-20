import { User } from './models/User';

const user = new User({ name: 'myname', age: 20 });

user.on('change', () => {
	console.log("Change #1");
});
user.on('click', () => {
	console.log("Click #1");
});

user.trigger('change');
