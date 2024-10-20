<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PostLike extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable=[
        'user_id',
        'post_id',
        'like_status',
        'total_likes'
    ];

    public function post():BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
    public function user():BelongsTo
    {
        return $this->belongsTo(User::class,'id','user_id');
    }
}
