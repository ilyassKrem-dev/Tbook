<?php

namespace App\Models\convos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
class Convos extends Model
{
    use HasFactory,HasApiTokens;
    protected $table="convos";
    protected $fillable=[
        "user1",
        "user2",
        "status",
        "status_by",
    ];
}
