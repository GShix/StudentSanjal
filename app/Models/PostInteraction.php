<?php

namespace App\Models;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class PostInteraction extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'post_id',
        'user_id',
        'total_like'
    ];

    public function post():BelongsToMany
    {
        return $this->belongsToMany(Post::class);
    }
    public function user():BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
