import Link from 'next/link';
import React from 'react';

export function HeaderNoAuth() {
	return (
		<nav className="navbar navbar-expand-lg">
			<div className="container">
				<ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex flex-row">
					<li className="nav-item">
						<Link href={'/register'}>
							<a className="nav-link menuItem pointer">Registro</a>
						</Link>
					</li>

					<li className="nav-item">
						<Link href={'/login'}>
							<a className="nav-link menuItem pointer">
								<red className="hover">Login</red>
							</a>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}