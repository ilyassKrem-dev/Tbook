<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\post\Posts;
use App\Http\Requests\UserRequest;
use App\Models\post\Likes;
use App\Models\post\Medias;
use App\Models\post\Comment;
use App\Helpers\Helpers;
use App\Models\Friend;
use App\Models\Privacy;
use App\Models\UserMore;

class UserController extends Controller
{
    function login(Request $request) {
        $data = $request->only(["email","password"]);
        
        $user = User::where("email","=",$data['email'])->first();
        if(!$user) {
            return response()->json(["email"=>"This email isnt connected to an account"],400);
        }
        if(!password_verify($data['password'],$user->password)) {
            return response()->json(["password"=>"Incorrect password"],400);
        }

        return response()->json([
            "email"=>$user->email
        ]);
    }
    function signin(UserRequest $request) {
        $data = $request->validated();
        $birthdate = \DateTime::createFromFormat('j-M-Y', $data['birthdate'])->format('Y-m-d');
        $user = User::create([
            "name"=>$data['name'],
            "email"=>$data['email'],
            "password"=>bcrypt($data['password']),
            "gender"=>$data['gender'],
            "username"=>$data['username'],
            "birthdate"=>$birthdate
        ]);
        Privacy::create(["user"=>$user->id]);
        UserMore::create(["user"=>$user->id]);
        return response()->json([
            "email"=>$user->email,
        ]);
    }
    function fetchUser(Request $request) {
        $data = $request->only('email');
        $user = User::where('email',$data['email'])->first();
        if(!$user) {
            return response()->json(['message'=>"No user found"]);
        }
        return response()->json([
            "id"=>$user->id,
            'name'=>$user->name,
            "email"=>$user->email,
            "image"=>$user->image,
            "username"=>$user->username,
            "status"=>$user->status,
            "gender"=>$user->gender
        ]);
    }

    function getUserData($username) {
        $user = User::where("username",$username)->first();


        if(!$user) {
            return response()->json(["message"=>"No user found"],404);
        }
        $friends = Friend::where(function($query) use($user) {
            $query->where("user",$user->id)
                    ->orWhere("friend",$user->id);
                        })
                        ->where("status","friends")
                        ->get();
        $newData = [];
        foreach($friends as $friend) {
            $userInfo = User::where("id",$friend->user)->first();
            $friendInfo = User::where("id",$friend->friend)->first();
            $getInfo = $userInfo->id === $user->id ?$friendInfo :$userInfo;
            $getId = $userInfo->id === $user->id ?$userInfo :$friendInfo;
            array_push($newData,[
                "id"=>$friend->id ,
                "user"=>$getId->id,
                "friend"=>[
                    "id"=>$getInfo->id,
                    "name"=>$getInfo->name,
                    "username"=>$getInfo->username,
                    "image"=>$getInfo->image,
                    "status"=>$friend->status,
                ],
                "status"=>$friend->status,
                "status_by"=>$friend->status_by
            ]);
        }
        $userData = [
            "id"=>$user->id,
            "name"=>$user->name,
            "username"=>$user->username,
            "cover_photo"=>$user->cover_photo,
            "image"=>$user->image,
            "bio"=>$user->bio,
            "phone"=>$user->phone,
            "email"=>$user->email,
            "gender"=>$user->gender,
            "birthdate"=>$user->birthdate,
            "country"=>$user->country
        ];
        return response()->json(
            [
                "user"=>$userData,
                "friends"=>$newData,
            ],200);
    }

