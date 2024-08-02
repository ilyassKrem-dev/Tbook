<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Friend;
use App\Models\User;
use App\Http\Requests\FriendRequest;
class FriendsController extends Controller
{
    

    function sendFriendRequest(FriendRequest $request) {
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
        $friend = Friend::where(function($query) use($data,$id) {
            $query->where("user",$data["user_id"])
                    ->where("friend",$id);
                    })
                    ->orWhere(function($query) use($data,$id) {
                        $query->where("friend",$data["user_id"])
                                ->where("user",$id);
                                })
                        ->first();
        
        if(!$friend) {
            return response()->json(["status"=>""]);
        }
        return response()->json(["status"=>$friend]);
    }   
    function removeFriend(Request $request) {
        $data = $request->only(["user_id","profile_id","type"]);
        if($data['type'] == "request") {
            $friendRequest = Friend::where('user',$data['profile_id'])
                            ->where("friend",$data['user_id'])
                            ->first();
            $friendRequest->delete();
            return response()->json(["success"=>true],200);
        }
        $friend = Friend::where(function($query) use($data) {
            $query->where("user",$data["user_id"])
                    ->where("friend",$data["profile_id"]);
                    })
                    ->orWhere(function($query) use($data) {
                        $query->where("friend",$data["user_id"])
                                ->where("user",$data["profile_id"]);
                                })
                            ->first();
        $friend->delete();
        return response()->json(["success"=>true],200);
    }
    function addFriend(Request $request) {
        $data = $request->only(["user_id","profile_id"]);
        $friend = Friend::where("user",$data['profile_id'])->first();
        $friend->update(["status"=>"friends"]);
        return response()->json(["success"=>true],200);
    }
    
}
