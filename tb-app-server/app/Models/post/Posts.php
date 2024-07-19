<?php

namespace App\Models\post;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
class Posts extends Model
{
    use HasFactory,HasApiTokens;
    protected $tabel= "likes";
    protected $fillable=[
        "content",
        "status",
        "user_id",

    ];
}
