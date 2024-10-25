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

        $skills = Skill::latest()->get();

        $followingIds = $user ? ConnectionCircle::where('user_id', $user->id)
                        ->whereNotNull('following')
                        ->pluck('following')
                        ->toArray() : [];


        $usersYouFollowed =$user? User::whereIn('id', $followingIds)
                        ->where('id', '!=', $user->id)
                        ->get():[];

        $usersNotFollowed =$user? User::whereNotIn('id', $followingIds)
                    ->where('id', '!=', $user->id)
                    ->get():[];

        $followingIds[] = $user?$user->id:'';
        $latestPosts = Post::with('user')
                    ->whereIn('user_id', $followingIds)
                    ->latest()
                    ->take(5)
                    ->get();

        $savedPosts = $user ? SavedPost::where('user_id', $user->id)->get() : [];
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
                'recommendingUsers' =>$usersNotFollowed,
                'usersYouFollowed'=>$usersYouFollowed,
                'savedPosts'=>$savedPosts
                // 'postsLikedByYou'=>$postsLikedByYou
            ],
            'skills'=>$skills,
            'latest_posts'=>$latestPosts,
            // 'latest_comment'=>$latest_comment,
            'flash' => [
            'success' => $request->session()->get('success'),
            ],
        ];
    }
}
