<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoryRequest extends FormRequest
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
            "text"=>"sometimes|nullable|string",
            "media"=>"sometimes|nullable|string",
            "type"=>"required",
            "mediaClass"=>"sometimes|nullable|string",
            "bgColor"=>"sometimes|nullable|string",
            "textColor"=>"required",
            "visibility"=>"required"
        ];
    }
}
