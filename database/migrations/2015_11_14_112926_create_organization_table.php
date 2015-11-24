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
            $table->string('what_for_title')->nullable();
            $table->string('why_title')->nullable();
            $table->string('how_title')->nullable();
            $table->longText('what_for_text')->nullable();
            $table->longText('why_text')->nullable();
            $table->longText('how_text')->nullable();

            $table->mediumText('instagram_hashtag')->nullable();
            $table->mediumText('twitter_hashtag')->nullable();

            $table->mediumText('website')->nullable();

            $table->mediumText('main_picture')->nullable();
            $table->integer('media_id')->unsigned();

            $table->boolean('remark')->default(true);
            $table->boolean('novelty')->default(false);

            $table->string('title_legend')->nullable();
            $table->string('products_legend')->nullable();

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
