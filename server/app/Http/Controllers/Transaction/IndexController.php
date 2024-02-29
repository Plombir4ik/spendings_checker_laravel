<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function __invoke(Request $request)
    {
        $data = $request->all();
        $page = $data['page'] ?? 1;

        $transactionsQuery = auth()->user()->transactions()->getQuery();

        if(isset($data['categoryId'])){
            $transactionsQuery->where('category_id', $data['categoryId']);
        }

        $transactions = $transactionsQuery->orderBy('date', 'DESC')->paginate(20, ['*'], 'page', $page);

        $transactions->setPath('');

        return TransactionResource::collection($transactions);

    }
}
