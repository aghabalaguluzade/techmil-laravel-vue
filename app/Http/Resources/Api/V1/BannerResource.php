<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class BannerResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'backgroundImage' => asset($this->backgroundImage),
            'number' => $this->number,
            'status' => $this->status,
            'whatsapp' => $this->whatsapp,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
