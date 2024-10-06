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
        'user_id',
        'post_id',
        'comment',
        'like_status',
        'total_likes',
        'total_comments',
        'total_shares',
    ];

    // protected $casts = [
    //     'comments' => 'array',
    // ];

    public function post():BelongsToMany
    {
        return $this->belongsToMany(Post::class,'id','post_id');
    }
    public function user():BelongsToMany
    {
        return $this->belongsToMany(User::class,'id','user_id');
    }
}
