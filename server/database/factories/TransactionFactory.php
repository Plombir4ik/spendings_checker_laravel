<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{

    protected $model = Transaction::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'category_id' => Category::where('user_id', 3)->get()->random()->id,
            'user_id' => 3,
            'type' => $this->faker->randomElement(['Витрата', 'Заробіток']),
            'sum' => random_int(1,1000),
            'date' => $this->faker->dateTimeBetween('-30 days,'),
            'description' => $this->faker->text(35),
        ];
    }
}
