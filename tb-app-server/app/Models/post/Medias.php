<?php

namespace App\Models\post;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
class Medias extends Model
{
    use HasFactory,HasApiTokens;
    protected $table= "medias";
    protected $fillable=[
        "url",
        "type",
        "user_id",
        "post_id",

    ];
}
