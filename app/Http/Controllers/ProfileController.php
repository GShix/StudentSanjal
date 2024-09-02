<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
{
    $user = $request->user();

    // Update user profile data with validated input
    $user->fill($request->validated());

    // Check if the email was changed, reset email verification if so
    if ($user->isDirty('email')) {
        $user->email_verified_at = null;
    }

    // Handle profile image upload if present
    if ($request->hasFile('profile_image')) {
        $user->profile_image = $request->file('profile_image');
    }

    // Handle banner image upload if present
    if ($request->hasFile('banner_image')) {
        $user->banner_image = $request->file('banner_image');
    }

    // Hash and update the password if provided
    if ($request->filled('password')) {
        $user->password = Hash::make($request->password);
    }
    dd($user);

    $user->save();

    return to_route('profile.edit');
}


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return to_route('home');
    }
}
