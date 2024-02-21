<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckCategoryOwnership
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $category = $request->route('category');

        if($category['user_id'] != auth()->id()){
            return response()->json(['Not allowed'], 405);
        }

        return $next($request);
    }
}
