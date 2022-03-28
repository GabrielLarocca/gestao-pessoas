import React, { useState } from 'react';
import { Formik } from 'formik';
import { FormControl, InputAdornment, TextField } from "@material-ui/core";
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import router from 'next/router';

import { validateLogin } from '../helpers/formValidators';
import { login, userLogged } from '../store/ducks/user';

import styles from '../styles/Login.module.css';

export default function Login() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const [showPassword, setShowPassword] = useState(false);

	const submitLogin = (values, setSubmitting) => {
		setSubmitting(true);

		login(values).then(({ data }) => {
			localStorage.setItem('authToken', data.token);
			data.isLogged = true;

			router.push(`/`);

			dispatch(userLogged(data));
		}).catch(({ response }) => {
			if (response?.data?.errors[0]) {
				Swal.fire('Ops!', response.data?.errors[0], 'error');
			} else {
				return Swal.fire('Ops!', 'Algo deu errado com nossos servidores. Por favor, entre em contato conosco.', 'error');
			}
		}).finally(() => {
			setSubmitting(false);
		});
	};

	return (
		<div id='login' className={styles.container}>
			<div className={styles.loginForm}>
				<p className={styles.titleInfo}>Entrar</p>

				<Formik initialValues={{ email: '', password: '' }} validate={values => validateLogin(values)} onSubmit={(values, { setSubmitting }) => submitLogin(values, setSubmitting)}>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
						<form className={styles.form} onSubmit={handleSubmit}>
							<FormControl fullWidth>
								<TextField className='input' name="email" label="Email" margin="normal" variant="filled" onBlur={handleBlur} onChange={handleChange} value={values.email} helperText={touched.email && errors.email} error={Boolean(touched.email && errors.email)} />
							</FormControl>

							<FormControl fullWidth>
								<TextField className='input' name="password" label="Senha" margin="normal" type={showPassword ? 'text' : 'password'} variant="filled" onBlur={handleBlur} onChange={handleChange} value={values.password} helperText={touched.password && errors.password} error={Boolean(touched.password && errors.password)} InputProps={{
									endAdornment: (
										<InputAdornment onClick={() => setShowPassword(!showPassword)} style={{ width: 40, height: 40 }} position="end" className='d-flex justify-content-center'>
											<i className={showPassword ? 'fa fa-eye-slash' : "fa fa-eye"} style={{ color: '#8C959B' }} />
										</InputAdornment>
									)
								}} />
							</FormControl>

							<div className={styles.containerButton}>
								<button type="submit" style={{ marginTop: 40 }} className={`${styles.button} primary-button`}>
									{isSubmitting ? <i className='fa fa-spinner fa-spin' /> : 'Entrar'}
								</button>
							</div>

							<p className={styles.textCreateAccount}>
								Ainda não tem uma conta?
								<Link href={`/register`}>Cadastre-se</Link>
							</p>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
}