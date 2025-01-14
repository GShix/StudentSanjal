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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('event_image');
            $table->string('title');
            $table->longText('description');
            $table->string('host_image');
            $table->string('host');
            $table->string('start_date');
            $table->string('start_time')->nullable();
            $table->string('end_date')->nullable();
            $table->string('end_time')->nullable();
            $table->integer('attendees')->nullable();
            $table->string('entry_type');
            $table->string('entry_fee')->nullable();
            $table->string('event_type');
            $table->string('address')->nullable();
            $table->string('venue')->nullable();
            $table->text('external_event_link')->nullable();
            $table->enum('event_status',['upcomming','live','postponed','ended'])->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
