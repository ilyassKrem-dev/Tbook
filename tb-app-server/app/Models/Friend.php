<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
class Friend extends Model
{
    use HasFactory,HasApiTokens;

    protected $table = "friends";
    protected $fillable = [
        "user",
        "friend",
        "status",
        "status_by"
    ];
}
