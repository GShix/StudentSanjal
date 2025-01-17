<?php

namespace App\Http\Controllers\User;

use App\Models\Chat;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Events\ChatSendEvent;
use App\Models\ConnectionCircle;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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


    public function fetchChats($friendId)
    {
        $senderId = Auth::id();
        $receiverId = $friendId;

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
          ->get();

        // return response()->json(['chats' => $chats]);
        Inertia::render('Chats/StartChats',['chats'=>$chats]);
        // return back()->compact('chats');
    }

    public function sendChat(StoreChatRequest $request)
    {
        try {
            $validated = $request->validated();
            $sender_id = Auth::id();
            $receiver_id = session('receiver_id');

            if (!$receiver_id) {
                return back()->with('error', 'Receiver not found.');
            }

            DB::beginTransaction();

            $chat = Chat::create([
                'text_field' => $validated['text_field'],
                'media' => $validated['media'] ?? null,
                'like' => $validated['like'] ?? '',
                'sender_id' => $sender_id,
                'receiver_id' => $receiver_id,
            ]);

            // Load relationships needed for the event
            $chat->load('sender:id,username');

            broadcast(new ChatSendEvent($chat))->toOthers();

            DB::commit();

            return back()->with('success', 'Message sent successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Chat send error: ' . $e->getMessage());
            return back()->with('error', 'Failed to send message');
        }
    }
}
