<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function __invoke(Request $request)
    {
        $data = $request->all();
        $page = $data['page'] ?? 1;

        $pagination_data  = auth()->user()->categories()->paginate(10, ['*'], 'page', $page);

        $pagination_data->setPath('');

        return CategoryResource::collection($pagination_data);
    }
}
