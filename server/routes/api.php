<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth',
    'namespace' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});
//
//Route::group([
//    'middleware' => 'auth',
//    'prefix' => 'categories',
//    'namespace' => 'category'
//], function () {
//    Route::get('/', 'IndexController');
//    Route::get('/{category}', 'ShowController')->middleware('category.owner');
//    Route::post('/', 'StoreController');
//    Route::patch('/{category}', 'UpdateController')->middleware('category.owner');
//    Route::delete('/{category}', 'DeleteController')->middleware('category.owner');
//});
//
//Route::group([
//    'middleware' => 'auth',
//    'prefix' => 'transactions',
//    'namespace' => 'transaction'
//], function () {
//    Route::get('/', 'IndexController');
//    Route::get('/{transaction}', 'ShowController');
//    Route::post('/', 'StoreController');
//    Route::patch('/{transaction}', 'UpdateController');
//    Route::delete('/{transaction}', 'DeleteController');
//});
