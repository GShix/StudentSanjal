<?php

namespace App\Http\Controllers\User;

use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;
use App\Models\PostLike;
use Illuminate\Http\Request;
use App\Models\PostInteraction;
use App\Models\ConnectionCircle;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Post\StorePostRequest;
use App\Http\Requests\Post\UpdatePostRequest;

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

        Post::create($request->validated()+['user_id'=> Auth::user()->id]);

        return to_route('home')->with('success','Post created successfully');
    }

    public function edit(Post $post)
    {
        return Inertia::render('EditPost',[
            'postToEdit'=>$post
        ]);
    }

    public function update(UpdatePostRequest $request, Post $post)
    {
        $post->update($request->validated());
        return to_route('home')->with('success','Post updated successfully');
    }
    /**
     * Display the specified resource.
     */
    public function latestPosts(Request $request)
    {
        $user = $request->user();
        $followingIds =$user? ConnectionCircle::where('user_id', $user->id)
        ->pluck('connected_user_id')
        ->toArray():[];

        $latestPosts = Post::with('user','postInteractions')
        ->whereIn('user_id', $followingIds)
        ->latest()
        ->take(5)
        ->get();

        $latestPosts->each(function ($post) {
            // Extract interactions that are likes/dislikes (no comments)
            $likes = $post->postInteractions->whereNull('comment');

            // Extract interactions that are comments (with a non-null comment)
            $comments = $post->postInteractions->whereNotNull('comment');

            // Add filtered likes/dislikes and comments as attributes to the post
            $post->likes = $likes; // These include both likes and dislikes
            $post->comments = $comments;
        });

        return response()->json([
            'latestPosts' =>$latestPosts
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function showPosts()
    {
        $user = Auth::user();
        $followingIds = $user ? ConnectionCircle::where('user_id', $user->id)
        ->pluck('connected_user_id')
        ->toArray() : [];

        $followingIds[] = $user?$user->id:'';
        $latestPosts = Post::with('user')
            ->whereIn('user_id', $followingIds)
            ->latest()
            ->take(5)
            ->get();

        $postLikedByUser = PostLike::where('user_id', $user->id)
            ->whereIn('post_id', $latestPosts->pluck('id'))
            ->get();

        return response()->json([
            'latestPosts' => $latestPosts,
            'postLikedByUser'=>$postLikedByUser
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return to_route('home')->with('success', 'Post deleted successfully');
    }
    public function hide(Post $post)
    {
        $post->delete();
        return to_route('home')->with('success', 'Post deleted successfully');
    }

}
