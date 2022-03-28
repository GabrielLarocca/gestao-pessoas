import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { Table } from 'react-bootstrap';
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import { deleteFuncionario, listFuncionarios } from "../store/ducks/funcionario";

import { HeaderNoAuth } from "../components/HeaderNoAuth";
import { HeaderAuth } from "../components/HeaderAuth";

import xicoriaBanner from '/public/images/xicoria.png';

export default function Index() {
	const { user } = useSelector(({ user }) => user);

	const [funcionarios, setFuncionarios] = useState([]);

	const handleDelete = (id) => {
		deleteFuncionario(id).then(({ data }) => {
			Swal.fire('Ok!', 'Funcionário removido com sucesso.', 'success');

			handleListFuncionarios();
		}).catch(({ response }) => {
			return Swal.fire('Ops!', 'Não foi possivel remover o funcionário.', 'error');
		});
	};

	const handleListFuncionarios = () => {
		listFuncionarios().then(({ data }) => {
			setFuncionarios(data);
		}).catch(({ response }) => {
			return Swal.fire('Ops!', 'Não foi possivel listar os funcionários.', 'error');
		});
	};

	useEffect(() => {
		handleListFuncionarios();
	}, []);

	return (
		<>
			<section className="banner">
				{user ?
					<HeaderAuth />
					:
					<HeaderNoAuth />
				}

				<div className="container pt-5 pb-0">
					<div className="row align-items-center">
						<div className="col-md-6 col-sm-12 p-5">
							<h1 className="heading">
								Gestão de pessoas <br /> Grupo <red> MM </red>
							</h1>

							<h2 className="subHeading h6">
								Gestão de pessoas que <br /> trabalham aqui!
							</h2>

							{!user &&
								<Link href={'/login'}>
									<button className="btn buttonPrincipal mt-3">Entrar agora</button>
								</Link>
							}
						</div>

						<div className="col-md-6 col-sm-12 p-0">
							<Image width={524} height={516} src={xicoriaBanner} className="img-fluid" alt="logo" />
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="container p-5 mt-3">
					<div className="col mb-5">
						<div className="d-md-flex d-block justify-content-between">
							<div>
								<h3 className="pe-5 heading">Nossos colaboradores</h3>

								<p className="subHeading">Entre colaboradores terceiros, sócios, funcionários...</p>
							</div>

							<div>
								{user && (
									<Link href={'/funcionario/adicionar'}>
										<button className="btn btn-success">
											Adicionar
										</button>
									</Link>
								)}
							</div>
						</div>
					</div>

					{funcionarios.length > 0 ? (
						<div className="row justify-content-center">
							<Table striped bordered hover responsive>
								<thead>
									<tr>
										<th>#</th>
										<th>Nome</th>
										<th>Email</th>
										<th>Telefone</th>
										{user && (<th>Ações</th>)}
									</tr>
								</thead>

								<tbody>
									{funcionarios?.map((funcionario, index) => (
										<tr key={index}>
											<td>{funcionario?.id}</td>
											<td>{funcionario?.fun_nome}</td>
											<td>{funcionario?.fun_email}</td>
											<td>{funcionario?.fun_telefone}</td>
											{user && (
												<td>
													<Link href={`/funcionario/${funcionario?.id}`}>
														<button className="btn btn-success btn-table-action">
															<i className="fa fa-edit" />
														</button>
													</Link>

													<button onClick={() => handleDelete(funcionario?.id)} className="btn btn-danger btn-table-action">
														<i className="fas fa-trash-alt" />
													</button>
												</td>
											)}
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					) :
						<p>Ainda não temos colaboradores :(</p>
					}
				</div>
			</section>
		</>
	);
}