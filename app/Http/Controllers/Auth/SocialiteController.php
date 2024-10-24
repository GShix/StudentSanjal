<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function googleLogin()
    {
        return Socialite::driver('google')->redirect();
    }

        public function handleGoogleCallback()
    {
        try {
            $user = Socialite::driver('google')->user();

            // Find or create the user in your database
            $authUser = User::where('google_id', $user->getId())->first();

            if (!$authUser) {
                // Create a new user
                $authUser = User::create([
                    'name' => $user->getName(),
                    'email' => $user->getEmail(),
                    'google_id' => $user->getId(),
                    'avatar' => $user->getAvatar(),
                ]);
            }

            // Log the user in
            Auth::login($authUser, true);

            // Redirect to a specific route
            return redirect()->route('home');
        } catch (\Exception $e) {
            // Log the exception for debugging
            // \Log::error('Google login error: ' . $e->getMessage());
            return redirect()->route('login')->withErrors(['error' => 'Login failed!']);
        }
    }

}
