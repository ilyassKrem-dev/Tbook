<?php

use App\Http\Controllers\CommentControllere;
use App\Http\Controllers\FriendsController;
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
        Route::get("/getuser/{username}","getUsetData");
        Route::patch("/addBio","addBio");
        Route::get("/{userId}/getUserPosts","getUserPosts");
        Route::put("/changePicture","changePicture");
        Route::get("/results","getSearchResults");
    });
Route::controller(PostController::class)
    ->group(function() {
        Route::post('/addpost',"addPost");
        Route::post("/likePost","likePost");
        Route::get("/getAllPosts","getAllPosts");
        
    });
Route::controller(CommentControllere::class)
    ->group(function() {
        Route::post('/addComment',"addComment");
        Route::get("/{postId}/getComments","getComments");
        Route::post("/likeComment","likeComment");
    });

Route::controller(FriendsController::class)
    ->group(function() {
        Route::post("/sendRequest","sendFriendRequest");

    });