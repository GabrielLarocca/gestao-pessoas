/* eslint-disable no-useless-escape */
export const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const regexURL = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

export const createFormikValidation = (formMap, values) => {
	const errors = {};

	for (let [key, value] of formMap) {
		if (!values[key]) {
			errors[key] = value + " é obrigatório.";
		} else if (key === 'password' && values[key].length < 6) {
			errors[key] = "Use pelo menos 6 caracteres";
		} else if (key === 'email' && !regexEmail.test(values[key])) {
			errors[key] = "O e-mail informado é invalido.";
		}
	}

	return errors;
};

export const validateLogin = values => {
	let map = new Map();

	map.set('email', 'E-mail');
	map.set('password', 'Senha');

	let errors = createFormikValidation(map, values);

	return errors;
};

export const validateRegister = (values) => {
	let map = new Map();

	map.set('email', 'E-mail');
	map.set('password', 'Senha');
	map.set('usr_name', 'Nome');

	let errors = createFormikValidation(map, values);

	return errors;
};

export const validateStoreFuncionario = (values) => {
	let map = new Map();

	map.set('fun_nome', 'Nome');
	map.set('fun_email', 'E-mail');
	map.set('fun_telefone', 'Telefone');

	let errors = createFormikValidation(map, values);

	return errors;
};
