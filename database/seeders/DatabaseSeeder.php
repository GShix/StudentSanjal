<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Admin;
use App\Models\Skill;
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
        Admin::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password'=>'password'
        ]);
        User::factory()->create([
            'first_name' => 'Manish',
            'middle_name' => 'T',
            'last_name' => 'Gurung',
            'headline' => 'Mid Developer | Founder at NyanoGhar ',
            'active_status' => true,
            'account_status' => 'verified',
            'user_role' => 'user',
            'email' => 'manish@manish.com',
        ]);
        User::factory()->create([
            'first_name' => 'Dambar',
            'middle_name' => 'Sing',
            'last_name' => 'Gharti',
            'headline' => 'Laravel Developer | Reactjs',
            'active_status' => true,
            'account_status' => 'verified',
            'user_role' => 'user',
            'email' => 'dambar@dambar.com',
        ]);
        User::factory()->create([
            'first_name' => 'Amar',
            'last_name' => 'Khadka',
            'headline' => 'Python Developer | HTML, CSS',
            'active_status' => true,
            'account_status' => 'verified',
            'user_role' => 'user',
            'email' => 'amar@amar.com',
        ]);
        User::factory()->create([
            'first_name' => 'Shishir',
            'middle_name' => 'Singh',
            'last_name' => 'Thakuree',
            'headline' => 'Python Developer | Data Sceience | ML',
            'active_status' => true,
            'account_status' => 'verified',
            'user_role' => 'user',
            'email' => 'shishir@shishir.com',
        ]);

        $skills = ['PHP', 'Laravel', 'React', 'Tailwind CSS', 'Vue.js', 'JavaScript', 'Redis'];

        foreach ($skills as $skill) {
            Skill::create(['name' => $skill]);
        }


    }
}
