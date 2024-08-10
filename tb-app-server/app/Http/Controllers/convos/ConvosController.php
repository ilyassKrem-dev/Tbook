<?php

namespace App\Http\Controllers\convos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\convos\Messages;
use App\Models\convos\Convos;
use App\Models\post\Medias;
use App\Models\User;

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
            $convoInfo = ConvosController::changeConvo($createdConvo,$data["user_id"],$data["other_id"]);
            return response()->json(["data"=>$convoInfo],200);
        }
        $response = ConvosController::changeConvo($convo,$data["user_id"],$data["other_id"]);
        return response()->json(["data"=>$response],200);
    }

    static function changeConvo(Convos $convo,$userId,$other_id) {
        $user = User::where("id",$userId)->first();
        $otherUser = User::where("id",$other_id)->first();
        $otherUserInfo = $userId === $user->id ? $otherUser : $user;
        $messages = Messages::where("convo_id",$convo->id)
                    ->take(15)
                    ->orderBy("created_at","desc")
                    ->get();
        $messages = $messages->reverse();
        $messagesInfo = [];
        foreach($messages as $message) {
            $medias = Medias::where("message_id",$message->id)->get();
            array_push($messagesInfo,[
                "id"=>$message->id,
                "convo_id"=>$message->convo_id,
                "sender"=>$message->sender,
                "receiver"=>$message->receiver,
                "content"=>$message->content,
                "medias"=>$medias,
                "seen"=>$message->seen ? true : false,
                "reaction"=>$message->reaction,
                "created_at"=>$message->created_at,
                "updated_at"=>$message->updated_at
            ]);
        }
        $response = [
            "user"=>$userId,
            "other"=>[
                "id"=>$otherUserInfo->id,
                "name"=>$otherUserInfo->name,
                "username"=>$otherUserInfo->username,
                "image"=>$otherUserInfo->image,
                "status"=>$otherUserInfo->status
            ],
            "id"=>$convo->id,
            "messages"=>$messagesInfo,
            "status"=>$convo->status,
            "status_by"=>$convo->status_by,
            "created_at"=>$convo->created_at,
            "updated_at"=>$convo->updated_at
        ];
        return $response;
    }

    
}
