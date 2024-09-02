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
    function getConvo($user_id,$convo_id) {
        $convo = Convos::where("id",$convo_id)
                ->first();
        if(!$convo) {
            return response()->json(["error"=>"No converstaion found"],404);
        }
        $user = User::where("id",$user_id)->first();
        $otherUser = $user->id===$convo->user1 ?$convo->user2 : $convo->user1;
        $response = ConvosController::changeConvo($convo,$user->id,$otherUser);
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
    function getAllConvos($id) {
        $user = User::where("id",$id)->first();
        if(!$user) {
            return response()->json(["error"=>'No user found'],404);
        }
        $convos = Convos::where(function($query) use($user) {
            $query->where("user1",$user->id)
                    ->orWhere("user2",$user->id);
        })
                ->get();
        $allConvos = [];
        foreach($convos as $convo) {
            $user1 = User::where("id",$convo->user1)->first();
            $user2 = User::where("id",$convo->user2)->first();
            $getOtherUser = $user1->id === $user->id ?$user2 : $user1;
            $lastMsg = Messages::where("convo_id",$convo->id)
                                ->orderBy("created_at","desc")
                                ->first()
                                ;
            $medias = Medias::where("message_id",$lastMsg->id)->get();
            array_push($allConvos,[
                'id'=>$convo->id,
                "user"=>$user->id,
                "other"=>[
                    "id"=>$getOtherUser->id,
                    "name"=>$getOtherUser->name,
                    "username"=>$getOtherUser->username,
                    "image"=>$getOtherUser->image,
                    "status"=>$getOtherUser->status
                ],
                "message"=>[
                    "id"=>$lastMsg->id,
                    "convo_is"=>$lastMsg->convo_id,
                    "sender"=>$lastMsg->sender,
                    "receiver"=>$lastMsg->receiver,
                    "medias"=>$medias,
                    "content"=>$lastMsg->content,
                    "created_at"=>$lastMsg->created_at,
                    "updated_at"=>$lastMsg->updated_at
                ],
                "status"=>$convo->status,
                "status_by"=>$convo->status_by
            ]);
        }
        return response()->json(["data"=>$allConvos],200);
    }
    
}
