<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MessageRequest extends FormRequest
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
            "convo_id"=>"required",
            "sender"=>"required",
            "receiver"=>"required",
            "reaction"=>"sometimes|nullable",
            "content"=>"sometimes|nullable|string",
            "medias"=>"sometimes|nullable"
        ];
    }
}
