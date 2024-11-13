<?php

namespace App\Models;

use Illuminate\Http\UploadedFile;
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

    public function getIdCardPhotoAttribute(): string
    {
        return $this->attributes['id_card_photo']
            ? asset('storage/' . $this->attributes['id_card_photo'])
            : asset('assets/img/default_user.png');
    }

    /**
     * Set the profile image attribute.
     *
     * @param  mixed  $value
     * @return void
     */
    public function setIdCardPhotoAttribute($value): void
    {
        if ($value instanceof UploadedFile) {
            $this->attributes['id_card_photo'] = $value->store('users/profileImage', 'public');
        } elseif (is_string($value)) {
            $this->attributes['id_card_photo'] = $value;
        }
    }
}
