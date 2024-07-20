<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\post\Posts;
use App\Http\Requests\UserRequest;
use App\Models\post\Likes;
use App\Models\post\Medias;

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
    function getUserPosts(Request $request) {
        $data = $request->only("userId");
        $posts = Posts::where("user_id",$data["userId"])->get();
        $medias = [];
        $likes = [];
        $newPosts = [];
        foreach($posts as $post) {
            $medias = Medias::where("post_id",$post->id)->get();
        }
        foreach($posts as $post) {
            $likes = Likes::where("post_id",$post->id)->get();
        }
        foreach($posts as $post) {
    
            array_push($newPosts,[
                "id"=>$post->id,
                "content"=>$post->content,
                "status"=>$post->status,
                "user_id"=>$post->user_id,
                "likes"=>$likes,
                "medias"=>$medias,
                'created_at'=>$post->created_at,
                'updated_at'=>$post->updated_at
            ]);
        }
        
        return response()->json(['posts'=>$newPosts],200);
        
    }
}
