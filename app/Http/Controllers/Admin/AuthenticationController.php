<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use App\Http\Requests\Auth\LoginRequest;

class AuthenticationController extends Controller
{
    /**
     * Display the admin login view.
     */
    public function create(): Response
    {
        return Inertia::render('AdminPanel/Components/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request for admin.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        // Use the 'admin' guard for authentication
        $credentials = $request->only('email', 'password');

        if (Auth::guard('admin')->attempt($credentials)) {
            // Regenerate the session to prevent session fixation
            $request->session()->regenerate();

            return redirect()->intended(route('admin.dashboard'));
        }

        // Redirect back with an error message if credentials are invalid
        return back()->withErrors(['email' => 'Invalid admin credentials']);
    }

    /**
     * Destroy an authenticated session for admin.
     */
    public function destroy(Request $request): RedirectResponse
    {
        // Log out using the 'admin' guard
        Auth::guard('admin')->logout();

        // Invalidate and regenerate the session to clear authenticated data
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }
}
