<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'profile_picture'=>['nullable','string'],
            'first_name' => ['required', 'string', 'max:255'],
            'surname'=>['required','string'],
            'username'=>['required','string'],
            'headline'=>['nullable','string'],
            'dob'=>['nullable','string'],
            'gender'=>['required','string'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'password'=>['nullable','string'],
            'confirm_password'=>['nullable','string','same:password'],
            'active_status'=>['nullable','boolean'],
        ];
    }
}
