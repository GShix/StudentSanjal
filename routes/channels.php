<?php

// routes/channels.php

use App\Models\Chat;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('student-sanjal.{id}', function ($user, $id) {
    // Log for debugging
    \Log::info('Channel auth attempt', [
        'user_id' => $user->id,
        'requested_id' => $id
    ]);

    return (int) $user->id === (int) $id ||
           (int) $user->id === (int) Chat::where('id', $id)->value('sender_id');
});

// Broadcast::channel('student-sanjal.{receiverId}', function ($user, $receiverId) {
//     return $user->id === (int) $receiverId || $user->id === (int) $user->id;
// });
// Broadcast::channel('student-sanjal.{friendId}', function (User $user, $friendId) {
//     // Allow both the sender and receiver to join the same channel
//     return $user->id === (int) $friendId || $user->id === (int) auth()->id();
// });
