<?php

namespace App\Http\Controllers\Auth;

use Exception;
use App\Models\User;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $user = User::where('email', $googleUser->email)->first();

            // dd($user);
            if ($user) {
                // Update existing user's profile image
                if ($googleUser->avatar) {
                    // Delete old profile image if exists
                    if ($user->profile_image) {
                        Storage::disk('public')->delete($user->profile_image);
                    }

                    // Download and save new avatar
                    $avatarContents = file_get_contents($googleUser->avatar);
                    $filename = 'profile-images/' . Str::random(40) . '.jpg';
                    Storage::disk('public')->put($filename, $avatarContents);

                    $user->update([
                        'profile_image' => $filename
                    ]);
                }

                dd($user);
                Auth::login($user);
                return redirect()->route('home'); // Redirect to home
            }

            // For new user, download and save avatar
            $filename = null;
            if ($googleUser->avatar) {
                $avatarContents = file_get_contents($googleUser->avatar);
                $filename = 'users/profileImage/' . Str::random(40) . '.jpg';
                Storage::disk('public')->put($filename, $avatarContents);
            }

            // $first_name = $googleUser->name;
            // $email = $googleUser->email;
            // $filename = $filename;
            // $password =bcrypt(Str::random(24));

            // $data =[
            //     $first_name,
            //     $email ,
            //     $filename,
            //     $password
            // ];
            // dd($data);

            $newUser = User::create([
                'first_name' => $googleUser->name,
                'email' => $googleUser->email,
                'profile_image' => $filename,
                'password' => bcrypt(Str::random(24))
            ]);

            Auth::login($newUser);
            return redirect()->route('home'); // Redirect to home

        } catch (Exception $e) {
            return redirect()->route('login')
                ->withErrors(['error' => 'Something went wrong with Google login!']);
        }
    }
}
