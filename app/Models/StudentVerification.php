<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StudentVerification extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable =[
        'user_id',
        'id_card_photo',
        'expires_on',
        'status'
    ];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
