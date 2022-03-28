import { Constants } from '../../helpers/constants';
import axios from 'axios';

export const listFuncionarios = () => {
	return axios.get(`${Constants.baseUrl}/funcionario/list`);
};

export const storeFuncionario = (form) => {
	return axios.post(`${Constants.baseUrl}/funcionario/`, form);
};

export const getFuncionario = id => {
	return axios.get(`${Constants.baseUrl}/funcionario/${id}`);
};

export const updateFuncionario = (id, form) => {
	return axios.post(`${Constants.baseUrl}/funcionario/${id}`, form);
};

export const deleteFuncionario = id => {
	return axios.delete(`${Constants.baseUrl}/funcionario/${id}`);
};
