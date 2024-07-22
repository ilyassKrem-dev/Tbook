<?php

namespace App\Http\Controllers;

use App\Helpers\Helpers;
use Illuminate\Http\Request;
use App\Models\post\Medias;
use App\Models\post\Posts;
use App\Models\post\Likes;
use App\Models\User;
use App\Models\post\Comment;
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
                        ->where("comment_id",null)
                        ->first();
        if($liked) {
            $liked->delete();
            return response()->json(['message'=>"Like removed"],200);
        }
        Likes::create(["user_id"=>$data["user_id"],"post_id"=>$data["post_id"],"comment_id"=>null]);

        return response()->json(['message'=>"Like added"],201);
    }
    function getAllPosts($offset = 0, $limit = 15) {
        $posts = Posts::where("status","Public")
                ->inRandomOrder()
                ->skip($offset)
                ->take($limit)
                ->get();
        $allPosts = [];
        
        foreach($posts as $post) {
            $postLikes = Likes::where("post_id",$post->id)->get();
            $allMedias = Medias::where("post_id",$post->id)->get();
            $likes = Likes::where("post_id",$post->id)->get();
            $user = User::where("id",$post->user_id)->first();
            $userInfo = [
                "id"=>$user->id,
                "name"=>$user->name,
                "username"=>$user->username,
                "image"=>$user->image
            ];
            array_push($allPosts,[
                "id"=>$post->id,
                "content"=>$post->content,
                "status"=>$post->status,
                "user"=>$userInfo,
                "likes"=>$likes,
                "medias"=>$allMedias,
                'created_at'=>$post->created_at,
                'updated_at'=>$post->updated_at
            ]);
        }
        
        return response()->json(["posts"=>$allPosts],200);
    }
}
