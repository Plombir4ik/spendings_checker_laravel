<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;
use App\Http\Requests\Report\ReportRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;

class LineController extends Controller
{
    public function __invoke(ReportRequest $request)
    {
        $data = $request->validated();
        $transactions = Transaction::where('date', '>=', $data['date_from'])
            ->where('date', '<', $data['date_to'])
            ->where('type', $data['type'])
            ->get();

        $result = [];
        foreach ($transactions as $transaction) {
            $date = substr($transaction->date, 0, 10);

            if (isset($result[$date])) {
                $result[$date]['sum'] += $transaction->sum;
            } else {
                $result[$date] = [
                    'date' => $date,
                    'sum' => $transaction->sum
                ];
            }
        }

        $dates = array_values($result);
        usort($dates, function($a, $b) {
            return strtotime($a['date']) - strtotime($b['date']);
        });
        return response()->json($dates);
    }
}
