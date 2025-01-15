<?php

namespace App\Http\Requests\Chat;

use Illuminate\Foundation\Http\FormRequest;

class StoreChatRequest extends FormRequest
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
            'document'=>['nullable','mimes:pdf,docx','max:10240'],
            'media'=>['nullable','mimes:jpg,png,jpg,jpeg,mp4','max:5120'],
            'text_field'=>['nullable','string','max:20000'],
            'like'=>['nullable','string'],
        ];
    }
}
