<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Note\StoreNoteRequest;
use App\Http\Requests\Note\UpdateNoteRequest;

class NoteController extends Controller
{
    public function store(StoreNoteRequest $request)
    {
        // Note::create($request->validated()+['user_id'=> Auth::user()->id]);
        Note::create([
            'title' => $request->validated('title'),
            'user_id' => Auth::id(),  // Associate the note with the logged-in user
        ]);


        return back()->with('success','Note created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Note $note)
    {
        return Inertia::render('Notes/Edit', [
            'note' => $note,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNoteRequest $request, Note $note)
    {
        // Ensure the user is authorized to update this note
        if ($note->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $note->update($request->validated());

        return back()->with('success', 'Note updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        $note->delete();

        return back()->with('success', 'Note deleted successfully');
    }
    // if (!$note) {
    //     return back()->withErrors('Note not found.');
    // }

    // if ($note->user->user_id !== Auth::id()) {
    //     abort(403, 'Unauthorized action');
    // }
}
