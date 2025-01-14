<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'user_id',
        'event_image',
        'title',
        'description',
        'host_image',
        'host',
        'start_date',
        'end_date',
        'attendees',
        'entry_type',
        'entry_fee',
        'event_type',
        'address',
        'venue',
        'external_event_link',
        'event_status'
    ];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class,'id','user_id');
    }

    public function setEventImageAttribute($value): void
    {
        if ($value instanceof UploadedFile) {
            $this->attributes['event_image'] = $value->store('events', 'public');
        } elseif (is_string($value)) {
            $this->attributes['event_image'] = $value;
        }
    }

    public function getEventImageAttribute(): string
    {
        return $this->attributes['event_image']
            ? asset('storage/' . $this->attributes['event_image'])
            : asset('assets/img/default_banner.png');
    }

    public function setHostImageAttribute($value): void
    {
        if ($value instanceof UploadedFile) {
            $this->attributes['host_image'] = $value->store('events', 'public');
        } elseif (is_string($value)) {
            $this->attributes['host_image'] = $value;
        }
    }

    public function getHostImageAttribute(): string
    {
        return $this->attributes['host_image']
            ? asset('storage/' . $this->attributes['host_image'])
            : asset('assets/img/default_banner.png');
    }

}
