<?php

namespace App\Models;

use Illuminate\Http\UploadedFile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EventRegister extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable =[
        'user_id',
        'event_id',
        'full_name',
        'email',
        'phone',
        'payment_screenshoot',
    ];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class,'id','user_id');
    }

    public function setPaymentScreenshootAttribute($value): void
    {
        if ($value instanceof UploadedFile) {
            $this->attributes['payment_screenshoot'] = $value->store('events/payement', 'public');
        } elseif (is_string($value)) {
            $this->attributes['payment_screenshoot'] = $value;
        }
    }

    public function getPaymentScreenshootAttribute(): string
    {
        return $this->attributes['payment_screenshoot']
            ? asset('storage/' . $this->attributes['payment_screenshoot'])
            : asset('assets/img/default_banner.png');
    }

}
