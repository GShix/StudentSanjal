<?php

namespace App\Models;

use App\Models\SavedPost;
use App\Models\ConnectionCircle;
use Illuminate\Http\UploadedFile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'post_description',
        'post_like_count',
        'post_comment_count',
        'comments',
        'media',
        'job',
        'event'
    ];

    /**
     * The user that owns the post.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function postInteractions(): HasMany
    {
        return $this->hasMany(PostInteraction::class);
    }

    public function postLike(): HasMany
    {
        return $this->hasMany(PostLike::class);
    }

    public function savedPosts(): HasMany
    {
        return $this->hasMany(SavedPost::class);
    }

    public function postComment(): HasMany
    {
        return $this->hasMany(PostComment::class);
    }

    public function connectionCircle(): BelongsTo
    {
        return $this->belongsTo(ConnectionCircle::class);
    }

    /**
     * Get the URL for the media.
     *
     * @return string
     */
    public function getMediaAttribute(): string
    {
        return $this->attributes['media']
            ? Storage::url($this->attributes['media'])
            : '';
    }

    /**
     * Set the media attribute.
     *
     * @param  mixed  $value
     * @return void
     */
    public function setMediaAttribute($value): void
    {
        if ($value instanceof UploadedFile) {
            $this->attributes['media'] = $value->store('posts', 'public');
        } elseif (is_string($value)) {
            $this->attributes['media'] = $value;
        }
    }
}
