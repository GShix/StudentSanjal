<?php

namespace App\Http\Requests\Auth;

use Illuminate\Validation\Rules;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'profile_image'=>['nullable','mimes:jpeg,png,jpg,gif,svg'],
            'banner_image'=>['nullable','mimes:jpeg,png,jpg,gif,svg'],
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'last_name'=>['required','string'],
            'username'=>['nullable','string'],
            'headline'=>['nullable','string'],
            'dob'=>['required','string'],
            'gender'=>['required','string'],
            'email' => ['required', 'email', 'unique'],
            'password'=>['required','string'],
            'password_confirmation'=>['reauired','string','same:password'],
            'user_role'=>['nullable'],
            'active_status'=>['nullable','boolean'],
            'account_status'=>['nullable'],
        ];
    }
}
