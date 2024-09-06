<?php

namespace App\Http\Middleware;

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

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'latest_posts'=>Post::with('user')->latest()->take(5)->get(),
            // 'his_posts'=>Post::with( 'user')->get(),

            'flash' => [
            'success' => $request->session()->get('success'),
            ],
        ];
    }
}
