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

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'text_field',
        'media',
        'like'
    ];

    public function sender():BelongsTo
    {
        return $this->belongsTo(User::class,'sender_id');
    }
    public function receiver():BelongsTo
    {
        return $this->belongsTo(User::class,'receiver_id');
    }


    public function getMediaAttribute(): string
    {
        return isset($this->attributes['media']) && $this->attributes['media']
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
            $this->attributes['media'] = $value->store('chat/media', 'public');
        } elseif (is_string($value)) {
            $this->attributes['media'] = $value;
        }
    }
}
