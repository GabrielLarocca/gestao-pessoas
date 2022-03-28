import router from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../store/ducks/user';

export function HeaderAuth() {
	const { user } = useSelector(({ user }) => user);
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(setLogout());

		router.push(`/`);
	};

	return (
		<nav className="navbar navbar-expand-lg">
			<div className="container">
				<ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex flex-row">
					<li className="nav-item">
						<a className="nav-link menuItem">Olá {user?.usr_name}</a>
					</li>

					<li className="nav-item" onClick={logout}>
						<a className="nav-link menuItem pointer">
							<red className="hover">Sair</red>
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}