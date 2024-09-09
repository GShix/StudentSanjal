<?php

namespace App\Http\Controllers\Auth;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use App\Http\Requests\Auth\LoginRequest;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        $user = Auth::user();
        if ($user && !$user->profile_updated) {
            return redirect()->route('showProfile')->with('warning', "Must update your profile");
        }

        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = $request->user();
        // dd($user);
        if ($user->user_role === 'user') {
            if ($user->profile_updated) {
                return redirect()->route('home')->with('success',"Logged in successfully");
            } else {
                return redirect()->route('updateProfile')->with('success',"Please update your profile");
            }
        }

        // dd($request->user()->toArray());
        // return redirect()->intended(route('dashboard',['user'=>$user]));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
