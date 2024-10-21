<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

// Broadcast::channel('App.Models.User.{id}', function (User $user, $id) {
//     return (int) $user->id === (int) $id;
// });

// Broadcast::channel('student-sanjal.{sathiKoId}', function (User $user, $sathiKoId) {
//     return (int) $user->id === (int) $sathiKoId;
// });

Broadcast::channel('chat.{receiverId}', function ($user, $receiverId) {
    return $user->id === (int) $receiverId || $user->id === (int) $user->id;
});
