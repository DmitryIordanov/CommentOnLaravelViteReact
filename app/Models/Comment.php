<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'comment_id',
        'username',
        'email',
        'home_url',
        'text_content'
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('d.m.Y в H:i');
    }
}
