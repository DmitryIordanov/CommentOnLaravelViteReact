<?php

namespace App\Models;

use DateTimeInterface;
use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory;
    use SoftDeletes;
    use Filterable;

    protected $guarded = false;

    protected $fillable = [
        'comment_id',
        'parent_id',
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
