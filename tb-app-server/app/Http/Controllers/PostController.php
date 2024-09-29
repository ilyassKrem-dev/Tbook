<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\post\Medias;
use App\Models\post\Posts;
use App\Models\post\Likes;
use App\Models\User;
use App\Http\Requests\PostRequest;
use App\Models\Friend;
use App\Models\post\Comment;
use App\Helpers\Helpers;
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
        $allMedias = Medias::where("post_id",$post->id)->get();
        $userInfo = [
            "id"=>$user->id,
            "name"=>$user->name,
            "username"=>$user->username,
            "image"=>$user->image
        ];
        $data = [
            "id"=>$post->id,
            "content"=>$post->content ?? "",
            "status"=>$post->status,
            "user"=>$userInfo,
            "likes"=>[],
            "medias"=>$allMedias,
            'created_at'=>$post->created_at,
            'updated_at'=>$post->updated_at
        ];
        return response()->json(["data"=>$data,200]);
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
    function getPost($username,$postId) {
        $user = User::where("username",$username)->first();
        if(!$user) {
            return response()->json(["error"=>"User not found"],404);
        }
        $post = Posts::where("id",$postId)
                        ->where("user_id",$user->id)
                        ->first();
        $parent_post = Posts::where("id",$post->parent_post)->first();
        if($parent_post) {
            $parent = PostController::changePostResponse($parent_post);
        }
        $allMedias = Medias::where("post_id",$post->id)->get();
        $likes = Likes::where("post_id",$post->id)->get();
        $userInfo = [
            "id"=>$user->id,
            "name"=>$user->name,
            "username"=>$user->username,
            "image"=>$user->image
        ];
        $allComments = Comment::where("post_id",$post->id)->get();
        $counted = count($allComments);
        $comment = Comment::where("post_id",$post->id)
                ->where("parent_id",null)
                ->orderBy("created_at","desc")
                ->first();
        $newComment = [];
        
        if($comment) {
            $user = User::where("id",$comment->user_id)->first();
            $nmLikes = Likes::where("comment_id",$comment->id)->get();
            $replies = Comment::where("parent_id",$comment->id)
                        ->get();
            $newReplies = [];
            foreach ($replies as $reply) {
                $re = Helpers::addUserToComment($reply);
                array_push($newReplies,$re);
            };
            $userInfo = [
                "id"=>$user->id,
                "name"=>$user->name,
                "username"=>$user->username,
                "image"=>$user->image
            ];
            $newComment=[
                "id"=>$comment->id,
                "user"=>$userInfo,
                "replies"=>$newReplies,
                "likes"=>count($nmLikes),
                "post_id"=>$comment->post_id,
                'created_at'=>$comment->created_at,
                'updated_at'=>$comment->updated_at,
                "content"=>$comment->content,
                "parent_id"=>$comment->parent_id,
                "more"=>$counted>1 ? true : false
            ];
        }
          
        $res = [
            "post"=>[
                "id"=>$post->id,
                "content"=>$post->content ?? "",
                "status"=>$post->status,
                "f_comment"=>empty($newComment)?null:$newComment,
                "user"=>$userInfo,
                "likes"=>$likes,
                "parent_post"=>$parent ?? null,
                "medias"=>$allMedias,
                'created_at'=>$post->created_at,
                'updated_at'=>$post->updated_at
            ],
            "userInfo"=>$userInfo

        ];
        return response()->json(["data"=>$res],200);

    }
    function getAllPosts($id,$offset = 0, $limit = 15) {
        $loggedUser = User::find($id);
        $friends = Friend::where(function($query) use($loggedUser) {
            $query->where("user",$loggedUser->id)
                    ->orWhere("friend",$loggedUser->id);
        })
                ->where("status","friends")
                ->pluck("user")
                ->merge(Friend::where(function($query) use($loggedUser) {
                    $query->where("user",$loggedUser->id)
                            ->orWhere("friend",$loggedUser->id);
                    })
                    ->where("status","friends")
                    ->pluck("friend")
                    ->unique())
                ->values();
        if(!$loggedUser) {
            return response()->json(["error"=>"Login first"],400);
        }
        if(count($friends)==0) {
            $friends = [$loggedUser->id];
        } 
        $posts = Posts::query()
                ->when(!empty($friends),function($query) use($friends) {
                    return $query->where(function($query) use($friends) {
                        $query->where("status","public")
                                ->orWhereIn("user_id",$friends);
                    });
                },function($query) {
                    $query->where("status","public");
                })
                ->inRandomOrder()
                ->skip($offset)
                ->take($limit)
                ->get();
        $allPosts = [];
        
        foreach($posts as $post) {
            array_push($allPosts,$this::changePostResponse($post));
        }
        
        return response()->json(["posts"=>$allPosts],200);
    }
    static function changePostResponse(Posts $post) {
        $allMedias = Medias::where("post_id",$post->id)->get();
        $likes = Likes::where("post_id",$post->id)->get();
        $user = User::where("id",$post->user_id)->first();
        $parent_post = Posts::where("id",$post->parent_post)->first();
        if($parent_post) {
            $parent = PostController::changePostResponse($parent_post);
        }
        $userInfo = [
            "id"=>$user->id,
            "name"=>$user->name,
            "username"=>$user->username,
            "image"=>$user->image
        ];
        return [
            "id"=>$post->id,
            "content"=>$post->content ?? "",
            "status"=>$post->status,
            "user"=>$userInfo,
            "likes"=>$likes,
            "medias"=>$allMedias,
            "parent_post"=>$parent ?? null,
            'created_at'=>$post->created_at,
            'updated_at'=>$post->updated_at
        ];
        
    }
}
