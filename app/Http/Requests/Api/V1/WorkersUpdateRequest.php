<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class WorkersUpdateRequest extends FormRequest
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
        $method = $this->method();
        if($method == 'PUT') {
            return [
                "name" => ["string",'max:255'],
                "description" => ["string"],
                "position" => ["string",'max:255'],
                // "img" => ['image','mimes:png,jpg,jpeg,gif,jfif,webp','max:2048'],
                "website" => ["url"],
                "linkedin" => ["url"],
                "github" => ["url"]
            ];
        }else {
            return [
                "name" => ["sometimes","required",'max:255'],
                "description" => ["sometimes","required"],
                "position" => ["sometimes", "required",'max:255'],
                "img" => ["sometimes","required",'image','mimes:png,jpg,jpeg,gif,jfif,webp','max:2048'],
                "website" => ["sometimes","url"],
                "linkedin" => ["sometimes","url"],
                "github" => ["sometimes","url"]
            ];
        }
    }
}
