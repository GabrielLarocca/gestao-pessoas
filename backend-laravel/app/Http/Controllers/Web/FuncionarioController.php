<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

use App\Models\Funcionario;

class FuncionarioController extends Controller {

	public function store(Request $request) {
		$errors = array();

		$validator = Validator::make($request->all(), [
			'fun_nome' => 'required|max:255',
			'fun_email' => 'required|email',
			'fun_telefone' => 'required|max:255',
		]);

		if ($validator->fails()) {
			foreach ($validator->errors()->getMessages() as $item) {
				array_push($errors, $item[0]);
			}

			return response()->json(['errors' => $errors], 422);
		}

		$obj = new Funcionario;

		$obj->fun_nome = $request->fun_nome;
		$obj->fun_email = $request->fun_email;
		$obj->fun_telefone = $request->fun_telefone;

		$obj->save();

		return response()->json($obj);
	}

	public function update(Request $request, $id) {
		$errors = array();

		$validator = Validator::make($request->all(), [
			'fun_nome' => 'required|max:255',
			'fun_email' => 'required|email',
			'fun_telefone' => 'required|max:255',
		]);

		if ($validator->fails()) {
			foreach ($validator->errors()->getMessages() as $item) {
				array_push($errors, $item[0]);
			}

			return response()->json(['errors' => $errors], 422);
		}

		$obj = Funcionario::where(['id' => $id])->firstOrFail();

		$obj->fun_nome = $request->fun_nome;
		$obj->fun_email = $request->fun_email;
		$obj->fun_telefone = $request->fun_telefone;

		$obj->save();

		return response()->json($obj);
	}

	public function list(Request $request) {
		return response()->json(Funcionario::orderBy('created_at', 'desc')->get());
	}

	public function get(Request $request, $id) {
		return response()->json(Funcionario::where(["id" => $id])->firstOrFail());
	}

	public function delete(Request $request, $id) {
		$funcionario = Funcionario::where(['id' => $id])->firstOrFail();
		$funcionario->delete();

		return response(null, 200);
	}
}
