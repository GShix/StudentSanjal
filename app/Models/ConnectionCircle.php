<?php

namespace App\Models;
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// class ConnectionCircle extends Model
// {
//     use HasFactory, SoftDeletes;

//     protected $table = 'connection_circles';

//     protected $fillable = [
//         'user_id', 'following', 'followers', 'friends', 'unfollowed', 'blocked'
//     ];

//     // Relationship to the user who initiated the connection
//     public function user(): BelongsTo
//     {
//         return $this->belongsTo(User::class, 'user_id');
//     }

//     public function followers()
//     {
//         return $this->belongsToMany(User::class, 'connection_circles', 'user_id','followers');
//     }
//     public function following()
//     {
//         return $this->belongsToMany(User::class, 'connection_circles', 'user_id','following');
//     }

//     // Relationship to the user being followed
//     public function followedUser(): BelongsTo
//     {
//         return $this->belongsTo(User::class, 'following');
//     }

//     // Relationship to the user following the current user
//     public function followedByUser(): BelongsTo
//     {
//         return $this->belongsTo(User::class, 'followers');
//     }
//     public function followingUser(): BelongsTo
//     {
//         return $this->belongsTo(User::class, 'user_id');
//     }
// }

class ConnectionCircle extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'connection_circles';

    protected $fillable = [
        'user_id',
        'connected_user_id',
        'connection_type',
    ];

    /**
     * Relationship to the user who initiated the connection.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Relationship to the connected user (e.g., the followed user).
     */
    public function connectedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'connected_user_id');
    }

    /**
     * Scope to get connections of type 'following'.
     */
    public function scopeFollowing($query)
    {
        return $query->where('connection_type', 'following');
    }

    /**
     * Scope to get connections of type 'blocked'.
     */
    public function scopeBlocked($query)
    {
        return $query->where('connection_type', 'blocked');
    }

    /**
     * Scope to get unfollowed connections.
     */
    public function scopeUnfollowed($query)
    {
        return $query->where('connection_type', 'unfollowed');
    }
}
