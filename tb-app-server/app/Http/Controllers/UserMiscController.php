<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\User;
class UserMiscController extends UserController
{
    function getUserNotifications($id) {
        $user = User::where("id",$id)->first();
        $requests = Friend::where('friend',$user->id)
                    ->where("status","request")
                    ->take(5)
                    ->get();
        $newData = [];
        foreach($requests as $request) {
            $user = User::where("id",$request->user)->first();
            array_push($newData,[
                "user"=>[
                    "id"=>$user->id,
                    "image"=>$user->image,
                    "name"=>$user->name,
                    "username"=>$user->username
                ],
                "data"=>null,
                "msg"=>"{$user->name} sent a friend request"
            ]);
            
        
        }

        return response()->json(['data'=>$newData],200);
    }
}
