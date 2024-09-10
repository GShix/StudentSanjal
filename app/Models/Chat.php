<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
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
}
