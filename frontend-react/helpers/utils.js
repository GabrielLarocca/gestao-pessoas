
export const formatTelefone = input => {
	let value = input.target.value;

	value = value.replace(/\D/g, "");
	value = value.replace(/(\d{0})(\d)/, "$1($2");
	value = value.replace(/(\d{2})(\d)/, "$1) $2");
	value = value.replace(/(\d{1})(\d{1,4})$/, "$1-$2");

	input.target.value = value;

	return input;
};
