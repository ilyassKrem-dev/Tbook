<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Friend;
use App\Http\Requests\FreindRequest;
class FriendsController extends Controller
{
    

    function sendFriendRequest(FreindRequest $request) {
        $data = $request->validated();
        Friend::create([
            "user"=>$data["user"],
            "friend"=>$data["friend"],
            "status"=>"request",
            "status_by"=>$data["user"]
        ]);
        return response()->json(["message"=>"Request sent"],200);
    }
}
