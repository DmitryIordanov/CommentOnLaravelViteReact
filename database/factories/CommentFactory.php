<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'comment_id' => substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, 8),
            'parent_id' => null,
            'username' => $this->faker->name,
            'email' => $this->faker->email,
            'home_url' => '',
            'text_content' => $this->faker->text
        ];
    }
}
