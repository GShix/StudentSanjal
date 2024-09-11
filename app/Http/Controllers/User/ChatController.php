<?php

namespace App\Http\Controllers\User;

use App\Models\Chat;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
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
        session([
            'sender_id' => Auth::user()->id,
            'receiver_id' => $sathiKoId
        ]);
        $chats = Chat::where(function($query){
            $query->where('sender_id',session('sender_id'))
                -> where('receiver_id',session('receiver_id'));
        })->orWhere(function($query){
            $query->where('sender_id',session('receiver_id'))
                -> where('receiver_id',session('sender_id'));
        })
        ->with('sender:id,username','receiver:id,username')
        ->get();

        return response([
            'chats'=>$chats
        ]);
    }

    public function sendChat(StoreChatRequest $request)
    {
        $validated = $request->validated();

        $sender_id = session('sender_id');
        $receiver_id = session('receiver_id');

        // dd($validated);

        if ($request->hasFile('media')) {
            $path = $request->file('media')->store('media', 'public');
            $validated['media'] = $path;
        }

        Chat::create([
            'text_field' => $validated['text_field'],
            'media' => $validated['media'] ?? null,
            'like' => $validated['like'] ?? '',
            'sender_id' => $sender_id,
            'receiver_id' => $receiver_id
        ]);

        return back()->with('success','Message sent successfully');
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
