<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
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
        if(request()->isMethod('post')){
            return [
                'comment_id' => 'string',
                'username' => 'required|string',
                'email' => 'required|string',
                'home_url' => 'nullable|string',
                'text_content' => 'required|string'
            ];
        }else{
            return [
                'comment_id' => 'string',
                'username' => 'required|string',
                'email' => 'required|string',
                'home_url' => 'nullable|string',
                'text_content' => 'required|string'
            ];
        }
    }
}
