<?php

namespace App\Helpers;

use App\Models\Friend;
use App\Models\User;
use App\Models\post\Likes;
use App\Models\post\Comment;

class Helpers {

    static function addUserToComment(Comment $comment) {
        $user = User::where("id",$comment->user_id)->first();
        $nmLikes = Likes::where("comment_id",$comment->id)->get();
        $userInfo = [
            "id"=>$user->id,
            "name"=>$user->name,
            "username"=>$user->username,
            "image"=>$user->image
        ];
        $newComment=[
            "id"=>$comment->id,
            "user"=>$userInfo,
            "likes"=>count($nmLikes),
            "post_id"=>$comment->post_id,
            'created_at'=>$comment->created_at,
            'updated_at'=>$comment->updated_at,
            "content"=>$comment->content,
            "parent_id"=>$comment->parent_id
        ];
        return $newComment;
    }

    static function addInfoToFriends($requests,$isRequest) {
        $friendReq = [];
        if($isRequest) {
            foreach($requests as $request) {
                $user = User::where("id",$request->user)->first();
                array_push($friendReq,[
                    "id"=>$request->id,
                    "status"=>$request->status,
                    "user"=>[
                        "id"=>$user->id,
                        "name"=>$user->name,
                        "username"=>$user->username,
                        "image"=>$user->image,
                        "country"=>$user->country
                    ]
                ]);
            }
            return $friendReq;
        }
        foreach($requests as $request) {
            array_push($friendReq,[
                "id"=>$request->id,
                "name"=>$request->name,
                "username"=>$request->username,
                "image"=>$request->image,
                "country"=>$request->country
            ]);
        } 
        return $friendReq;
    }
}

