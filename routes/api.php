<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/version', function () {
    return response()->json(['status' => 200, 'data' => ['Laravel' => app()->version()]], 200);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