    function addBio(Request $request) {
       $data = $request->validate(
        [
            "user_id"=>"required",
            "bio"=>"required|max:101|min:1|string"
        ]
        );
        $user = User::where('id',$data["user_id"])->first();
        if(!$user) {
            return response()->json(['message'=>"User not found"],404);
        }
        $user->update(["bio"=>$data['bio']]);
        return response()->json(['message'=>"Added"],200);
    }
    function getUserPosts($userId,$loggedId) {
        $postsQuery = Posts::query()->where("user_id",$userId);
        $friends = Friend::where(function($query) use($userId) {
            $query->where("user",$userId)
                    ->orWhere("friend",$userId);
        })
                ->where("status","friends")
                ->pluck("user")
                ->merge(Friend::where(function($query) use($userId) {
                    $query->where("user",$userId)
                            ->orWhere("friend",$userId);
                })
                    ->where("status","friends")
                    ->pluck("friend")
                    ->unique())
                ->values();
        if(count($friends)==0) {
            $friends = [];
        } 
        if($loggedId ==="-1") {
            $posts = $postsQuery->where('status',"public")->get();
        } else if ($userId==$loggedId) {
            $posts = $postsQuery->get();
        } else {
            $posts = $postsQuery->when(!empty($friends),function($query) use($friends) {
                return $query->where(function($query) use($friends) {
                    $query->where("status","public")
                            ->orWhereIn("user_id",$friends);
                });
            },function($query) {
                    $query->where("status","public");
            })
            ->get();
        }
        $medias = [];
        $likes = [];
        $newPosts = [];
        foreach($posts as $post) {
            $medias[$post->id] = Medias::where("post_id",$post->id)->get();
        }
        foreach($posts as $post) {
            $likes[$post->id] = Likes::where("post_id",$post->id)->get();
        }
        foreach($posts as $post) {
            $allComments = Comment::where("post_id",$post->id)->get();
            $counted = count($allComments);
            $comment = Comment::where("post_id",$post->id)
                    ->where("parent_id",null)
                    ->orderBy("created_at","desc")
                    ->first();
            if($comment) {
                $user = User::where("id",$comment->user_id)->first();
                $nmLikes = Likes::where("comment_id",$comment->id)->get();
                $replies = Comment::where("parent_id",$comment->id)
                            ->get();
                $newReplies = [];
                foreach ($replies as $reply) {
                    $re = Helpers::addUserToComment($reply);
                    array_push($newReplies,$re);
                };
                $userInfo = [
                    "id"=>$user->id,
                    "name"=>$user->name,
                    "username"=>$user->username,
                    "image"=>$user->image
                ];
                $newComment=[
                    "id"=>$comment->id,
                    "user"=>$userInfo,
                    "replies"=>$newReplies,
                    "likes"=>count($nmLikes),
                    "post_id"=>$comment->post_id,
                    'created_at'=>$comment->created_at,
                    'updated_at'=>$comment->updated_at,
                    "content"=>$comment->content,
                    "parent_id"=>$comment->parent_id,
                    "more"=>$counted>1 ? true : false
                ];
            }
          
            array_push($newPosts,[
                "id"=>$post->id,
                "content"=>$post->content ?? "",
                "status"=>$post->status,
                "user_id"=>$post->user_id,
                "f_comment"=>empty($newComment)?null:$newComment,
                "likes"=>$likes[$post->id],
                "medias"=>$medias[$post->id],
                'created_at'=>$post->created_at,
                'updated_at'=>$post->updated_at
            ]);
        }
        
        return response()->json(['posts'=>$newPosts],200);
        
    }

    function changePicture(Request $request) {
        $data = $request->validate(
            [
                "user_id"=>"required",
                "image"=>"required|string"
            ]
            );
        $user = User::where("id",$data["user_id"])->first();
        $user->update(["image"=>$data['image']]);
        return response()->json(["message","picture changed"],200);
    }

    function getSearchResults($id,Request $request) {
        $data = $request->query("search");
        if (!$data) {
            return;
        }
        $user = User::select('id')->where('id',$id)->first();
        $userFriends = Friend::where(function($query) use($user) {
            $query->where("user",$user->id)
                ->orWhere("friend",$user->id);
        } )
            ->where('status',"friends")
            ->get();
        $otherFriendsIds = [];
        foreach($userFriends as $friend) {
            $user1 = User::find($friend->user);
            if (!$user1) continue;
            $user2 = User::find($friend->friend);
            $getOther = $user1->id === $user->id ? $user2 : $user1;
             if ($getOther === null) continue;
            $friendFriends = Friend::where(function($query) use($getOther) {
                $query->where("user",$getOther->id)
                    ->orWhere("friend",$getOther->id);
            } )
                ->where('status',"friends")
                ->pluck("user")
                ->merge(Friend::where(function($query) use($getOther) {
                    $query->where("user",$getOther->id)
                        ->orWhere("friend",$getOther->id);
                } )
                    ->where('status',"friends")
                    ->pluck("friend"))
                ->values();
            $otherFriendsIds = array_merge($otherFriendsIds, $friendFriends->toArray());
        }
        $users = User::join("privacy","users.id","=","privacy.user")
                        ->select("users.name","users.username","users.image","users.id","privacy.search")
                        ->where("users.name","like","$data%")
                        ->where(function($query) use($otherFriendsIds) {
                            $query->where('privacy.search',"all")
                                ->orWhere(function($query) use ($otherFriendsIds) {
                                    $query->where("privacy.search","fff")
                                            ->whereIn('users.id',$otherFriendsIds);
                                });
                        })
                        ->inRandomOrder()
                        ->take(10)
                        ->get();
        
        return response()->json(["data"=>$users],200);

    }
}
