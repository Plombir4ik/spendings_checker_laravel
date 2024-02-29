<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\Request;

class AllCategoriesController extends Controller
{
    public function __invoke()
    {
        $data = auth()->user()->categories;
        return response()->json(CategoryResource::collection($data));
    }
}
