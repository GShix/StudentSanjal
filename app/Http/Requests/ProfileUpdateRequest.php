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
            'profile_image'=>['nullable','mimes:jpeg,png,jpg,gif,svg'],
            'banner_image'=>['nullable','mimes:jpeg,png,jpg,gif,svg'],
            'first_name' => ['nullable', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'last_name'=>['nullable','string'],
            'username'=>['nullable','string'],
            'headline'=>['nullable','string'],
            'dob'=>['nullable','string'],
            'gender'=>['nullable','string'],
            'email' => ['nullable', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'password'=>['nullable','string'],
            'password_confirmation'=>['nullable','string','same:password'],
            'active_status'=>['nullable','boolean'],
        ];
    }
}
