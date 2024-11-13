<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admin extends Model
{
    use Notifiable;
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password'
    ];
}
