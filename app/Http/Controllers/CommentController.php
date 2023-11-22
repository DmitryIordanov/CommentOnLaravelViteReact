<?php

namespace App\Http\Controllers;

use App\Http\Filters\CommentFilter;
use App\Http\Requests\CommentRequest;
use App\Http\Requests\FilterRequest;
use App\Models\Comment;
use App\Models\Pictures;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(FilterRequest $request){
        try {
            $data = $request->validated();
            $filter = app()->make(CommentFilter::class, ['queryParams' => array_filter($data)]);
            $comment = Comment::filter($filter)->where('parent_id', null)->paginate(4);
            return response()->json([
                'comments' => $comment
            ], 200);
        }catch (\Exception $error){
            return response()->json([
                'massage' => $error
            ], 500);
        }
    }
    public function store(CommentRequest $request){
        try {
            $commentId = substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, 8);
            $comment = Comment::create([
                'comment_id' => $commentId,
                'parent_id' => $request->parent_id,
                'username' => $request->username,
                'email' => $request->email,
                'home_url' => $request->home_url,
                'text_content' => $request->text_content
            ]);
            return response()->json([
                'comments' => $comment
            ], 200);
        }catch (\Exception $error){
            return response()->json([
                'massage' => $error
            ], 500);
        }
    }
    public function reply(){
        try {
            $comment = Comment::where('parent_id', '!=', null)->get();
            return response()->json([
                'comments' => $comment
            ], 200);
        }catch (\Exception $error){
            return response()->json([
                'massage' => $error
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
        }catch (\Exception $error){
            return response()->json([
                'massage' => $error
            ], 500);
        }
    }
}
