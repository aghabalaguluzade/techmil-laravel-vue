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
        // if(request()->isMethod('post')){
        //     return [
        //             'title' => ['required','string','max:255'],
        //             "img" => ['required','image','mimes:png,jpg,jpeg,gif,jfif,webp','max:2048'],
        //             'description' => ['required'],
        //             'url' => ['required','url'],
        //     ];
        // }else if(request()->isMethod('put')) {
        //     return [
        //             'title' => ['sometimes','required','string','max:255'],
        //             'description' => ['sometimes','required'],
        //             'url' => ['sometimes','required','url'],
        //             // 'img' => ['sometimes','image','mimes:png,jpg,jpeg,gif,jfif,webp','max:2048']
        //     ];
        // }else {
        //     return [
        //             'title' => ['sometimes','required','string','max:255'],
        //             'description' => ['sometimes','required'],
        //             'url' => ['sometimes','required','url'],
        //             'img' => ['sometimes','image','mimes:png,jpg,jpeg,gif,jfif,webp','max:2048']
        //     ];
        // }

        $method = $this->method();
        if($method == 'PUT') {
            return [
                "title" => ['string','max:255'],
                "description" => ['string'],
                // "img" => ['image','mimes:png,jpg,jpeg,gif,jfif,webp','max:2048'],
                'url' => ['sometimes','required','url'],
            ];
        }else {
            return [
                "title" => ['sometimes','required','max:255'],
                "description" => ['sometimes','required'],
                "img" => ['sometimes',"required",'image','mimes:png,jpg,jpeg,gif,jfif,webp','max:2048'],
                'url' => ['sometimes','required','url'],
            ];
        };
    }
}
