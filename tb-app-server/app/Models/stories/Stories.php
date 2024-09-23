<?php

namespace App\Models\stories;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Stories extends Model
{
    use HasFactory,HasApiTokens;
    protected $table="stories";
    protected $fillable=[
        "user",
        "parentId",
        "text",
        "media",
        "type",
        "bgColor",
        "visibility"
    ];
    public function user(): BelongsTo {
        return $this->belongsTo(User::class,"user");
    }
}
