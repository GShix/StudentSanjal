<?php

namespace App\Http\Middleware;

use App\Models\Chat;
use App\Models\Note;
use App\Models\Post;
use Inertia\Middleware;
use Illuminate\Http\Request;

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

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                // Fetch the latest note for the authenticated user
                'latest_chat' => $user
                                ? Chat::where('receiver_id', $user->id)->latest()->first() ?? null
                                : null,
                'latest_note' => $user
                                ? Note::where('user_id', $user->id)->latest()->first()
                                : null,
            ],
            'latest_posts'=>Post::with('user')->latest()->take(5)->get(),
            // 'his_posts'=>Post::with( 'user')->get(),


            'flash' => [
            'success' => $request->session()->get('success'),
            ],
        ];
    }
}
