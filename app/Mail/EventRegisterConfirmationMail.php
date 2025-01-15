<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;

class EventRegisterConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $msg;
    public $sub;

    /**
     * Create a new message instance.
     *
     * @param string $msg
     * @param string $sub
     */
    public function __construct($msg, $sub)
    {
        $this->msg = $msg;
        $this->sub = $sub;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function envelope():Envelope
    {
        return new Envelope(
            subject:$this->subject,
        );
    }

    public function content():Content
    {
        return new Content(
            view:'app'

        );
    }

}
