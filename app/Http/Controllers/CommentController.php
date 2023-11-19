<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(){
        try {
            $comment = Comment::all();
            return response()->json([
                'comments' => $comment
            ], 200);
        }catch (\Exception $e){
            return response()->json([
                'massage' => 'Something went really wrong!'
            ], 500);
        }
    }
    public function store(CommentRequest $request){
        try {
            $commentId = substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, 8);
            $comment = Comment::create([
                'comment_id' => $commentId,
                'username' => $request->username,
                'email' => $request->email,
                'home_url' => $request->home_url,
                'text_content' => $request->text_content
            ]);
            return response()->json([
                'comments' => $comment
            ], 200);
        }catch (\Exception $e){
            return response()->json([
                'massage' => $e
            ], 500);
        }
    }
}
