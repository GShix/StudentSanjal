<?php

namespace Database\Factories;

use App\Models\Admin;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Skill>
 */
class AdminFactory extends Factory
{
    // protected $model = Admin::class;
    protected static ?string $password;
    /**
     * Define the model's default state
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
           'name' => fake()->name(),
           'email' => fake()->unique()->safeEmail(),
        //    'email_verified_at' => now(),
           'password' => static::$password ??= Hash::make('password'),
        //    'remember_token' => Str::random(10),
        ];
    }
}
