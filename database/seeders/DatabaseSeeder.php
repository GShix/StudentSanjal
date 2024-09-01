<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'first_name' => 'Admin',
            'account_status' => 'verified',
            'user_role' => 'admin',
            'email' => 'admin@admin.com',
        ]);
        User::factory()->create([
            'first_name' => 'Dambar',
            'headline' => 'Laravel Developer | Reactjs',
            'username' => '@dambarsing',
            'active_status' => true,
            'account_status' => 'verified',
            'user_role' => 'user',
            'email' => 'dambar@dambar.com',
        ]);
        User::factory()->create([
            'first_name' => 'Amar',
            'headline' => 'Python Developer | HTML, CSS',
            'username' => '@amarkk',
            'active_status' => true,
            'account_status' => 'verified',
            'user_role' => 'user',
            'email' => 'amar@amar.com',
        ]);
    }
}
