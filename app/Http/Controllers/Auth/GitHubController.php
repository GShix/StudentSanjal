<?php

namespace App\Http\Controllers\Auth;

use Exception;
use App\Models\User;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Laravel\Socialite\Facades\Socialite;

class GitHubController extends Controller
{
    public function redirectToGitHub()
    {
        return Socialite::driver('github')->redirect();
    }

    public function handleGitHubCallback()
    {
        try {
            $githubUser = Socialite::driver('github')->user();

            $user = User::where('email', $githubUser->email)->first();

            if ($user) {

                if ($githubUser->avatar) {
                    if ($user->profile_image) {
                        Storage::disk('public')->delete($user->profile_image);
                    }

                    $avatarContents = file_get_contents($githubUser->avatar);
                    $filename = 'profile-images/' . Str::random(40) . '.jpg';
                    Storage::disk('public')->put($filename, $avatarContents);

                    $user->update([
                        'profile_image' => $filename
                    ]);
                }

                Auth::login($user);
                return redirect()->route('home'); // Redirect to home
            }

            $filename = null;
            if ($githubUser->avatar) {
                $avatarContents = file_get_contents($githubUser->avatar);
                $filename = 'users/profileImage/' . Str::random(40) . '.jpg';
                Storage::disk('public')->put($filename, $avatarContents);
            }

            // $first_name = $githubUser->name;
            // $email = $githubUser->email;
            // $filename = $filename;
            // $password =bcrypt(Str::random(24));

            // $data =[
            //     $first_name,
            //     $email ,
            //     $filename,
            //     $password
            // ];nsdhfsiihig
            // dd($data);

            $newUser = User::create([
                'first_name' => $githubUser->name,
                'email' => $githubUser->email,
                'profile_image' => $filename,
                'username'=>Str::lower($githubUser->nickname),
                'password' => bcrypt(Str::random(24))
            ]);

            Auth::login($newUser);
            return redirect()->route('profileSetting'); // Redirect to home

        } catch (Exception $e) {
            return redirect()->route('login')
                ->withErrors(['error' => 'Something went wrong with GitHub login!']);
        }
    }
}
