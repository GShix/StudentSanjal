<?php

namespace App\Models;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    public function post():BelongsTo
    {
        return $this->belongsTo(Post::class,'id','post_id');
    }
    public function user():BelongsTo
    {
        return $this->belongsTo(User::class,'user_id','id');
    }
}
