<?php

namespace App\Http\Controllers\convos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\convos\Messages;
use App\Models\convos\Convos;
class ConvosController extends Controller
{
    

    function findOrAddConvo(Request $request) {
        $data = $request->only(["user_id","other_id"]);
        $convo = Convos::where(function($query) use($data) {
            $query->where("user1",$data["user_id"])
                    ->Where("user2",$data["other_id"]);
            })
            ->orWhere(function($query) use($data) {
                $query->where("user2",$data["user_id"])
                        ->Where("user1",$data["other_id"]);
                })->first();

        if(!$convo) {
            $createdConvo = Convos::create([
                "user1"=>$data["user_id"],
                "user2"=>$data["other_id"]
            ]);
            return response()->json(["data"=>$createdConvo],200);
        }
        
    }
}
