<?php

namespace App\Http\Controllers\User;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Models\PostInteraction;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class PostInteractionController extends Controller
{
    // public function likeThePost(Request $request){
    //     // dd($request->toArray());
    //     // Validate incoming request
    //     $validatedData = $request->validate([
    //         'post_id' => 'required|exists:posts,id',
    //         'user_id' => 'required|exists:users,id',
    //     ]);
    //     // dd($validatedData);

    //     // Check if post exists
    //     $post = Post::find($validatedData['post_id']);
    //     if (!$post) {
    //         return response()->json(['error' => 'Post not found'], 404);
    //     }

    //     // Check if interaction already exists
    //     $interaction = PostInteraction::where('user_id', $validatedData['user_id'])
    //                     ->where('post_id', $validatedData['post_id'])
    //                     ->first();

    //     if ($interaction) {
    //         // Toggle the like status: if true, set to false; if false, set to true
    //         $interaction->like_status = !$interaction->like_status;

    //         $post->post_like_count = $post->post_like_count-$interaction->total_likes;
    //         $post->save();

    //         $interaction->total_likes =0;
    //         $interaction->save();
    //         return response()->json([
    //             'liked' =>$interaction->like_status
    //         ]);
    //     } else {
    //         // If no interaction exists, create a new one with like_status set to true
    //         PostInteraction::create([
    //             'post_id' => $validatedData['post_id'],
    //             'user_id' => $validatedData['user_id'],
    //             'like_status' => true,  // Set to true for the first like
    //         ]);
    //         $interaction->total_likes = $interaction->total_like+1;
    //         $interaction->save();
    //         $post->post_like_count = $post->post_like_count+1;
    //         $post->save();
    //         return response()->json([
    //             'liked' =>true
    //         ]);
    //     }
    // }


    public function allComments(Request $request){
        $validatedData = $request->validate([
            'post_id' => 'required',
        ]);

        // $allComments = PostInteraction::all();
        $allComments = PostInteraction::with('user')
                    ->whereNotNull('comment')
                    ->where('post_id',$validatedData['post_id'])
                    ->get()->toArray();
        // ->pluck('comment');
        // dd($latest_comment);

        // dd($allComments->toArray());
        return response()->json([
            'allComments' =>$allComments
        ]);
    }

    public function likeThePost(Request $request){
        // Validate incoming request
        $validatedData = $request->validate([
            'post_id' => 'required|exists:posts,id',
            'user_id' => 'required|exists:users,id',
        ]);

        // Check if post exists
        $post = Post::find($validatedData['post_id']);
        if (!$post) {
            return response()->json(['error' => 'Post not found'], 404);
        }

        // Check if interaction already exists
        $interaction = PostInteraction::where('user_id', $validatedData['user_id'])
                        ->where('post_id', $validatedData['post_id'])
                        ->whereNull('like_status')
                        ->whereNull('comment')
                        ->first();

        if ($interaction) {
            // Toggle the like status
            $interaction->like_status = !$interaction->like_status;

            // Update the like count based on interaction
            if ($interaction->like_status) {
                $post->post_like_count++;
            } else {
                $post->post_like_count--;
            }
            $post->save();

            // Save interaction's total likes
            $interaction->total_likes = $interaction->like_status ? 1 : 0;
            $interaction->save();

            return response()->json([
                'liked' => $interaction->like_status,
            ]);
        } else {
            // Create a new interaction with like_status set to true
            $interaction = PostInteraction::create([
                'post_id' => $validatedData['post_id'],
                'user_id' => $validatedData['user_id'],
                'like_status' => true,  // Set to true for the first like
            ]);

            // Update post's like count
            $post->post_like_count++;
            $post->save();

            return response()->json([
                'liked' => true,
            ]);
        }
    }

    public function commentInThePost(Request $request){

        // dd($request);
        $validatedData = $request->validate([
            'post_id' => 'required|exists:posts,id',
            'user_id' => 'required|exists:users,id',
            'comment'=> 'required|string'
        ]);

        // Check if post exists
        $post = Post::find($validatedData['post_id']);
        if (!$post) {
            return response()->json(['error' => 'Post not found'], 404);
        }

        // Create a new interaction with like_status set to true
        PostInteraction::create([
            'post_id' => $validatedData['post_id'],
            'user_id' => $validatedData['user_id'],
            'comment' => $validatedData['comment'],
        ]);
        // $interaction->total_comments = $interaction->total_comments+1;
        // $interaction->save();
        // Update post's like count
        $post->post_comment_count++;
        $post->save();

        return response()->json([
            'liked' => true,
            'success'=>'Comment created successfully'
        ]);
    }

}
