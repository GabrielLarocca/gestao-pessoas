import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { FormControl, TextField } from "@material-ui/core";
import Swal from 'sweetalert2';
import router, { useRouter } from 'next/router';

import { getFuncionario, updateFuncionario } from '../../store/ducks/funcionario';

import Loading from '../../components/Loading';

import { formatTelefone } from '../../helpers/utils';
import { validateStoreFuncionario } from '../../helpers/formValidators';

import styles from '../../styles/Login.module.css';

export default function Editar() {
	const route = useRouter();

	const [funcionario, setFuncionario] = useState({});
	const [loading, setLoading] = useState(true);

	const submitFuncionario = (values, setSubmitting) => {
		setSubmitting(true);

		updateFuncionario(route?.query?.id, values).then(() => {
			Swal.fire('Ok!', 'Funcionário editado com sucesso.', 'success');

			router.push('/');
		}).catch(({ response }) => {
			if (response?.data?.errors[0]) return Swal.fire('Ops!', response.data?.errors[0], 'error');
			else return Swal.fire('Ops!', 'Algo deu errado com nossos servidores. Por favor, entre em contato conosco.', 'error');
		}).finally(() => {
			setSubmitting(false);
		});
	};

	useEffect(() => {
		setLoading(true);

		getFuncionario(route?.query?.id).then(({ data }) => {
			console.log(data);
			setFuncionario(data);
		}).catch(({ response }) => {
			console.log(response);
			return Swal.fire('Ops!', 'Algo deu errado ao buscar funcionário. Por favor, entre em contato conosco.', 'error');
		}).finally(() => {
			setLoading(false);
		});
	}, []);

	return (
		<div id='login' className={styles.container}>
			<div className={styles.loginForm}>
				<p className={styles.titleInfo}>Editar</p>

				<Loading loading={loading}>
					<Formik initialValues={{ fun_nome: funcionario?.fun_nome, fun_email: funcionario?.fun_email, fun_telefone: funcionario?.fun_telefone }} validate={values => validateStoreFuncionario(values)} onSubmit={(values, { setSubmitting }) => submitFuncionario(values, setSubmitting)}>
						{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
							<form className={styles.form} onSubmit={handleSubmit}>
								<FormControl fullWidth>
									<TextField className='input' name="fun_nome" label="Nome" margin="normal" variant="filled" onBlur={handleBlur} onChange={handleChange} value={values.fun_nome} helperText={touched.fun_nome && errors.fun_nome} error={Boolean(touched.fun_nome && errors.fun_nome)} />
								</FormControl>

								<FormControl fullWidth>
									<TextField className='input' name="fun_email" label="Email" margin="normal" variant="filled" onBlur={handleBlur} onChange={handleChange} value={values.fun_email} helperText={touched.fun_email && errors.fun_email} error={Boolean(touched.fun_email && errors.fun_email)} />
								</FormControl>

								<FormControl fullWidth>
									<TextField className='input' name="fun_telefone" label="Telefone" margin="normal" inputProps={{ maxLength: 15 }} variant="filled" onBlur={handleBlur} onChange={e => handleChange(formatTelefone(e))} value={values.fun_telefone} helperText={touched.fun_telefone && errors.fun_telefone} error={Boolean(touched.fun_telefone && errors.fun_telefone)} />
								</FormControl>

								<div className={styles.containerButton}>
									<button type="submit" style={{ marginTop: 40 }} className={`${styles.button} primary-button`}>
										{isSubmitting ? <i className='fa fa-spinner fa-spin' /> : 'Salvar'}
									</button>
								</div>
							</form>
						)}
					</Formik>
				</Loading>
			</div>
		</div>
	);
}