<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model {

	protected $table = "funcionarios";
	protected $fillable = [
		'fun_nome',
		'fun_email',
		'fun_telefone',
	];
}
