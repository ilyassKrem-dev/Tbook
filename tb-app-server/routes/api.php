<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::controller(UserController::class)
    ->group(function() {
        Route::post('/signin',"signin");
        Route::post('/login',"login");
        Route::post('/user',"fetchUser");
        Route::post("/getuser","getUsetData");
        Route::patch("/addBio","addBio");
    });
Route::controller(PostController::class)
    ->group(function() {
        Route::post('/addpost',"addPost");
    });