<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function __invoke(StoreRequest $request)
    {
        $data = $request->validated();

        $res = Category::firstOrCreate([
            'name' => $data['name']
        ], [
            'name' => $data['name'],
            'description' => $data['description'],
            'user_id' => auth()->id(),
        ]);

        return response()->json(new CategoryResource($res));
    }
}
