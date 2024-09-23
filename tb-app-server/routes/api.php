<?php

use App\Http\Controllers\CommentControllere;
use App\Http\Controllers\convos\ConvosController;
use App\Http\Controllers\convos\MessageController;
use App\Http\Controllers\FriendsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\user\PrivacyController;
use App\Http\Controllers\user\StoriesController;
use App\Http\Controllers\user\UserMoreInfoController;
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
        Route::get("/{userId}/getUserPosts/{loggedId}","getUserPosts");
        Route::put("/changePicture","changePicture");
        Route::get("/{id}/results","getSearchResults");
    });
Route::controller(UserInfoController::class)
    ->group(function() {
        Route::put("/{username}/update","updateUserInfo");
        Route::put("/{username}/update/password","changePassword");
        Route::post("/{id}/status","updateStatus");
    });
Route::controller(UserMiscController::class)
    ->group(function() {
        Route::get("/{id}/notifications","getUserNotifications");
        Route::get("/{username}/get_unblocked","getUnblockedConvos");
        Route::post("/{username}/block","blockConvo");
        Route::get("/{username}/get_blocked","getBlockedConvos");
        Route::get("/{userId}/profile/{profileId}/checkRequestPrivacy","checkProfileRequestPrivacy");
        Route::get("/{userId}/profile/{profileId}/friendsPrivacy","checkFriendsViewPrivacy");
        
        
    });
Route::controller(PostController::class)
    ->group(function() {
        Route::post('/addpost',"addPost");
        Route::post("/likePost","likePost");
        Route::get("/{id}/getAllPosts","getAllPosts");
        
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
        Route::get("/{id}/convos","getAllConvos");
        Route::get("/{user_id}/convo/{convo_id}","getConvo");
    });

Route::controller(MessageController::class)
        ->group(function() {
            Route::post("/sendMsg","addMessage");
            Route::post("/addReaction","addReaction");
            Route::post("/setAllSeen","setAllSeen");
            Route::patch("/{convoId}/changeStatus","changeConvoStatus");
            Route::get("/{convoId}/messages/{lastMsg}","getMoreMessages");
            Route::get("/{id}/ai_messages","getAiMessages");
            Route::delete("/{id}/ai_messages","ResetAiMessages");
        });
Route::controller(PrivacyController::class)
        ->group(function() {
            
            Route::get("/profile/{id}/privacy","getPostsPrivacy");
            Route::patch("/profile/{id}/privacy/posts/view","updatePostsPrivacy");
            Route::patch("/profile/{id}/privacy/contact/requests","updateRequests");
            Route::patch("/profile/{id}/privacy/contact/friends_list","updateViewFriendsList");
            Route::patch("/profile/{id}/privacy/contact/search","updateSearchView");
            Route::patch("/profile/{id}/privacy/notifications","updateNotifications");
        });
Route::controller(UserMoreInfoController::class)
        ->group(function() {
            Route::get("/profile/{id}/info","getMoreInfo");
            Route::put("/profile/{id}/info/update","changeInfo");
            Route::patch("/profile/{id}/info/delete","deleteInfo");
            
        });

Route::controller(StoriesController::class)
        ->group(function() {
            Route::post("/{id}/add_story","addStory");
            Route::get("/{id}/stories","getHomeStories");
            Route::get("/{id}/stories/get","getStories");
            Route::get("/{id}/stories/{username}","getUsernameStories");
        });