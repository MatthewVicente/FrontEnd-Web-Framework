import { UserForm } from './views/UserForm';
import { User } from './models/User';

const userForm = new UserForm(
	document.getElementById('root'),
	User.buildUser({ name: 'Thor', age: 1220 })
);

userForm.render();
