<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\PortfolioRequest;
use App\Http\Resources\Api\V1\PortfolioResource;
use App\Models\Portfolio;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PortfolioResource::collection(Portfolio::with('tagged')->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PortfolioRequest $request)
    {
        $data = $request->validated();
        $image = $request->file("img");
        $directory = "uploads/portfolios/";
        $image_name = Str::slug($request->title). '.' . $image->getClientOriginalExtension();
        $image->move($directory,$image_name);
        $image_name = $directory.$image_name;
        $data["img"] = $image_name;
        $portfolio = Portfolio::create($data);
        $tags = explode(",", $request->input('tags'));
        $portfolio->tag($tags);
        return new PortfolioResource($portfolio);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Portfolio  $portfolio
     * @return \Illuminate\Http\Response
     */
    public function show(Portfolio $portfolio)
    {
        return new PortfolioResource($portfolio);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Portfolio  $portfolio
     * @return \Illuminate\Http\Response
     */
    public function edit(Portfolio $portfolio)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Portfolio  $portfolio
     * @return \Illuminate\Http\Response
     */
    public function update(PortfolioRequest $request, Portfolio $portfolio)
    {
        if($request->hasFile("img")) {
            $data = $request->validated();
            $image = $request->file("img");
            $directory = "uploads/portfolios/";
            $image_name = Str::slug($request->title). '.' . $image->getClientOriginalExtension();
            if(file_exists($portfolio->img)) {
                unlink($portfolio->img);
            };
            $image->move($directory,$image_name);
            $image_name = $directory.$image_name;
            $data["img"] = $image_name;
            $portfolio->update($data);
            return new PortfolioResource($portfolio);
        }
        $portfolio->update($request->validated());
        return new PortfolioResource($portfolio);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Portfolio  $portfolio
     * @return \Illuminate\Http\Response
     */
    public function destroy(Portfolio $portfolio)
    {
        $portfolio->delete();
        return response()->noContent();
    }
}
