<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Event\StoreEventRequest;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::latest()->get();
        return Inertia::render('Events',['events'=>$events]);
    }

    public function store(StoreEventRequest $request)
    {
        $user = Auth::user();
        $validated= $request->validated();
        $validated['user_id'] =$user->id;
        // dd($validated);

        Event::create($validated);

        return to_route('event.index')->with('success','Event created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function eventDetail(Event $event)
    {
        $user = Auth::user();
        $host = User::where('id',$event->user_id)->first();
        // dd($host);
        return Inertia::render("EventDetail",[
            'event'=>$event,
            'host'=>$host,
            'user'=>$user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        //
    }
}
