<?php

namespace App\Http\Controllers\User;

use App\Models\Post;
use Inertia\Inertia;
use App\Models\SavedPost;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SavePostController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $savedPostIds = $user ? SavedPost::where('user_id', $user->id)->pluck('post_id') : [];

        $savedPosts = Post::whereIn('id', $savedPostIds)->with('user')->get();
        return Inertia::render('SavedPost',[
            'savedPosts'=>$savedPosts
        ]);
    }

    public function toggleSave(Request $request)
    {
        // Validate incoming request
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'post_id' => 'required|exists:posts,id',
            'owner_id' => 'required',
        ]);

        // Check if the post is already saved
        $savedPost = SavedPost::where([
            'user_id' => $validatedData['user_id'],
            'post_id' => $validatedData['post_id'],
            'owner_id' => $validatedData['owner_id'],
        ])->first();

        if ($savedPost) {
            // Post is already saved, so remove it
            $savedPost->delete();
            return response()->json([
                'isSaved' => true,
                'success' => 'Post unsaved successfully.'
            ]);
        } else {
            // Post is not saved, so create a new saved post
            $savedPost = SavedPost::create([
                'user_id' => $validatedData['user_id'],
                'post_id' => $validatedData['post_id'],
                'owner_id' => $validatedData['owner_id'],
            ]);
            return response()->json([
                'isSaved' => true,
                'success' => 'Post saved successfully.',
            ]);
        }
    }
}
