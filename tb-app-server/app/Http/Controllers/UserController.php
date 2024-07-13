<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UserRequest;
class UserController extends Controller
{
    function login(Request $request) {
        $data = $request->only(["email","password"]);
        
        $user = User::where("email","=",$data['email'])->first();
        if(!$user) {
            return response()->json(["email"=>"This email isnt connected to an account"],400);
        }
        if(!password_verify($data['password'],$user->password)) {
            return response()->json(["password"=>"Incorrect password"],400);
        }

        return response()->json([
            "email"=>$user->email
        ]);
    }
    function signin(UserRequest $request) {
        $data = $request->validated();
        $birthdate = \DateTime::createFromFormat('j-M-Y', $data['birthdate'])->format('Y-m-d');
        $user = User::create([
            "name"=>$data['name'],
            "email"=>$data['email'],
            "password"=>bcrypt($data['password']),
            "gender"=>$data['gender'],
            "username"=>$data['username'],
            "birthdate"=>$birthdate
        ]);
        return response()->json([
            "email"=>$user->email,
        ]);
    }
    function fetchUser(Request $request) {
        $data = $request->only('email');
        $user = User::where('email',$data['email'])->first();
        if(!$user) {
            return response()->json(['message'=>"No user found"]);
        }
        return response()->json([
            "id"=>$user->id,
            'name'=>$user->name,
            "email"=>$user->email,
            "image"=>$user->image,
            "username"=>$user->username,
            "status"=>$user->status
        ]);
    }
}
