<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class WorkersCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "name" => ["required",'max:255'],
            "description" => ["required"],
            "position" => ["required",'max:255'],
            "img" => ["required",'image','mimes:png,jpg,jpeg,gif,jfif,webp','max:2048'],
            "website" => ["url"],
            "linkedin" => ["url"],
            "github" => ["url"]
        ];
    }
}
