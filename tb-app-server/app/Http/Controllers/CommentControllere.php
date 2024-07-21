<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\post\Comment;
use Illuminate\Http\Request;
use App\Models\post\Likes;
class CommentControllere extends Controller
{
    function getComment($postId) {
        $comments = Comment::where("post_id",$postId)->get();
        $newComment = [];
        foreach ($comments as $comment) {
            $user = User::where("id",$comment->user_id)->first();
            $nmLikes = Likes::where("comment_id",$comment->id)->get();
            $userInfo = [
                "id"=>$user->id,
                "name"=>$user->name,
                "username"=>$user->username,
                "image"=>$user->image
            ];
            array_push($newComment,[
                "id"=>$comment->id,
                "user"=>$userInfo,
                "post_id"=>$comment->post_id,
                "likes"=>count($nmLikes),
                'created_at'=>$comment->created_at,
                'updated_at'=>$comment->updated_at,
                "content"=>$comment->content,
                "parent_id"=>$comment->parent_id
            ]);
        };
        return response()->json(["comments"=>$newComment],200);
    }
    function addComment(Request $request) {
        $data = $request->validate(
            [
                "user_id"=>"required",
                "post_id"=>"required",
                "parent_id"=>"sometimes|nullable",
                "content"=>"required|string",
            ]
        );
        $comment = Comment::create($data);
        $user = User::where("id",$data["user_id"])->first();
        $userInfo = [
            "id"=>$user->id,
            "name"=>$user->name,
            "username"=>$user->username,
            "image"=>$user->image
        ];
        $newComment=[
            "id"=>$comment->id,
            "user"=>$userInfo,
            "post_id"=>$comment->post_id,
            'created_at'=>$comment->created_at,
            'updated_at'=>$comment->updated_at,
            "content"=>$comment->content,
            "parent_id"=>$comment->parent_id,
            "more"=>false
        ];
        return response()->json(["comment"=>$newComment],200);
    }
    function likeComment(Request $request) {
        $data = $request->validate(
            ["comment_id"=>"required",
            "user_id"=>"required"
            ]
        );
        $liked = Likes::where("comment_id",$data["comment_id"])
                            ->where("user_id",$data["user_id"])
                            ->first();
        if($liked) {
            $liked->delete();
            return response()->json(["message"=>"   "],200);
        }
        Likes::create([
            "comment_id"=>$data["comment_id"],
            "user_id"=>$data["user_id"],
            "post_id"=>null]);
        
        return response()->json(["message"=>"like added"],201);
    }
}
