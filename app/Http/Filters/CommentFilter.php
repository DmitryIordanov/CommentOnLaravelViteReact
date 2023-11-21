<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;

class CommentFilter extends AbstractFilter
{
    public const OLD_COMMENT = 'old';
    public const LATEST_COMMENT = 'latest';
    public const RANDOM_COMMENT = 'random';


    protected function getCallbacks(): array{
        return [
            self::OLD_COMMENT => [$this, 'old_comment'],
            self::LATEST_COMMENT => [$this, 'latest_comment'],
            self::RANDOM_COMMENT => [$this, 'random_comment'],
        ];
    }

    public function old_comment(Builder $builder, $value){
        if ($value === 'old'){
            $builder->first();
        }
    }

    public function latest_comment(Builder $builder, $value){
        if ($value === 'latest') {
            $builder->orderBy('created_at', 'desc');
        }
    }

    public function random_comment(Builder $builder, $value){
        if ($value === 'random') {
            $builder->inRandomOrder();
        }
    }
}
