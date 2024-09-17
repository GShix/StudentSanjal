<?php

namespace App\Models;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ConnectionCircle extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable =[
        'user_id',
        'follwing',
        'followers',
        'friends',
        'unfollowed',
        'blocked'
    ];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function posts():HasMany
    {
        return $this->hasMany(Post::class);
    }
}
