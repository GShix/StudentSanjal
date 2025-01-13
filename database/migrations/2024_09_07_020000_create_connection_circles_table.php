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
        Schema::create('connection_circles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Initiating user
            $table->foreignId('connected_user_id')->constrained('users')->onDelete('cascade'); // Connected user
            $table->enum('connection_type', ['following', 'unfollowed', 'blocked'])->default('following'); // Define connection types
            $table->softDeletes();
            $table->timestamps();

            // Add a unique constraint to avoid duplicate connections
            $table->unique(['user_id', 'connected_user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('connection_circles');
    }
};
