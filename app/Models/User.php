<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'profile_image',
        'banner_image',
        'first_name',
        'surname',
        'username',
        'headline',
        'dob',
        'gender',
        'email',
        'password',
        'user_role',
        'active_status',
        'account_status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed'
        ];
    }

    public function getProfileImageAttribute($value): string
    {
        return $this->attributes['profile_image'] ? asset('storage/' . $this->attributes['profile_image']) : asset('assets/img/default_user.png');
    }

    public function setProfileImageAttribute($value): void
    {
        $this->attributes['profile_image'] = $value->store('users/profileImage', 'public');
    }

    //Banner Image
    public function getBannerImageAttribute($value): string
    {
        return $this->attributes['banner_image'] ? asset('storage/' . $this->attributes['banner_image']) : asset('assets/img/default_banner.png');
    }

    public function setBannerImageAttribute($value): void
    {
        $this->attributes['banner_image'] = $value->store('users/bannerImage', 'public');
    }
}
