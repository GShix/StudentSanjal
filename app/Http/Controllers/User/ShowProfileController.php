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
    public function index()
    {
        return Inertia::render('ShowProfile');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show($user_id)
    {
        // Retrieve the user based on user_id
        $user = User::findOrFail($user_id);

        // Fetch the user's posts
        $his_posts = Post::where('user_id', $user_id)->latest()->get();

        // Pass the user and their posts to the Inertia view
        return Inertia::render('ShowProfile', [
            'auth' => ['user' => $user],
            'his_posts' => $his_posts
        ]);
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
