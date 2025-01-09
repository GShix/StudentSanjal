<?php

namespace App\Http\Controllers\Admin;

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

        return Inertia::render('Chats/Index',['otherUsers'=>$otherUsers]);
    }

    public function startChat($requestId)  {
        $requestedUser = User::with(['note' => function ($query) {
            $query->latest()->take(1);
        }])->where('id', $requestId)
          ->latest()
          ->get();
        return Inertia::render('Chats/StartChatss',['requestedUser'=>$requestedUser]);
    }
}
