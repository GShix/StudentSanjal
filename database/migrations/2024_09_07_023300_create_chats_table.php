<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('connection_id')->constrained('connection_circles')->onDelete('cascade'); // Link to connection
            $table->foreignId('sender_id')->constrained('users')->onDelete('cascade'); // Sender user
            $table->foreignId('receiver_id')->constrained('users')->onDelete('cascade'); // Receiver user
            $table->text('text_field')->nullable(); // Chat message
            $table->string('media')->nullable(); // Media file URL
            $table->boolean('liked')->default(false); // Indicates if the message was liked
            $table->softDeletes(); // Soft delete
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chats');
    }
};
