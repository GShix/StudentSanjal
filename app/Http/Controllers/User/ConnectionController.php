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

        // Check if the connection exists in both directions (user following and requested user following back)
        $existingConnection = ConnectionCircle::where(function($query) use ($user, $requestedId) {
            $query->where('user_id', $user->id)
                  ->where('connected_user_id', $requestedId);
        })->orWhere(function($query) use ($user, $requestedId) {
            $query->where('user_id', $requestedId)
                  ->where('connected_user_id', $user->id);
        })->first();

        if ($existingConnection) {
            // If the connection exists, delete both records (unfollow)
            ConnectionCircle::where('user_id', $user->id)
                            ->where('connected_user_id', $requestedId)
                            ->delete();

            ConnectionCircle::where('user_id', $requestedId)
                            ->where('connected_user_id', $user->id)
                            ->delete();

            return response()->json([
                'success' => 'Unfollowed successfully',
                'userExist' => false,
                'requestedUserExist' => false,
            ]);
        } else {
            // If no connection exists, create them (follow)
            ConnectionCircle::create([
                'user_id' => $user->id,
                'connected_user_id' => $requestedId,
            ]);

            ConnectionCircle::create([
                'user_id' => $requestedId,
                'connected_user_id' => $user->id,
            ]);

            return response()->json([
                'success' => 'Followed successfully',
                'userExist' => true,
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
