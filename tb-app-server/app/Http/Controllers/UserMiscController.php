<?php

namespace App\Http\Controllers;

use App\Models\convos\Convos;
use App\Models\Friend;
use App\Models\User;
use Illuminate\Http\Request;

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
    function getUnblockedConvos($username,Request $request) {
        $req = $request->query("search");
        $user = User::where("username",$username)->first();
        if(!$user) {
            return response()->json(["error"=>"User not found"],404);
        }
        $query = Convos::where(function($query) use($user) {
            $query->where("user1",$user->id)
                ->orWhere("user2",$user->id);
        })
            ->whereNull("status");
        if(!$req) {
           $convos= $query->take(10)->get();

        } else {
           $convos = $query->get() ;
        }
        $convosDetails = [];
        foreach($convos as $convo) {
            $info = User::where("id",$convo->user1)->first();
            $info2 = User::where("id",$convo->user2)->first();
            $checkUser = $user->id === $info->id ? $info2:$info;
            if (!$req || str_starts_with(strtolower($checkUser->name), strtolower($req))) {
                $convosDetails[] = [
                    'id' => $convo->id,
                    'user' => $user->id,
                    'other' => [
                        'id' => $checkUser->id,
                        'image' => $checkUser->image,
                        'name' => $checkUser->name,
                        'username' => $checkUser->username,
                    ],
                ];
            }
        }
        return response()->json(["data"=>$convosDetails],200);
    }
    function blockConvo($username,Request $request) {
        $user = User::where("username",$username)->first();
        if(!$user) {
            return response()->json(["error"=>"User not found"],404);
        }
        $data = $request->validate([
            "convo_id"=>"required",
            "type"=>"required"
        ]);
        $convo_id = $data["convo_id"];
        $convo = Convos::where("id",$convo_id)->first();
        if($data["type"] === "block") {
            $convo->update([
                "status"=>"block",
                "status_by"=>$user->id
            ]);

        } else {
            $convo->update([
                "status"=>null,
                "status_by"=>null
            ]);
        }
        return response()->json(["msg"=>"succuss"],200);
    }
    function getBlockedConvos($username,Request $request) {
        $req = $request->query("search");
        $user = User::where("username",$username)->first();
        if(!$user) {
            return response()->json(["error"=>"User not found"],404);
        }
        $query = Convos::where(function($query) use($user) {
            $query->where("user1",$user->id)
                ->orWhere("user2",$user->id);
        })
            ->where("status","block")
            ->where("status_by",$user->id);
        if(!$req) {
           $convos= $query->take(5)->get();

        } else {
           $convos = $query->get() ;
        }
        $convosDetails = [];
        foreach($convos as $convo) {
            $info = User::where("id",$convo->user1)->first();
            $info2 = User::where("id",$convo->user2)->first();
            $checkUser = $user->id === $info->id ? $info2:$info;
            if (!$req || str_starts_with(strtolower($checkUser->name), strtolower($req))) {
                $convosDetails[] = [
                    'id' => $convo->id,
                    'user' => $user->id,
                    'other' => [
                        'id' => $checkUser->id,
                        'image' => $checkUser->image,
                        'name' => $checkUser->name,
                        'username' => $checkUser->username,
                    ],
                ];
            }
        }
        return response()->json(["data"=>$convosDetails],200);
    }
}
