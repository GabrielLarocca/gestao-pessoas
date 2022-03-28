<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Web\AuthController;
use App\Http\Controllers\Web\FuncionarioController;

/*
  |--------------------------------------------------------------------------
  | API Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register API routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | is assigned the "api" middleware group. Enjoy building your API!
  |
 */

Route::group(['prefix' => 'web'], function () {
	Route::post('/login', [AuthController::class, 'auth']);
	Route::post('/register', [AuthController::class, 'register']);

	Route::group(['prefix' => 'funcionario'], function () {
		Route::get('/list', [FuncionarioController::class, 'list']);
	});

	Route::group(['middleware' => ['auth:sanctum', 'user']], function () {
		Route::group(['prefix' => 'funcionario'], function () {
			Route::post('/', [FuncionarioController::class, 'store']);
			Route::get('/{id}', [FuncionarioController::class, 'get']);
			Route::post('/{id}', [FuncionarioController::class, 'update']);
			Route::delete('/{id}', [FuncionarioController::class, 'delete']);
		});
	});
});
