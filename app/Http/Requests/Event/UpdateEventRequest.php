<?php

namespace App\Http\Requests\Event;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'event_image'=>['nullable','string'],
            'title'=>['nullable','string'],
            'description'=>['nullable','string'],
            'host_image'=>['nullable','mimes:png,jpg,jpeg,gif'],
            'host'=>['nullable','string'],
            'start_date'=>['nullable','string'],
            'end_date'=>['nullable','string'],
            'attendees'=>['nullable','string'],
            'entry_type'=>['nullable','string'],
            'entry_fee'=>['nullable','integer'],
            'event_type'=>['nullable','string'],
            'venue'=>['nullable','string'],
            'event_status'=>['nullable','string'],
        ];
    }
}
