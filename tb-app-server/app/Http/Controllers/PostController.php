<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\post\Medias;
use App\Models\post\Posts;
use App\Models\post\Likes;
use App\Models\User;
use App\Http\Requests\PostRequest;
class PostController extends Controller
{
    function addPost(PostRequest $request) {
        $data = $request->validated();
        $user = User::where("id",$data["user_id"])->first();
        $post = Posts::create([
            "content"=>$data["content"],
            "status"=>$data["status"],
            "user_id"=>$user->id
        ]);
        if(count($data["medias"])>0) {
            foreach($data["medias"] as $media) {
                Medias::create([
                    "url"=>$media["url"],
                    "type"=>$media['type'],
                    "user_id"=>$user->id,
                    "post_id"=>$post->id

                ]);
            }
        } 
        
        return response()->json(["message"=>"Post created",200]);
    }
    function likePost(Request $request) {
        $data = $request->validate(
            [
                "user_id"=>"required",
                "post_id"=>"required"
            ]
        );
        $liked = Likes::where("user_id",$data['user_id'])
                        ->where("post_id",$data['post_id'])
                        ->first();
        if($liked) {
            $liked->delete();
            return response()->json(['message'=>"Like removed"],200);
        }
        Likes::create(["user_id"=>$data["user_id"],"post_id"=>$data["post_id"]]);

        return response()->json(['message'=>"Like added"],201);
    }
}
