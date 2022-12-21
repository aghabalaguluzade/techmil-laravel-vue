<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
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
        if($method == 'POST') {
                return [
                    'name' => ['required','string','min:3','max:255'],
                    'surname' => ['required','min:6','max:255'],
                    'email' => ['string','required' ,'email','max:255','unique:App\Models\Contact,email'],
                    'subject' => ['required','max:255'],
                    'message' => ['required']
                ];
        }else {
                return [
                    'name' => ['sometimes','required','string','min:3','max:255'],
                    'surname' => ['sometimes','required','min:6','max:255'],
                    'email' => ['sometimes','string','email','max:255','unique:App\Models\Contact,email'],
                    'subject' => ['sometimes','required','max:255'],
                    'message' => ['sometimes','required']
                ];
        }
    }
}