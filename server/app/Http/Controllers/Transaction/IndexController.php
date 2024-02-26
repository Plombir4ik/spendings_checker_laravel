<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\TransactionResource;

class IndexController extends Controller
{
    public function __invoke()
    {
        $categories = auth()->user()->categories;
        $transactions = auth()->user()->transactions()->orderBy('date', 'desc')->get();

//        TransactionResource

        return response()->json([
            'transactions' => TransactionResource::collection($transactions),
            'categories' => CategoryResource::collection($categories)]);

    }
}
