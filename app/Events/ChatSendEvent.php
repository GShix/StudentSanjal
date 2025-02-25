<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ChatSendEvent implements ShouldBroadcast
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
        // \Log::info('Broadcasting chat message', [
        //     'channel' => 'student-sanjal.'.$this->chats->receiver_id,
        //     'message' => $this->chats->text_field,
        //     'sender' => $this->chats->sender_id,
        //     'receiver' => $this->chats->receiver_id
        // ]);

        return [
            new PrivateChannel('student-sanjal.'.$this->chats->receiver_id),
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
            'created_at' => $this->chats->created_at->toDateTimeString(),
        ];
    }
}
