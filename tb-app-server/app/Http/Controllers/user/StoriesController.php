<?php

namespace App\Http\Controllers\user;
use App\Http\Requests\StoryRequest;
use App\Http\Controllers\Controller;
use App\Models\Friend;
use App\Models\stories\Stories;
use Illuminate\Http\Request;
use App\Models\User;
class StoriesController extends Controller
{
    function addStory($id ,StoryRequest $request) {
        $user = User::find($id);
        if(!$user) {
            return response()->json(["error"=>"No user found"],200);

        }
        $data = $request->validated();
        Stories::create([
            "user"=>$id,
            "text"=>$data["text"],
            "media"=>$data["media"],
            "mediaClass"=>$data["mediaClass"],
            "type"=>$data["type"],
            "bgColor"=>$data["bgColor"],
            "textColor"=>$data["textColor"],
            "visibility"=>$data["visibility"]
        ]);

        return response()->json(["data"=>"success"],201);

    }
    function getStories($id) {
        $user = User::find($id);
        if(!$user) {
            return response()->json(["error"=>"No user found"],404);

        };
        $allStories = [];
        $userFriends = Friend::where(function($query) use($user) {
            $query->where("user",$user->id)
                ->orWhere("friend",$user->id);
        }) 
            ->where("status","friends")
            ->pluck("user")
            ->merge(Friend::where(function($query) use($user) {
                $query->where("user",$user->id)
                    ->orWhere("friend",$user->id);
            }) 
                ->where("status","friends")
                ->pluck("friend"))
            ->unique()
            ->values()
            ->filter(function($friend) use($user) {
                return $friend !== $user->id;
            });
        $userStories = Stories::where("user",$user->id)->get();
        if($userStories->isNotEmpty()) {
            $allStories[] = [
                "user"=>[
                    "id"=>$user->id,
                    "image"=>$user->image,
                    "name"=>$user->name,
                    "username"=>$user->username
                ]
            ];
        }
        foreach ($userFriends as $friendId) {
            $friendStories = Stories::with("user")->where("user", $friendId)->where("visibility", 'friends')->get();
            foreach ($friendStories as $story) {
                $friendInfo = User::where("id",$friendId)->first();
                if(!$friendInfo) return;
                if ($story->visibility == 'all' || in_array($user->id, $story->friends_ids)) {
                    $allStories[] = [
                        "user"=>[
                        "id"=>$friendInfo->id,
                        "image"=>$friendInfo->image,
                        "name"=>$friendInfo->name,
                        "username"=>$friendInfo->username
                        ]
                    ];
                }
            }
        }
        $publicStories = Stories::with("user")
                    ->where("visibility", 'all')
                    ->where("user","!=",$user->id)
                    ->get();
        foreach ($publicStories as $publicStory) {
            $info = User::where("id",$publicStory->id)->first();
            if(!$info) return;
            $exists = collect($allStories)->contains(function ($story) use ($info) {
                return $story['user']['id'] === $info->id;
            });
            if(!$exists) {
                $allStories[] = [
                    "user"=>[
                        "id" => $info->id,
                        "image" => $info->image,
                        "name" => $info->name,
                        "username" => $info->username
    
                    ]
                ];

            }
    
          
        }
        return response()->json(["data"=>$allStories],200);
    }
    function getHomeStories($id) {
        $user = User::find($id);
        if(!$user) {
            return response()->json(["error"=>"No user found"],200);

        }
        $allStories = [];
        $getUserStorie = Stories::where("user",$user->id)
                                ->orderBy("created_at","desc")
                                ->first();
        $allStories[] = [
            "user"=>[
                "id"=>$user->id,
                "image"=>$user->iamge,
                "name"=>$user->name,
                "username"=>$user->username
            ],
            "story"=>$getUserStorie
        ];
        $userFriends = Friend::where(function($query) use($user) {
            $query->where("user",$user->id)
                ->orWhere("friend",$user->id);
        }) 
            ->where("status","friends")
            ->pluck("user")
            ->merge(Friend::where(function($query) use($user) {
                $query->where("user",$user->id)
                    ->orWhere("friend",$user->id);
            }) 
                ->where("status","friends")
                ->pluck("friend"))
            ->unique()
            ->values()
            ->take(5)
            ->filter(function($friend) use($user) {
                return $friend !== $user->id;
            });
        foreach ($userFriends as $friendId) {
            $friendStory = Stories::with("user")
                        ->where("user", $friendId)
                        ->where("visibility", 'friends')
                        ->orderBy("created_at","desc")
                        ->first();
            if(!$friendStory) continue;
            $friendInfo = User::where("id",$friendId)->first();
            if(!$friendInfo) return;
            $allStories[] = [
                "user"=>[
                    "id" => $friendInfo->id,
                    "image" => $friendInfo->image,
                    "name" => $friendInfo->name,
                    "username" => $friendInfo->username,
                ],
                "story"=>$friendStory
            ];
        }
        $publicStories = Stories::where("visibility", 'all')
                    ->where("user","!=",$user->id)
                    ->get();
        foreach ($publicStories as $publicStory) {
            $info = User::where("id",$publicStory->id)->first();
            if(!$info) return;
            $exists = collect($allStories)->contains(function ($story) use ($info) {
                return $story['user']['id'] === $info->id;
            });
            if (!$exists) {
                $allStories[] = [
                    "user" => [
                        "id" => $info->id,
                        "image" => $info->image,
                        "name" => $info->name,
                        "username" => $info->username
                    ],
                    "story" => $publicStory
                ];
            }

          
        }
        ;
        return response()->json(["data"=>array_slice($allStories,0,5)],200);
    }
    function getUsernameStories($id,$username) {
        $user = User::find($id);
        if(!$user) {
            return response()->json(["error"=>"No user found"],200);

        }
        $otherUser = user::where("username",$username)->first();
        
        if(!$otherUser) {
            return response()->json(["error"=>"No user found"],200);

        }
        $allStories = [
            "user"=>[
                "id"=>$otherUser->id,
                "name"=>$otherUser->name,
                "username"=>$otherUser->username,
                "image"=>$otherUser->image
            ],
            "stories"=>[]
        ];
        if($user->id === $otherUser->id) {
            $stories = Stories::where("user",$otherUser->id)
                            ->get();
            $allStories["stories"] = $stories;
            return response()->json(["data"=>$allStories],200);
        }
        $userFriends = Friend::where(function($query) use($user) {
            $query->where("user",$user->id)
                ->orWhere("friend",$user->id);
        }) 
            ->where("status","friends")
            ->pluck("user")
            ->merge(Friend::where(function($query) use($user) {
                $query->where("user",$user->id)
                    ->orWhere("friend",$user->id);
            }) 
                ->where("status","friends")
                ->pluck("friend"))
            ->unique()
            ->values()
            ->filter(function($friend) use($user) {
                return $friend !== $user->id;
            });
        $stories = Stories::where("user",$otherUser->id)
                            ->where(function($query) use($userFriends) {
                                $query->where("visibility","all")
                                        ->orWhere(function($query) use($userFriends) {
                                            $query->where("visibilty","friends")
                                                ->whereIn("user",$userFriends);
                                        });
                            })
                            ->get();
        $allStories["stories"] = $stories;

        return response()->json(["data"=>$allStories],200);

    }
}
