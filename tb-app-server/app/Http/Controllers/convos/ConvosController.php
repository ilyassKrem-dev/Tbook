<?php

namespace App\Http\Controllers\convos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\convos\Messages;
use App\Models\convos\Convos;
use App\Models\post\Medias;
use App\Models\User;
use App\Http\Requests\MessageRequest;
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

    function addMessage(MessageRequest $request) {
        $data = $request->validated();
        $message = Messages::create(
            [
                "convo_id"=>$data["convo_id"],
                "sender"=>$data["sender"],
                "content"=>$data["content"],
                "receiver"=>$data["receiver"],
                "reaction"=>$data["reaction"]
            ]
            );
        $allMedias = [];
        if(count($data["medias"])>0) {
            foreach($data["medias"] as $media) {
                $md = Medias::create(
                    [
                        "url"=>$media["url"],
                        "type"=>$media["type"],
                        "user_id"=>$message->sender,
                        "message_id"=>$message->id
                    ]
                    );
                array_push($allMedias,$md);
            }
        }
        $response = [
            "id"=>$message->id,
            "convo_id"=>$message->convo_id,
            "sender"=>$message->sender,
            "receiver"=>$message->receiver,
            "content"=>$message->content,
            "medias"=>$allMedias,
            "seen"=>$message->seen ? true : false,
            "reaction"=>$message->reaction,
            "created_at"=>$message->created_at,
            "updated_at"=>$message->updated_at
        ];
        
        return response()->json(["data"=>$response],200);
    }
    function addReaction(Request $request) {
        $data = $request->validate([
            "user_id"=>"required",
            "message_id"=>"required",
            "reaction"=>"required"
        ]);
        $message = Messages::where("id",$data["message_id"])->first();
        if(!$message) {
            return response()->json(["error"=>"error"],404);
        }
        $message->update(["reaction"=>$data["reaction"]]);
        return response()->json(["data"=>[
            "id"=>$message->id,
            "convo_id"=>$message->convo_id,
            "reaction"=>$message->reaction
        ]]);
    }
    function setAllSeen(Request $request) {
        $data = $request->validate([
            "user_id"=>"required",
            "convo_id"=>"required"
        ]);
        $messages = Messages::where("convo_id",$data["convo_id"])
                            ->where("receiver",$data["user_id"])
                            ->get();

        foreach($messages as $message) {
            $message->update(["seen"=>true]);
        }
        return response()->json(["data"=>[
            "convo_id"=>$data["convo_id"],
            "receiver"=>$data["user_id"],
            "seen"=>true
        ]],200);
    }
}
