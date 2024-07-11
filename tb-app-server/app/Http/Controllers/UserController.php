<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UserRequest;
class UserController extends Controller
{
    function login(UserRequest $request) {
        $data = $request->only(["email","password"]);
        $validate = $request->validate(
            [
                "email"=>"required",
                "password"=>"required"
            ]
            );
        $user = User::where("email",$validate['email'])->first();
        if(!$user) {
            return response()->json(["email"=>"This email isnt connected to an account"])->status(404);
        }
        if(!password_verify($validate['password'],$user->password)) {
            return response()->json(["password"=>"Incorrect password"])->status(400);
        }

        return response()->json([
            "id"=>$user->id,
            'name'=>$user->name,
            "email"=>$user->email,
            "username"=>$user->username,
            "status"=>$user->status
        ]);
    }
    function signin(UserRequest $request) {
        $data = $request->validated();
        $user = User::create([
            "name"=>$data['name'],
            "email"=>$data['email'],
            "password"=>bcrypt($data['password']),
            "gender"=>$data['gender'],
            "username"=>$data['username']||null
        ]);
        return response()->json([
            "id"=>$user->id,
            'name'=>$user->name,
            "email"=>$user->email,
            "username"=>$user->username,
            "status"=>$user->status
        ]);
    }
}
