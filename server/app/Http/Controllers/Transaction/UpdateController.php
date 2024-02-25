<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use App\Http\Requests\Transaction\StoreRequest;
use App\Models\Transaction;
use Illuminate\Http\Request;

class UpdateController extends Controller
{
    public function __invoke(StoreRequest $request, Transaction $transaction)
    {
        $data = $request->validated();

        $transaction->update([
            'category_id' => $data['categoryId'],
            'user_id' => auth()->id(),
            'type' => $data['type'],
            'sum' => $data['sum'],
            'date' => $data['dateInfo'],
            'description' => $data['description'],
        ]);

        return response()->json(['Updated'], 200);
    }
}
