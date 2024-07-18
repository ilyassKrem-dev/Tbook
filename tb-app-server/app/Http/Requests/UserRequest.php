<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            "name"=>"required|string|min:3|max:20",
            "email"=>"required|string|email|unique:users,email",
            "username"=>"required|min:2|max:30|string|unique:users,username",
            "password"=>"required|string|min:6|max:255",
            "password_confirm"=>"required|string|same:password",
            "gender"=>"required|string",
            "birthdate"=>"required|date|date_format:d-M-Y"
        ];
    }
}
