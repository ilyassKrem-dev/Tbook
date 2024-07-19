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

    function getUsetData(Request $request) {
        $data = $request->only("username");
        $user = User::where("username",$data["username"])->first();


        if(!$user) {
            return response()->json(["message"=>"No user found"],404);
        }
        $userData = [
            "id"=>$user->id,
            "name"=>$user->name,
            "username"=>$user->username,
            "cover_photo"=>$user->cover_photo,
            "image"=>$user->image,
            "bio"=>$user->bio,
            "phone"=>$user->phone,
            "email"=>$user->email,
            "gender"=>$user->gender,
            "birthdate"=>$user->birthdate,
            "country"=>$user->country
        ];
        return response()->json(
            [
                "user"=>$userData,
                "friends"=>[],
            ],200);
    }

    function addBio(Request $request) {
       $data = $request->validate(
        [
            "user_id"=>"required",
            "bio"=>"required|max:101|min:1|string"
        ]
        );
        $user = User::where('id',$data["user_id"])->first();
        if(!$user) {
            return response()->json(['message'=>"User not found"],404);
        }
        $user->update(["bio"=>$data['bio']]);
        return response()->json(['message'=>"Added"],200);
    }
}
