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
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('following')->nullable()->constrained('users')->onDelete('cascade'); // The user being followed
            $table->foreignId('followers')->nullable()->constrained('users')->onDelete('cascade'); // The follower
            $table->boolean('friends')->default(false); // Whether they are friends (optional)
            $table->boolean('unfollowed')->default(false); // To mark if unfollowed (optional)
            $table->boolean('blocked')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('connection_circle');
    }
};
