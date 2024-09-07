<?php

namespace App\Http\Controllers\User;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Post\StorePostRequest;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('UploadPost');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {

        $post = new Post();

        Post::create($request->validated()+['user_id'=> Auth::user()->id]);

        return to_route('home')->with('success','Post created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
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
        $post->delete();
        return to_route('home')->with('success', 'Post deleted successfully');
    }

    public function updatePostLoveCount(Post $post)
    {
        $post->update([
            'post_love_count' => $post->post_love_count + 1
        ]);

        // return back()->with('success', 'Post loved successfully');
        return response()->json([
            'success' => true,
            'newLoveCount' => $post->post_love_count,
            'message'=>"Loved"
        ]);
    }

}
