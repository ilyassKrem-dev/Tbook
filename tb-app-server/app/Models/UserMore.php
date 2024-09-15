<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
class UserMore extends Model
{
    use HasFactory,HasApiTokens;
    protected $table="user_more";
    protected $fillable=["user","work","school","city",'website',"language","country"];
}
