<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class RecommendationController extends Controller
{public function getRecommendedPostsBySkills(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $userSkills = $user->skill_id ?? [];

        if (empty($userSkills)) {
            return response()->json(['message' => 'No skills found for the user'], 404);
        }

        // Users with similar skills, excluding the authenticated user
        $matchingUsers = DB::table('users')
            ->where('id', '!=', $user->id) // Exclude the authenticated user
            ->where(function ($query) use ($userSkills) {
                foreach ($userSkills as $skill) {
                    $query->orWhereJsonContains('skill_id', $skill);
                }
            })
            ->pluck('id'); // Get matching user IDs

        // dd($matchingUsers);
        // Recommended posts from matching users
        $recommendedPosts = Post::whereHas('user', function ($query) use ($matchingUsers) {
            $query->whereIn('id', $matchingUsers);
        })
            ->with('user')
            ->take(2)->latest() // Fetch top 3 posts
            ->get();

        // Remaining posts, excluding posts from matching users
        $remainingPosts = Post::whereDoesntHave('user', function ($query) use ($matchingUsers) {
            $query->whereIn('id', $matchingUsers);
        })
            ->with('user')
            ->paginate(5); // Paginate remaining posts

        return response()->json([
            'recommendedPosts' => $recommendedPosts,
            'remainingPosts' => $remainingPosts,
            'userSkills' => $userSkills,
        ]);
    }
}