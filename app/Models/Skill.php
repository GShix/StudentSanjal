<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Skill extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable =[
        'name'
    ];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
