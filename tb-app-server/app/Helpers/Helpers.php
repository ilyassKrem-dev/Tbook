<?php

namespace App\Helpers;
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
}

