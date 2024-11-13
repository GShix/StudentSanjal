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
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email'=>'required|email',
            'password'=>'required'
        ]);

        // dd($request);
        if(Auth::attempt($request->only('email','password')))
        {
            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors([
            'email'=>'The provided credentials does not match our records.'
        ]);
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
