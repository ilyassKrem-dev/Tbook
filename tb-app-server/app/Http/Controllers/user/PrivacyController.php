<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Privacy;
use App\Models\User;
use Illuminate\Http\Request;

class PrivacyController extends Controller
{
    function getPostsPrivacy($id) {
        $user = User::find($id);
        $privacy = Privacy::where("user",$user->id)->first();
        return response()->json(["data"=>$privacy],200);
    }
    function updatePostsPrivacy($id,Request $request) {
        $user = User::find($id);
        $data = $request->validate([
            "posts"=>"required"
        ]);
        if(!in_array($data["posts"],["public","me","friends"])) {
            return response()->json(["error"=>"Data is not correct"],300);
        }
        $privacy = Privacy::where("user",$user->id)->first();
        $privacy->update(["posts"=>$data["posts"]]);
        return response()->json(["data"=>"success"],200);
    }
}
