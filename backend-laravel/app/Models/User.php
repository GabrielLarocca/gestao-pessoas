<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable {

	use HasApiTokens, HasFactory, Notifiable;

	protected $table = "users";
	protected $fillable = [
		'usr_name',
		'email',
		'password',
		'usr_active',
	];
	protected $hidden = [
		'password',
		'remember_token',
	];
}
