<?php

namespace App\Http\Controllers\User;

use App\Models\Chat;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public $user;
    public $sender_id;
    public $receiver_id;
    public $message="";

    public function index()
    {
        $user = Auth::user(); // Get the currently authenticated user

        if ($user->username && !$user->profile_updated) {
            return redirect()->route('showProfile',$user->username)->with('warning', "Must update your profile");
        }

        $allUsers = User::with(['note' => function ($query) {
            $query->latest()->take(1);
        }])->latest()->get();
        // dd($users);
        return Inertia::render('ChatUi',[
            'allUsers'=>$allUsers
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function startChat($sathiKoId)
    {
        $this->sender_id = Auth::user()->id;
        $this->receiver_id = User::whereId($sathiKoId)->first();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function sendMessage(Request $request)
    {

        // if ($request->hasFile('media')) {
        //     $path = $request->file('media')->store('media', 'public');
        //     $validated['media'] = $path;
        // }
        $chatMessage = new Chat();
        $chatMessage->sender_id = $this->sender_id;
        $chatMessage->receiver_id = $this->receiver_id;
        $chatMessage->message = $request->message;

        // Chat::create([
        //     'message'=>$request->message,
        //     'sender_id'=>$this->sender_id,
        //     'receriver_id'=>$this->receiver_id
        // ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat $chat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chat $chat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chat $chat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chat $chat)
    {
        //
    }
}
