<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function (User $user, $id) {
    return (int) $user->id === (int) $id;
});

// Broadcast::channel('student-sanjal.{friendId}', function (User $user, $friendId) {
//     // Allow both the sender and receiver to join the same channel
//     return $user->id === (int) $friendId || $user->id === (int) auth()->id();
// });

Broadcast::channel('student-sanjal.{friendId}', function (User $user, $friendId) {
    // Allow both the sender and receiver to join the same channel
    return (int) $user->id === (int) $friendId || (int) $user->id === (int) auth()->id();
});


// Broadcast::channel('student-sanjal.{receiverId}', function ($user, $receiverId) {
//     return $user->id === (int) $receiverId || $user->id === (int) $user->id;
// });
