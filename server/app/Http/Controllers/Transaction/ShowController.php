<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\TransactionResource;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;

class ShowController extends Controller
{
    public function __invoke(Transaction $transaction)
    {
        return response()->json(new TransactionResource($transaction));
    }
}
