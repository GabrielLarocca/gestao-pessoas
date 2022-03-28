module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 12,
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"semi": [2, "always"],
		"no-unused-vars": [0],
		"no-undef": [0],
		"react/prop-types": [0],
		'no-extra-boolean-cast': [0, "always"],
		"react/no-unescaped-entities": [0]
	}
};
