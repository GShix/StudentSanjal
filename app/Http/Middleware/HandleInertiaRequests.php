<?php

namespace App\Http\Middleware;

use App\Models\Chat;
use App\Models\Note;
use App\Models\Post;
use App\Models\User;
use App\Models\Skill;
use Inertia\Middleware;
use App\Models\SavedPost;
use Illuminate\Http\Request;
use App\Models\PostInteraction;
use App\Models\ConnectionCircle;
use Illuminate\Support\Facades\Auth;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        // Fetch skills
        $skills = Skill::latest()->get();

        // Fetch users followed by the current user
        $followingIds = $user ? ConnectionCircle::where('user_id', $user->id)
                            ->where('connection_type', 'following')
                            ->pluck('connected_user_id')
                            ->toArray() : [];

        $usersYouFollowed = $user ? User::whereIn('id', $followingIds)
                                ->where('id', '!=', $user->id)
                                ->get() : [];

        // Fetch users not followed by the current user
        $usersNotFollowed = $user ? User::whereNotIn('id', $followingIds)
                                ->where('id', '!=', $user->id)
                                ->take(3)
                                ->get() : [];

        // Include current user ID in the list of following IDs
        $followingIds[] = $user ? $user->id : null;

        // Fetch latest posts from followed users
        $latestPosts = Post::with('user')
                        ->whereIn('user_id', $followingIds)
                        ->latest()
                        ->take(5)
                        ->get();

        // Fetch saved posts for the current user
        $savedPostIds = $user ? SavedPost::where('user_id', $user->id)->pluck('post_id')->toArray() : [];

        // Build shared data
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'latest_chat' => $user
                    ? Chat::where('receiver_id', $user->id)->latest()->first() ?? null
                    : null,
                'latest_note' => $user
                    ? Note::where('user_id', $user->id)->latest()->first()
                    : null,
                'recommendingUsers' => $usersNotFollowed,
                'usersYouFollowed' => $usersYouFollowed,
                'savedPosts' => $savedPostIds,
            ],
            'skills' => $skills,
            'latest_posts' => $latestPosts,
            'flash' => [
                'success' => $request->session()->get('success'),
            ],
        ];
    }
}
