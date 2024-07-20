<?php

namespace App\Models\post;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
class Likes extends Model
{
    use HasFactory,HasApiTokens;
    protected $table= "likes";
    protected $fillable=[
        "user_id",
        "post_id",

    ];
}
