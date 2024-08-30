<?php

namespace App\Http\Controllers\convos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\MessageRequest;
use App\Models\convos\Convos;
use App\Models\convos\Messages;
use App\Models\post\Medias;


class MessageController extends ConvosController
{
    function addMessage(MessageRequest $request) {
        $data = $request->validated();
        if((empty($data["content"]) && count($data["medias"])===0)) {
            return response()->json([],500);
        }
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

    function changeConvoStatus(Request $request , $convoId) {
        $data = $request->validate([
            "user_id"=>"required",
            "status"=>"required|string",
        ]);
        $convo = Convos::where("id",$convoId)->first();
        if(!$convo) {
            return response()->json([
                "success"=>false,
                "data"=>null
            ],400);
        }
        if($data['status'] === "unblock") {
            $convo->update(['status'=>null,
                            "status_by"=>null
            ]);
            $data = [
                "success"=>true,
                "data"=>[
                    "convoId"=>$convo->id,
                    "status"=>null,
                    "status_by"=>null
                ]
                
            ];
            return response()->json($data,200);
        }
        $convo->update(
            [
                "status"=>"block",
                "status_by"=>$data["user_id"]
            ]
        );
        $data = [
            "success"=>true,
            "data"=>[
                "convoId"=>$convo->id,
                "status"=>$convo->status,
                "status_by"=>$convo->status_by
               
            ]
            
        ];
        return response()->json($data,200);
    }
    function getMoreMessages($convoId,$lastMsg) {

        $convo = Convos::where("id",$convoId)->first();
        $Firstmessage = Messages::where("id",$lastMsg)->first();
        $messages = Messages::where("convo_id",$convo->id)
                            ->where("created_at","<",$Firstmessage->created_at)
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
        return response()->json(["data"=>$messagesInfo],200);
    }

   
}
