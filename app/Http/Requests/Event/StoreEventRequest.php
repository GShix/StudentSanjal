<?php

namespace App\Http\Requests\Event;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
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
            'event_image'=>['required','mimes:png,jpg,jpeg,gif'],
            'title'=>['required','string'],
            'description'=>['required','string'],
            'host_image'=>['required','mimes:png,jpg,jpeg,gif'],
            'host'=>['required','string'],
            'start_date'=>['required','string'],
            'start_time'=>['required','string'],
            'end_date'=>['nullable','string'],
            'end_time'=>['nullable','string'],
            'attendees'=>['nullable','string'],
            'entry_type'=>['required','string'],
            'entry_fee'=>['nullable','integer'],
            'event_type'=>['required','string'],
            'address'=>['nullable','string'],
            'venue'=>['nullable','string'],
            'external_event_link'=>['nullable','string'],
            'event_status'=>['nullable','string'],
        ];
    }
}
