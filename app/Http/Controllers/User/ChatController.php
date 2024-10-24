<?php

namespace App\Http\Controllers\User;

use App\Models\Chat;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Events\ChatSendEvent;
use App\Models\ConnectionCircle;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Chat\StoreChatRequest;

class ChatController extends Controller
{
    public $user;
    public $sender_id;
    public $receiver_id;
    public $text_field="";

    public function index()
    {
        $user = Auth::user(); // Get the currently authenticated user

        if (!$user->profile_updated) {
            return redirect()->route('showProfile', $user->username)
                ->with('warning', "Must update your username");
        }

        $otherUsers = User::with(['note' => function ($query) {
            $query->latest()->take(1);
        }])->where('id', '!=', $user->id)
          ->latest()
          ->get();

        return Inertia::render('StartChat', [
            'otherUsers' => $otherUsers,
        ]);
    }


    public function fetchChats($sathiKoId)
    {
        $senderId = Auth::id();
        $receiverId = $sathiKoId;

        session([
            'sender_id' => $senderId,
            'receiver_id' => $receiverId,
        ]);

        $chats = Chat::where(function($query) use ($senderId, $receiverId) {
            $query->where('sender_id', $senderId)
                  ->where('receiver_id', $receiverId);
        })->orWhere(function($query) use ($senderId, $receiverId) {
            $query->where('sender_id', $receiverId)
                  ->where('receiver_id', $senderId);
        })->with('sender:id,username', 'receiver:id,username')
        //   ->latest()
          ->get(); // Optionally paginate this

        return response()->json(['chats' => $chats]);
    }

    public function sendChat(StoreChatRequest $request)
    {
        $validated = $request->validated();
        $sender_id = Auth::id(); // Secure the sender_id with Auth
        $receiver_id = session('receiver_id');

        if (!$receiver_id) {
            return back()->with('error', 'Receiver not found.');
        }

        if ($request->hasFile('media')) {
            $path = $request->file('media')->store('media', 'public');
            $validated['media'] = $path;
        }

        $chat = Chat::create([
            'text_field' => $validated['text_field'],
            'media' => $validated['media'] ?? null,
            'like' => $validated['like'] ?? '',
            'sender_id' => $sender_id,
            'receiver_id' => $receiver_id,
        ]);

        broadcast(new ChatSendEvent($chat))->toOthers();

        return back()->with('success', 'Message sent successfully');
    }
}
