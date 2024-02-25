<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'categoryId' => $this->category_id,
            'categoryName' => $this->category_name,
            'userId' => $this->user_id,
            'type' => $this->type,
            'sum' => $this->sum,
            'dateInfo' => $this->date,
            'description' => $this->description,
        ];
    }
}
