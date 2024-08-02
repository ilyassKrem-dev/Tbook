<?php

namespace App\Models\convos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
class Messages extends Model
{
    use HasFactory,HasApiTokens;
    protected $table="messages";
    protected $fillabel=[
        "convo_id",
        "sender",
        "receiver",
        "reaction",
        "content"
    ];
}
