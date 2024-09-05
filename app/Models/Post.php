<?php

namespace App\Models;

use Illuminate\Http\UploadedFile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'post_description',
        'post_love_count',
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
