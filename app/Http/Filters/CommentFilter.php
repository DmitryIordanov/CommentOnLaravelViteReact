<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;

class CommentFilter extends AbstractFilter
{
    public const DATE_COMMENT = 'date';
    public const USERNAME_COMMENT = 'username';

    protected function getCallbacks(): array{
        return [
            self::DATE_COMMENT => [$this, 'date_comment'],
            self::USERNAME_COMMENT => [$this, 'username_comment'],
        ];
    }

    public function date_comment(Builder $builder, $value){
        if ($value === 'latest'){
            $builder->orderBy('created_at', 'desc');
        } else if ($value === 'random'){
            $builder->inRandomOrder();
        }
    }

    public function username_comment(Builder $builder, $value){
        if ($value === 'alphabet') {
            $builder->orderBy('username')->get();
        } else if ($value === 'alphabetback'){
            $builder->orderBy('username', 'desc')->get();
        }
    }
}
