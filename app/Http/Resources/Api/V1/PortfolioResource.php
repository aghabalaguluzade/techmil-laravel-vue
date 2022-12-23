<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class PortfolioResource extends JsonResource
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
            'url' => $this->url,
            'img' => asset($this->img),
            'tags' => $this->whenLoaded('tagged', function() {
            // return $this->tagged;  
            return $this->tagNames();
        }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
