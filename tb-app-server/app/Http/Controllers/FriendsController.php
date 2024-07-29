<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Friend;
use App\Models\User;
use App\Http\Requests\FreindRequest;
class FriendsController extends Controller
{
    

    function sendFriendRequest(FreindRequest $request) {
        $data = $request->validated();
        Friend::create([
            "user"=>$data["user"],
            "friend"=>$data["friend"],
            "status"=>"request",
            "status_by"=>$data["user"]
        ]);
        $user = User::where("id",$data['user'])->first();
        $req = [
            "user"=>[
                "id"=>$user->id,
                "name"=>$user->name,
                "username"=>$user->username,
                "image"=>$user->image
            ],
            "data"=>null,
            "msg"=>"Request sent"
        ];
        return response()->json(compact('req'),200);
    }
    function getFriendStatus(Request $request,$id) {
        $data = $request->only(["user_id"]);
        $friend = Friend::where("user",$data['user_id'])
                        ->where("friend",$id)
                        ->first();
        
        if(!$friend) {
            return response()->json(["status"=>""]);
        }
        return response()->json(["status"=>$friend->status]);
    }   

    
}
