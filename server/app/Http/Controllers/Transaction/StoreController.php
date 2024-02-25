<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
//use App\Http\Requests\Transaction\StoreRequest;
use App\Http\Requests\Transaction\StoreRequest;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;


class StoreController extends Controller
{
    public function __invoke(StoreRequest $request)
    {

        $data = $request->validated();

        $res = Transaction::Create([
            'category_id' => $data['categoryId'],
            'user_id' => auth()->id(),
            'type' => $data['type'],
            'sum' => $data['sum'],
            'date' => $data['dateInfo'],
            'description' => $data['description'],
        ]);

        return response()->json(new TransactionResource($res));
    }
}
