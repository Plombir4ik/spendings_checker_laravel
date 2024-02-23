<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('user_id');
            $table->string('type');
            $table->float('sum');
            $table->dateTime('date');
            $table->string('description')->nullable();
            $table->timestamps();

            $table->index('category_id', 'transaction_category_idx');
            $table->foreign('category_id', 'transaction_category_fk')->on('categories')->references('id');
            $table->index('user_id', 'transaction_user_idx');
            $table->foreign('user_id', 'transaction_user_fk')->on('users')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
