<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\ConnectionCircle;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ConnectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function myNetwork(){
        return Inertia::render("MyNetwork");
    }
    public function follow($requestedId)
    {
        $user = Auth::user();

        $userExist = ConnectionCircle::where('user_id', $user->id)
        ->where('following', $requestedId)
        ->first();

        $requestedUserExist = ConnectionCircle::where('user_id', $requestedId)
                            ->where('followers', $user->id)
                            ->first();

        if($userExist && $requestedUserExist) {
            // If both relations exist, delete them (unfollow)
            $userExist->delete();
            $requestedUserExist->delete();

            return response()->json([
                'success' => 'Unfollowed successfully',
                'userExist' => false,  // Now false because the relationship is deleted
                'requestedUserExist' => false,
            ]);
        } else {
            // If the relationships don't exist, create them (follow)
            ConnectionCircle::create([
                'user_id' => $user->id,
                'following' => $requestedId
            ]);

            ConnectionCircle::create([
                'user_id' => $requestedId,
                'followers' => $user->id
            ]);

            return response()->json([
                'success' => 'Followed successfully',
                'userExist' => true,  // Now true because the relationship is created
                'requestedUserExist' => true,
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function unfollow()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function sendRequest(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function blockUser(ConnectionCircle $connectionCircle)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ConnectionCircle $connectionCircle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ConnectionCircle $connectionCircle)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ConnectionCircle $connectionCircle)
    {
        //
    }
}
