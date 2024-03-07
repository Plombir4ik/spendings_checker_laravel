<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;
use App\Http\Requests\Report\ReportRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;


class PieController extends Controller
{
    public function __invoke(ReportRequest $request)
    {
        $data = $request->validated();
        $transactions = Transaction::where('date', '>', $data['date_from'])
            ->where('date', '<', $data['date_to'])
            ->where('type', $data['type'])
            ->get();

        $result = [];
        foreach ($transactions as $transaction) {
            if (isset($result[$transaction->category_name])) {
                $result[$transaction->category_name]['sum'] += $transaction->sum;
            } else {
                $result[$transaction->category_name] = [
                    'name' => $transaction->category_name,
                    'sum' => $transaction->sum
                ];
            }
        }

        $dates = array_values($result);
        return response()->json($dates);
    }
}
