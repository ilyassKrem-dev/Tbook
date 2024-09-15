<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserMore;

class UserMoreInfoController extends UserController
{
    function getMoreInfo($id) {
        $user = User::find($id);
        if(!$user) {
            return response()->json(["error"=>"No user found"],404);
        }
        $moreInfo = UserMore::where("user",$user->id)->first();
        if(!$moreInfo) {
            $moreInfo = UserMore::create(["user"=>$user->id]);
        }
        return response()->json(["data"=>$moreInfo],200);
    }
    function changeInfo($id,Request $request) {
        $user = user::find($id);
        if(!$user) {
            return response()->json(['error'=>"No user found"],404);
        }
        $data = $request->validate([
            "value"=>"required|string",
            "type"=>"required|string"
        ]);
        $moreInfo = UserMore::where("user",$user->id)->first();
        $moreInfo->update([$data["type"]=>$data["value"]]);
        return response()->json(["msg"=>"Success"],200);
        
    }
    function deleteInfo($id,Request $request) {
        $data = $request->validate(
            [
                "type"=>"required"
            ]
            );
        $user = User::find($id);
        if(!$user) {
            return response()->json(['error'=>"No user found"],404);
        }
        $moreInfo = UserMore::where("user",$user->id)->first();
        $moreInfo->update([$data["type"]=>null]);
        return response()->json(["msg"=>"Success"],200);
    }
}
