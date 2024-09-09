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
        $data = $request->validate([
            "posts"=>"required"
        ]);
        if(!in_array($data["posts"],["public","me","friends"])) {
            return response()->json(["error"=>"Data is not correct"],300);
        }
        $updated = $this::helperFunction($id,$data["posts"],"posts");
        if(!$updated) {
            return response()->json(["error"=>"User not found"],404);
        }
        return response()->json(["data"=>"success"],200);
    }
    function updateRequests($id,Request $request) {
        $data = $request->validate([
            "requests"=>"required"
        ]);
        if(!in_array($data["requests"],["all","fff"])) {
            return response()->json(["error"=>"Data is not correct"],300);
        }
        $updated = $this::helperFunction($id,$data["requests"],"requests");
        if(!$updated) {
            return response()->json(["error"=>"User not found"],404);
        }
        return response()->json(["data"=>'success'],200);
    }
    function updateViewFriendsList($id,Request $request) {
        $data = $request->validate([
            "friends"=>"required"
        ]);
        if(!in_array($data["friends"],["all","friends","fff","me"])) {
            return response()->json(["error"=>"Data is not correct"],300);
        }
        $updated = $this::helperFunction($id,$data["friends"],"friends");
        if(!$updated) {
            return response()->json(["error"=>"User not found"],404);
        }
        return response()->json(["data"=>"success"],200);
    }
    function updateSearchView($id,Request $request) {
        $data = $request->validate([
            "search"=>"required"
        ]);
        if(!in_array($data["search"],["all","fff","me"])) {
            return response()->json(["error"=>"Data is not correct"],300);
        }
        $updated = $this::helperFunction($id,$data["search"],"search");
        if(!$updated) {
            return response()->json(["error"=>"User not found"],404);
        }
        return response()->json(["data"=>"success"],200);
    }
    static function helperFunction($id,$data,$type) {
        $user = User::find($id);
        
        if(!$user) {
            return false;
        }
        $privacy = Privacy::where("user",$user->id)->first();
        $privacy->update([$type=>$data]);
        return true;
    }
}
