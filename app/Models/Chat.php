<?php

namespace App\Models;

use Illuminate\Http\UploadedFile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Chat extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'connection_id',
        'sender_id',
        'receiver_id',
        'text_field',
        'media',
        'like',
    ];

    /**
     * The attributes that should have default values.
     *
     * @var array
     */
    protected $attributes = [
        'like' => false,
    ];

    /**
     * Define the sender relationship.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    /**
     * Define the receiver relationship.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    /**
     * Accessor for the media attribute.
     *
     * @return string
     */
    public function getMediaAttribute(): string
    {
        return isset($this->attributes['media']) && $this->attributes['media']
            ? Storage::url($this->attributes['media'])
            : '';
    }

    /**
     * Mutator for the media attribute.
     *
     * @param mixed $value
     * @return void
     */
    public function setMediaAttribute($value): void
    {
        if ($value instanceof UploadedFile) {
            $this->attributes['media'] = $value->store('chat/media', 'public');
        } elseif (is_string($value)) {
            $this->attributes['media'] = $value;
        } else {
            $this->attributes['media'] = null;
        }
    }

    /**
     * Scope: Retrieve chats between two users.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $userId1
     * @param int $userId2
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeBetween($query, int $userId1, int $userId2)
    {
        return $query->where(function ($query) use ($userId1, $userId2) {
            $query->where('sender_id', $userId1)
                  ->where('receiver_id', $userId2);
        })->orWhere(function ($query) use ($userId1, $userId2) {
            $query->where('sender_id', $userId2)
                  ->where('receiver_id', $userId1);
        });
    }

    /**
     * Scope: Retrieve chats for a specific connection.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $connectionId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForConnection($query, int $connectionId)
    {
        return $query->where('connection_id', $connectionId);
    }
}
