<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use App\Models\Pictures;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(){
        try {
            $comment = Comment::paginate(2)->withQueryString();
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
    public function uploadImage(Request $request){
        try {
            $fileName = time().$request->file('image')->getClientOriginalName();
            $path = $request->file('image')->storeAs('images', $fileName, 'public');
            $url_image = '/storage/' . $path;
            Pictures::create([
                'image_url' => $url_image
            ]);
            return response()->json([
                'image' => $url_image
            ], 200);
        }catch (\Exception $e){
            return response()->json([
                'massage' => $e
            ], 500);
        }
    }
}
