<?php

namespace App\Http\Requests\Transaction;

use App\Http\Requests\CustomFormRequest;

class StoreRequest extends CustomFormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'categoryId' => 'integer|required',
            'type' => 'string|required',
            'sum' => 'numeric|required',
            'dateInfo' => 'date|required',
            'description' => 'string|nullable',
        ];
    }
}
