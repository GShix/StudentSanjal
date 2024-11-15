<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\StudentVerification;
use App\Http\Controllers\Controller;

class StudentVerificationController extends Controller
{

    public function index()
    {
        return Inertia::render('StudentVerificationPage');
    }

    public function create()
    {
        return Inertia::render('StudentDocumentUpload');
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'id_card_photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'expires_on' => 'required|date',
            'status' => 'nullable|string',
        ]);

        // dd($request->toArray());
        // Create the StudentVerification record
        StudentVerification::create([
            'user_id' => $request->input('user_id'),
            'id_card_photo' => $request->file('id_card_photo'), // File will be handled by the mutator
            'expires_on' => $request->input('expires_on'),
            'status' => $request->input('status'),
        ]);

        return redirect()->route('student.verify')->with('success', 'Your document sumbitted successfully.');
    }
}
