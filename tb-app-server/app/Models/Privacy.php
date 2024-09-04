<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
class Privacy extends Model
{
    use HasFactory,HasApiTokens;
    protected $table="privacy";
    protected $fillable=[
        "user",
        "posts",
        "search",
        "notification"
    ];
}
