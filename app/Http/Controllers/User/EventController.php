<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;
use App\Models\EventRegister;
use Illuminate\Support\Carbon;
use App\Mail\EventRegistrationMail;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\EventRegisterConfirmationMail;
use App\Http\Requests\Event\StoreEventRequest;
use App\Http\Requests\Event\UpdateEventRequest;
use App\Http\Requests\Event\StoreEventRegisterRequest;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::latest()->get();
        return Inertia::render('Event/Events',['events'=>$events]);
    }

    public function create()
    {
        return Inertia::render("Event/Create");
    }
    public function store(StoreEventRequest $request)
    {
        $user = Auth::user();
        $validated= $request->validated();
        $validated['user_id'] =$user->id;

        // dd($validated);

        Event::create($validated);

        // Event::create([
        //     ...$request->validated(),
        //     'user_id' => Auth::id(),
        // ]);


        return to_route('event.index')->with([
            'success' => 'Event created successfully',
            'createEvent' => false,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function eventDetail(Event $event)
    {
        $user = Auth::user();
        $host = User::where('id',$event->user_id)->first();
        // dd($user->id);
        $alreadyRegistered = EventRegister::where('user_id', $user->id)
        ->where('event_id', $event->id)
        ->exists();

        return Inertia::render("Event/EventDetail", [
        'event' => $event,
        'host' => $host,
        'user' => $user,
        'alreadyRegistered' => $alreadyRegistered, // Pass the boolean to the view
        ]);
    }
    public function join(Event $event)
    {
        return Inertia::render("Event/Join",[
            'event'=>$event,
        ]);
    }

    public function register(StoreEventRegisterRequest $request, Event $event)
    {
        $user = Auth::user();
        $validated= $request->validated();
        $validated['user_id'] =$user->id;
        $validated['event_id'] =$event->id;
        // dd($validated,$event->attendees);
        EventRegister::create($validated);
        $event->attendees += 1;
        $event->save();

        // $meetingLink = $event->external_event_link; // Assuming this is stored in the Event model
        // Mail::to($user->email)->send(new EventRegistrationMail($event, $user, $meetingLink));

        return to_route('event.index')->with([
            'success' => 'true',
            'message' => 'Registered successfully. Meeting link has been sent to your email.'
        ],201);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        return Inertia::render('Event/Edit',[
            'event'=>$event
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        $event->update($request->validated());
        return to_route('event.index')->with('success','Event updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        //
    }

    public function sendMail()
    {
        $to = "dambarsingghartimagar420@gmail.com";
        $msg = "This is the email body content.";
        $sub = "HIIIIIII";

        // Send the email using the mailable
        Mail::to($to)->send(new EventRegisterConfirmationMail($msg, $sub));

        return response()->json([
            'success' => true,
            'message' => 'Mail sent successfully!',
        ]);
    }

}
