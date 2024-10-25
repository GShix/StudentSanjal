<?php

namespace App\Models;

use App\Models\Post;
use App\Models\Skill;
use App\Models\SavedPost;
use App\Models\PostInteraction;
use App\Models\ConnectionCircle;
use Illuminate\Http\UploadedFile;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
        'middle_name',
        'last_name',
        'username',
        'headline',
        'dob',
        'gender',
        'email',
        'password',
        'profile_updated',
        'user_role',
        'active_status',
        'account_status',
        'skill_id',
    ];

    public function post(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function postInteraction(): HasMany
    {
        return $this->hasMany(PostInteraction::class);
    }

    public function postLike(): HasMany
    {
        return $this->hasMany(PostLike::class,'user_id','id');
    }

    public function savedPosts(): HasMany
    {
        return $this->hasMany(SavedPost::class,'user_id','id');
    }

    public function postComment(): HasMany
    {
        return $this->hasMany(PostComment::class);
    }

    public function note(): HasMany
    {
        return $this->hasMany(Note::class);
    }

    public function skills():HasMany
    {
        return $this->hasMany(Skill::class,'id','skill_id[]');
    }

    public function connectionCircle():HasMany
    {
        return $this->hasMany(ConnectionCircle::class);
    }

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
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'skill_id' => 'array',
    ];

    /**
     * Get the full URL for the profile image.
     *
     * @return string
     */
    public function getProfileImageAttribute(): string
    {
        return $this->attributes['profile_image']
            ? asset('storage/' . $this->attributes['profile_image'])
            : asset('assets/img/default_user.png');
    }

    /**
     * Set the profile image attribute.
     *
     * @param  mixed  $value
     * @return void
     */
    public function setProfileImageAttribute($value): void
    {
        if ($value instanceof UploadedFile) {
            $this->attributes['profile_image'] = $value->store('users/profileImage', 'public');
        } elseif (is_string($value)) {
            $this->attributes['profile_image'] = $value;
        }
    }

    /**
     * Get the full URL for the banner image.
     *
     * @return string
     */
    public function getBannerImageAttribute(): string
    {
        return isset($this->attributes['banner_image']) && !empty($this->attributes['banner_image'])
        ? asset('storage/' . $this->attributes['banner_image'])
        // : 'No Image';
        : asset('assets/img/default_banner.png');
        // return asset('storage/' . $this->attributes['banner_image']);
    }

    /**
     * Set the banner image attribute.
     *
     * @param  mixed  $value
     * @return void
     */
    public function setBannerImageAttribute($value): void
    {
        if ($value instanceof UploadedFile) {
            $this->attributes['banner_image'] = $value->store('users/bannerImage', 'public');
        } elseif (is_string($value)) {
            $this->attributes['banner_image'] = $value;
        }
    }

    // public function following(): BelongsToMany
    // {
    //     return $this->belongsToMany(User::class, 'followers', 'follower_id', 'user_id')
    //                 ->withTimestamps();
    // }

    // // Relationship to get the users following this user
    // public function followers(): BelongsToMany
    // {
    //     return $this->belongsToMany(User::class, 'followers', 'user_id', 'follower_id')
    //                 ->withTimestamps();
    // }
    public function following()
    {
        return $this->hasMany(ConnectionCircle::class, 'user_id', 'id')
                    ->whereNotNull('following');
    }

    // Relationship to handle users following this user
    public function followers()
    {
        return $this->belongsToMany(User::class, 'connection_circles', 'user_id', 'followers')
        ->whereNull('connection_circles.deleted_at');
    }
}
