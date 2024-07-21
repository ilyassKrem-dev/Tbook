<?php

namespace App\Models\post;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
class Comment extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = "comments";
    protected $fillable = [
        "user_id",
        "parent_id",
        "post_id",
        "content"
    ];
}
