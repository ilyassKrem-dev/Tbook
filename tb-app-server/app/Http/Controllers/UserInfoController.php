<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
class UserInfoController extends UserController
{
    function updateUserInfo($username,Request $request) {
        $user = User::where("username",$username)->first();
        if(!$user) {
            return response()->json(["error"=>"User not found"],404);
        }
        $data = $request->validate([
            "name"=>"required|string",
            "value"=>"required|min:4|max:20"
        ]);
        if($data["name"]=="name") {
            $findName = User::where("name",$data["value"])->first();
            if($findName) return response()->json(["msg"=>"Name is used"],400);
            $user->update(["name"=>$data["value"]]);
            return response()->json(["data"=>"Name changed"],200);
        }
        if($data["name"]=="username") {
            $findName = User::where("username",$data["value"])->first();
            if($findName) return response()->json(["msg"=>"Username is used"],400);
            $user->update(["username"=>$data["value"]]);
            return response()->json(["data"=>"Username changed"],200);
        }
        return response()->json(["error"=>"type is forbidden"],401);
    }
}
