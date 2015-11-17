<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrganizationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('organizations', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->string('name');

            $table->longText('description')->nullable();
            $table->mediumText('slogan')->nullable();
            $table->longText('what_for_text')->nullable();
            $table->longText('why_text')->nullable();
            $table->longText('how_text')->nullable();

            $table->mediumText('website')->nullable();

            $table->mediumText('main_picture')->nullable();
            $table->mediumText('picture_1')->nullable();
            $table->mediumText('picture_2')->nullable();
            $table->mediumText('picture_3')->nullable();

            $table->string('title_legend');
            $table->string('products_legend');

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('organizations');
    }
}
