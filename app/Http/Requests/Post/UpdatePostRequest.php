<?php

namespace App\Http\Requests\Post;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
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
            'post_description'=>['nullable','string'],
            'post_love_count'=>['nullable','integer'],
            'media'=>['nullable','mimes:jpeg,png,jpg,gif,svg, mp4'],
            'job' => ['nullable', 'string', 'max:255'],
            'event' => ['nullable', 'string', 'max:255'],
        ];
    }
}
