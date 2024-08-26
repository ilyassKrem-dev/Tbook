<?php

use App\Http\Controllers\CommentControllere;
use App\Http\Controllers\convos\ConvosController;
use App\Http\Controllers\convos\MessageController;
use App\Http\Controllers\FriendsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserInfoController;
use App\Http\Controllers\UserMiscController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::controller(UserController::class)
    ->group(function() {
        Route::post('/signin',"signin");
        Route::post('/login',"login");
        Route::post('/user',"fetchUser");
        Route::get("/getuser/{username}","getUserData");
        Route::patch("/addBio","addBio");
        Route::get("/{userId}/getUserPosts","getUserPosts");
        Route::put("/changePicture","changePicture");
        Route::get("/results","getSearchResults");
    });
Route::controller(UserInfoController::class)
    ->group(function() {
        Route::put("/{username}/update","updateUserInfo");
    });
Route::controller(UserMiscController::class)
    ->group(function() {
        Route::get("/{id}/notifications","getUserNotifications");
        
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
        Route::post('/{id}/getFriendStatus',"getFriendStatus");
        Route::post("/removeFriend","removeFriend");
        Route::post("/addFriend","addFriend");
        Route::get("/{id}/friends","fetchAllUserFriends");
        Route::get("/{id}/allfriends","getFriendsAndRequests");
        Route::get("/{id}/userRequests","getUserRequests");

    });
Route::controller(ConvosController::class)
    ->group(function() {

        Route::post("/getConvo","findOrAddConvo");
       
    });

Route::controller(MessageController::class)
        ->group(function() {
            Route::post("/sendMsg","addMessage");
            Route::post("/addReaction","addReaction");
            Route::post("/setAllSeen","setAllSeen");
            Route::patch("/{convoId}/changeStatus","changeConvoStatus");
            Route::get("/{convoId}/messages/{lastMsg}","getMoreMessages");
        });