<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = [
        "id",
        "email",
        "password",
    ];
    public static $rules = [
        "email" => "required|max:120",
        "password" => "required|max:120",
    ];
}
