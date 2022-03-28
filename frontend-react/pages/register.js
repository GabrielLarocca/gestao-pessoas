import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import Link from 'next/link';
import { FormControl, InputAdornment, TextField } from "@material-ui/core";
import { useMediaQuery } from 'react-responsive';
import Swal from 'sweetalert2';
import router from 'next/router';
import { useSelector, useDispatch } from "react-redux";

import { validateRegister } from '../helpers/formValidators';
import { userLogged, register } from '../store/ducks/user';

import styles from '../styles/Register.module.css';

export default function Register() {
	const [showPassword, setShowPassword] = useState(false);

	const dispatch = useDispatch();
	const { user } = useSelector(({ user }) => user);

	useEffect(() => {
		if (user) router.push(`/`);
	}, []);

	const submitRegister = (values, setSubmitting) => {
		setSubmitting(true);

		register(values).then(({ data }) => {
			localStorage.setItem('authToken', data.token);
			data.isLogged = true;

			dispatch(userLogged(data));

			router.push(`/`);
		}).catch(({ response }) => {
			return Swal.fire('Ops!', 'Algo deu errado com nossos servidores. Por favor, entre em contato conosco.', 'error');
		}).finally(() => {
			setSubmitting(false);
		});
	};

	const getInitialValues = {
		usr_name: '',
		email: '',
		password: ''
	};

	return (
		<div id='registro' className={styles.container}>
			<div className={styles.registerForm}>
				<p className={styles.titleInfo}>Cadastrar</p>

				<Formik initialValues={getInitialValues} validate={values => validateRegister(values)} onSubmit={(values, { setSubmitting }) => submitRegister(values, setSubmitting)}>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
						<form noValidate={true} autoComplete="off" className={styles.form} onSubmit={handleSubmit}>
							<FormControl fullWidth>
								<TextField className='input' name="usr_name" label="Nome *" margin="normal" variant="filled"
									onChange={handleChange} value={values.usr_name} helperText={touched.usr_name && errors.usr_name}
									onBlur={handleBlur} error={Boolean(touched.usr_name && errors.usr_name)} />
							</FormControl>

							<FormControl fullWidth>
								<TextField className='input' name="email" label="Email *" margin="normal" variant="filled"
									onChange={handleChange} value={values.email} helperText={touched.email && errors.email}
									onBlur={handleBlur} error={Boolean(touched.email && errors.email)} />
							</FormControl>

							<FormControl fullWidth>
								<TextField className='input' name="password" label="Senha *" margin="normal" type={showPassword ? 'text' : 'password'} variant="filled" onBlur={handleBlur} onChange={handleChange} value={values.password} helperText={touched.password && errors.password} error={Boolean(touched.password && errors.password)} InputProps={{
									endAdornment: (
										<InputAdornment onClick={() => setShowPassword(!showPassword)} style={{ width: 40, height: 40 }} position="end" className='d-flex justify-content-center'>
											<i className={showPassword ? 'fa fa-eye-slash' : "fa fa-eye"} style={{ color: '#8C959B', cursor: 'pointer' }} />
										</InputAdornment>
									)
								}} />
							</FormControl>

							<button type="submit" className={`${styles.button} primary-button`}>
								{isSubmitting ? <i className='fa fa-spinner fa-spin' /> : 'Cadastrar'}
							</button>

							<p className={styles.textCreateAccount}>
								Já tem uma conta? <Link href={`/login`}>Entre</Link>
							</p>
						</form>
					)}
				</Formik>
			</div >
		</div>
	);
}