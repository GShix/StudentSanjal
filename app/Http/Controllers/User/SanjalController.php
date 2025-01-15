<?php

namespace App\Http\Controllers\User;

use App\Models\Chat;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Events\ChatSendEvent;
use App\Models\ConnectionCircle;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Chat\StoreChatRequest;

class SanjalController extends Controller
{
    public $user;
    public $sender_id;
    public $receiver_id;
    public $text_field="";
    public $chats;

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

        return Inertia::render('Chats/Index',[
            'otherUsers'=>$otherUsers,
            'chats'=>$this->chats
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

        // $chats = Chat::between($senderId, $receiverId)
        //         ->with('sender:id,username', 'receiver:id,username')
        //         ->get();
        $this->chats = Chat::where(function($query) use ($senderId, $receiverId) {
            $query->where('sender_id', $senderId)
                  ->where('receiver_id', $receiverId);
        })->orWhere(function($query) use ($senderId, $receiverId) {
            $query->where('sender_id', $receiverId)
                  ->where('receiver_id', $senderId);
        })->with('sender:id,username', 'receiver:id,username')
          ->get();


        return response()->json(['chats' => $this->chats]);
        // Inertia::render('Chats/StartChats',['chats'=>$this->chats]);
        // return back()->compact('chats');
    }

    public function startChat($requestId)  {

        $senderId = Auth::id();
        $receiverId = $requestId;

        session([
            'sender_id' => $senderId,
            'receiver_id' => $receiverId,
        ]);

        // $chatss =Chat::between($senderId, $receiverId)->latest()->get();
        // $this->chats = $chatss;


        $requestedUser = User::with(['connectionCircle' => function ($query) {
            $query->latest()->take(1);
        }])->where('id', $requestId)
          ->latest()
          ->get();

        $chats = Chat::where(function($query) use ($senderId, $receiverId) {
            $query->where('sender_id', $senderId)
                  ->where('receiver_id', $receiverId);
        })->orWhere(function($query) use ($senderId, $receiverId) {
            $query->where('sender_id', $receiverId)
                  ->where('receiver_id', $senderId);
        })->with('sender:id,username', 'receiver:id,username')
          ->get();

        return Inertia::render('Chats/StartChatss',[
            'requestedUser'=>$requestedUser,
            'chats'=>$chats
        ]);
    }


    public function sendChat(StoreChatRequest $request)
    {
        $receiverId = session('receiver_id');

        if (!$receiverId) {
            return back()->with('error', 'Receiver not found.');
        }

        $file = $request->file('media');
dd($file->getSize(), $file->getClientOriginalName(), $file->getMimeType());

        // dd($request);

        try {
            $validated = $request->validated();
            // dd($validated);
            $senderId = Auth::id();

            DB::transaction(function () use ($validated, $senderId, $receiverId) {
                $connectionId = ConnectionCircle::where(function ($query) use ($senderId, $receiverId) {
                    $query->where('user_id', $senderId)
                          ->where('connected_user_id', $receiverId);
                })
                ->orWhere(function ($query) use ($senderId, $receiverId) {
                    $query->where('user_id', $receiverId)
                          ->where('connected_user_id', $senderId);
                })
                ->value('id');

                if (!$connectionId) {
                    throw new \Exception('Connection does not exist between users.');
                }

                // dd('Connection ID:', $connectionId); // Debug connection ID
                $chats =Chat::create([
                    'connection_id' => $connectionId,
                    'sender_id' => $senderId,
                    'receiver_id' => $receiverId,
                    'text_field' => $validated['text_field'] ?? null,
                    'media' => $validated['media'] ?? null,
                    'like' => $validated['like'] ?? null,
                ]);

            });



            // Broadcast the event
            // broadcast(new ChatSendEvent($chat))->toOthers();

            return back()->with('success', 'Message sent successfully');
        } catch (\Throwable $e) {
            // \Log::error('Chat send error: ' . $e->getMessage());
            return back()->with('error', 'Failed to send message');
        }
    }


}
