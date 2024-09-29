<?php

namespace App\Http\Controllers\posts;

use App\Http\Controllers\PostController;
use App\Models\post\Posts;
use Illuminate\Http\Request;

class PostMiscController extends PostController
{
    function sharePost($postId,Request $request) {
        $post = Posts::find($postId);
        $data = $request->validate([
            "content"=>"sometimes|nullable",
            "user_id"=>"required|integer"
        ]);
        Posts::create([
            "content"=>$data["content"],
            "user_id"=>$data["user_id"],
            "parent_post"=>$post->id,
            "status"=>"friends"
        ]);
        return response()->json(["msg"=>$post],200);
    }
}
