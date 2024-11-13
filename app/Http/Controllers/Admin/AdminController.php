<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('AdminPanel/Dashboard');
    }

    public function allUsers()
    {
        $allUsers = User::latest()->get();
        return Inertia::render('AdminPanel/User/AllUsers',compact('allUsers'));
    }

    public function viewUser($userId)
    {
        $user = User::where('id',$userId)->with('studentVerification')->get();
        return Inertia::render('AdminPanel/User/ViewUser',compact('user'));
    }

    public function changeAccountStatus(Request $request)
    {
        $userId = $request['userId'];
        $accountStatus = $request['selectedOption'];
        // dd($userId,$account_status);
        $user = User::find($userId);
        if ($user) {
            // Update the account status
            $user->account_status = $accountStatus;
            $user->save(); // Save the changes to the database

            return back()->with('success', 'User account status updated successfully');
        }

        return back()->withErrors(['error' => 'User not found']);
    }
}
