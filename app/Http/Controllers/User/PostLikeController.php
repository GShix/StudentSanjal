<?php

namespace App\Http\Controllers\User;

use App\Models\Post;
use App\Models\PostLike;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostLikeController extends Controller
{
    /**
     * Handle like/unlike functionality and return the updated like status and total likes.
     */
    public function isLiked(Request $request)
    {
        // Validate incoming request
        $validatedData = $request->validate([
            'post_id' => 'required|exists:posts,id',
            'user_id' => 'required|exists:users,id',
        ]);

        // Retrieve or create the user's like interaction with the post
        $postLike = PostLike::firstOrNew([
            'post_id' => $validatedData['post_id'],
            'user_id' => $validatedData['user_id'],
        ]);

        // Toggle the like status
        $postLike->like_status = !$postLike->like_status;
        $postLike->save();

        // Recalculate total likes for the post where like_status is true
        $totalLikes = PostLike::where('post_id', $validatedData['post_id'])
                              ->where('like_status', true)
                              ->count();

        // Update the total likes count in the Post model
        $post = Post::find($validatedData['post_id']);
        $post->post_like_count = $totalLikes;
        $post->save();

        return response()->json([
            'isLiked' => $postLike->like_status,
            'post_like_count' => $post->post_like_count,
        ]);
    }
}
