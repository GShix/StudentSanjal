<?php

namespace App\Http\Middleware;

use Closure;
use Inertia\Inertia;
use Inertia\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ShareInertiaData extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Inertia::share('auth.user', function () use ($request) {
            return $request->user()
                ? $request->user()->toArray() // This converts the user object to an array, sharing all attributes
                : null;
        });

        return $next($request);
    }
}
