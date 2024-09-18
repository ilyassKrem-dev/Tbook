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
    function changePassword($username,Request $request) {
        $data = $request->validate([
            "old"=>'required|string',
            "newP"=>"required|min:6",
            "confirmP"=>"required|string|same:newP"
        ]);
        
        $user = User::where("username",$username)->first();
        if(!password_verify($data["old"],$user->password)) {
            return response()->json(["error"=>[
                "old"=>"Incorrect password",
                "newP"=>"",
                "confirmP"=>""
            ]],400);
        }
        if(strlen($data["newP"]) < 6) {
            return response()->json(["error"=>[
                "old"=>"",
                "newP"=>"New password must be longer than 6 character",
                "confirmP"=>""
            ]],400);
        }   
        if($data["old"] === $data["newP"]) {
            return response()->json(["error"=>[
                "old"=>"",
                "newP"=>"New password must not be the same as the old one",
                "confirmP"=>""
            ]],400);
        }
        if($data["newP"] !== $data["confirmP"]) {
            return response()->json(["error"=>[
                "old"=>"",
                "newP"=>"",
                "confirmP"=>"Passwords dont match"
            ]],400);
        }
        $user->update([
            "password"=>bcrypt($data["newP"])
        ]);
        return response()->json(["msg"=>"Password changed"],200);
    }
    function updateStatus($id,Request $request) {
        $user = User::find($id);
        if(!$user) {
            return response()->json(["error"=>"No user found"],200);
        }
        $data = $request->validate(
            [
                'status'=>"required"
            ]
            );
        $user->update(["status"=>$data["status"]]);
        return response()->json(["data"=>"success"],200);
    }
}
