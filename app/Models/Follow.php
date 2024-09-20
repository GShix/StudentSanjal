<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Follow extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = 'followers';

    protected $fillable = [
        'user_id',
        'follwer_id'
    ];
}
