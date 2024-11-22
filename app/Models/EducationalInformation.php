<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EducationalInformation extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable =[
        'notify_network',
        'user_id',
        'institute_name',
        'field_of_study',
        'start_month',
        'start_year',
        'end_month',
        'end_year',
        'grade',
        'activities',
        'description'
    ];
}
