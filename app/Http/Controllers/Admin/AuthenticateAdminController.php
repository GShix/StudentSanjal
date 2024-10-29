<?php

namespace App\Http\Controllers\Admin;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use App\Http\Requests\Auth\LoginRequest;

class AuthenticateAdminController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        $user = Auth::user();
        if ($user) {
            return redirect()->route('admin.dashboard');
        }

        return Inertia::render('AdminPanel/Components/Login', [
            'canResetPassword' => Route::has('admin.password.request'),
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
                return redirect()->route('updateProfile')->with('success',"Must update your username");
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
