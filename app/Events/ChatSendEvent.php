<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class ChatSendEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public $chats;
    /**
     * Create a new event instance.
     */
    public function __construct($chats)
    {
        $this->chats = $chats;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        // dd($this->chats);
        return [
            new Channel('student-sanjal.'.$this->chats->receiver_id),
        ];
    }


    public function broadcastWith(): array
    {
        return [
            'id' => $this->chats->id,
            'sender_id' => $this->chats->sender_id,
            'receiver_id' => $this->chats->receiver_id,
            'text_field' => $this->chats->text_field,
            'media' => $this->chats->media,
            'like' => $this->chats->like,
            'created_at' => $this->chats->created_at->toDateTimeString(),
        ];
    }
}
