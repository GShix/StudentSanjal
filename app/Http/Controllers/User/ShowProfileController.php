<?php

namespace App\Http\Controllers\User;

use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use RealRashid\SweetAlert\Facades\Alert;
use App\Http\Requests\Post\StorePostRequest;

class ShowProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function showProfile($username)
    {
        $user = User::where('username', $username)->first();

        if (!$user->profile_updated) {
            return redirect()->route('showProfile')->with('warning',"Must update your profile");
        }
        if (!$user) {
            abort(404, 'User not found');
        }

        $his_posts = Post::where('user_id', $user->id)->latest()->get();

        return Inertia::render('ShowProfile', [
            'user' => $user,
            'his_posts' => $his_posts,
        ]);
    }

    public function showProfileById($id)
    {
        $user = User::where('id', $id)->first();

        if (!$user) {
            abort(404, 'User not found');
        }

        $his_posts = Post::where('user_id', $user->id)->latest()->get();

        return Inertia::render('ShowProfile', [
            'user' => $user,
            'his_posts' => $his_posts,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {

    }


}
