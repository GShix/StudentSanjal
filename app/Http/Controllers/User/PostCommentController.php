<?php

namespace App\Http\Controllers\User;

use App\Models\Post;
use App\Models\PostComment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostCommentController extends Controller
{
    public function commentOnThePost(Request $request)
    {
        // dd($request);
        $validatedData = $request->validate([
            'post_id' => 'required|exists:posts,id',
            'user_id' => 'required|exists:users,id',
            'comment'=> 'required|string'
        ]);

        PostComment::create([
            'post_id' => $validatedData['post_id'],
            'user_id' => $validatedData['user_id'],
            'comment' => $validatedData['comment'],
        ]);

        $totalComments = PostComment::where('post_id', $validatedData['post_id'])
                              ->count();

        $post = Post::find($validatedData['post_id']);
        $post->post_comment_count = $totalComments;
        $post->save();

        return response()->json([
            'post_comment_count' => $post->post_comment_count,
            'success'=>'Commented successfully.'
        ]);
    }

    public function allComments(Request $request)
    {
        $validatedData = $request->validate([
            'post_id' => 'required',
        ]);

        // $allComments = PostInteraction::all();
        $allComments = PostComment::with('user')
                    ->where('post_id',$validatedData['post_id'])
                    ->latest()
                    ->get()->toArray();

        return response()->json([
            'allComments' =>$allComments
        ]);
    }

    public function destroy(PostComment $postComment)
    {
        //
    }
}
