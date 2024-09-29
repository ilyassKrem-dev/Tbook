<?php

namespace App\Models\post;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\post\Medias;
use App\Models\post\Likes;
use Laravel\Sanctum\HasApiTokens;
class Posts extends Model
{
    use HasFactory,HasApiTokens;
    protected $table= "posts";
    protected $fillable=[
        "content",
        "status",
        "user_id",
        "parent_post"

    ];
  
}
