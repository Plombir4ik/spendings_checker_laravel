<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use App\Models\Transaction;

class DeleteController extends Controller
{
    public function __invoke(Transaction $transaction)
    {
        $transaction->delete();

        return response()->json(['Deleted'], 200);
    }
}
