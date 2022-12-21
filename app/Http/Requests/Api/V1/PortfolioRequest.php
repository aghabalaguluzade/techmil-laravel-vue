<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

    class PortfolioRequest extends FormRequest
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
        switch ($method) {
            case 'POST':
                return [
                    'title' => ['required','string','max:255'],
                    'description' => ['required'],
                    'url' => ['required','url'],
                    'tags' => ['required']
                ];
                break;
    
            case 'PUT':
                return [
                    'title' => ['sometimes','required','string','max:255'],
                    'description' => ['sometimes','required'],
                    'url' => ['sometimes','required','url'],
                ];
                break;
    
            default:
                // invalid request
                break;
        }
    }
}
