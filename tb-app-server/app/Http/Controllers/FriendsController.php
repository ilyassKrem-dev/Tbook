<?php

namespace App\Http\Controllers;

use App\Helpers\Helpers;
use Illuminate\Http\Request;
use App\Models\Friend;
use App\Models\User;
use App\Http\Requests\FriendRequest;
use App\Models\convos\Convos;
use App\Models\convos\Messages;

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
    function fetchAllUserFriends($id) {
        $user = User::where("id",$id)->first();
        $friends = Friend::where(function($query) use($id) {
            $query->where("user",$id)
                    ->orWhere("friend",$id);
        })
            ->where("status","friends")
            ->get();
        $friendsList = [];
        foreach($friends as $friend) {
            $userInfo = User::where("id",$friend->user)->first();
            $otherInfo = User::where("id",$friend->friend)->first();
            $friendInfo = $user->id === $userInfo->id ? $otherInfo : $userInfo;
            $convo = Convos::where(function($query) use($friend,$user){
                    $query->where(function($query) use($friend) {
                        $query->where("user1",$friend->user)
                                ->orWhere("user1",$friend->friend);
                                })
                            ->where("user2",$user->id);
                })
                ->orWhere(function($query) use($friend,$user){
                    $query->where(function($query) use($friend) {
                            $query->where("user2",$friend->user)
                                ->orWhere("user2",$friend->friend);
                                })
                            ->where("user1",$user->id);
                })->first();
            $unseenMsgs = Messages::where("convo_id",$convo->id)
                            ->where("receiver",$user->id)
                            ->where("seen",false)
                            ->count();
            $info = [
                "id"=>$friend->id,
                "friend"=>[
                    "id"=>$friendInfo->id,
                    "status"=>$friendInfo->status,
                    "name"=>$friendInfo->name,
                    "username"=>$friendInfo->username,
                    "image"=>$friendInfo->image
                ],
                "unseenMsgs"=>$unseenMsgs,
                "convoId"=>$convo->id,
                "user"=>$user->id,
                "status"=>$friend->status,
                "status_by"=>$friend->status_by
            ];
            array_push($friendsList,$info);
        }
        return response()->json(["data"=>$friendsList],200);
    }

    function getFriendsAndRequests($id) {
        $us = User::where("id",$id)->first();
        $requests = Friend::where("friend",$id)
                            ->where("status","request")
                            ->get();
        $friendReq = Helpers::addInfoToFriends($requests,true);
        $friendIds  = Friend::where(function($query) use($id) {
            $query->where("user", $id)
                  ->orWhere("friend", $id);
        })
            ->where("status", "friends")
            ->pluck('user')
            ->merge(Friend::where(function($query) use($id) {
                $query->where("user", $id)
                    ->orWhere("friend", $id);
            })
            ->where("status", "friends")
            ->pluck('friend'))
            ->unique()
            ->filter(function($friendId) use($id) {
                return $friendId != $id;
            })
            ->values(); 
        $requestsFrom = Friend::where("friend",$id)
                            ->where("status","request")
                            ->pluck("user")
                            ->merge(Friend::where("user",$id)
                            ->where("status","request")
                            ->pluck("friend"))
                            ->unique()
                            ->filter(function($friendId) use($id) {
                                return $friendId != $id;
                            })
                            ->values();
        $otherFriends = User::where("id","!=",$id)
            ->orderByRaw( 
            "CASE WHEN country = ? THEN 0 ELSE 1 END, country",[$us->country]
            )
            ->inRandomOrder()
            ->take(40)
            ->get()
            ->filter(function($user) use ($friendIds) {
                return !$friendIds->contains($user->id);
            })
            ->filter(function($user) use($requestsFrom) {
                return !$requestsFrom->contains($user->id);
            });
            
        
        $otherFriendsInfo = Helpers::addInfoToFriends($otherFriends,false);
        $response = [
            "requests"=>$friendReq,
            "others"=>$otherFriendsInfo
        ];
        return response()->json(["data"=>$response],200);
    }
    function getUserRequests($id) {
        $currentUser = User::where("id",$id)->first();
        $requests = Friend::where("user",$currentUser->id)
                        ->where("status","request")
                        ->get();
        $friendsInfo = [];
        foreach($requests as $request) {
            $user = User::where("id",$request->friend)->first();
            array_push($friendsInfo,[
                "id"=>$request->id,
                "status"=>$request->status,
                "user"=>[
                    "id"=>$user->id,
                    "name"=>$user->name,
                    "username"=>$user->username,
                    "image"=>$user->image,
                    "country"=>$user->country
                ]
            ]);
        }
        return response()->json(["data"=>$friendsInfo],200);
    }     
}
