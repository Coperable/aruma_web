<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePageTable extends Migration {
    public function up() {
        Schema::create('pages', function (Blueprint $table) {
            $table->increments('id');

            $table->string('title');
            $table->longText('description')->nullable();
            $table->mediumText('details')->nullable();

            $table->mediumText('main_picture')->nullable();

            $table->boolean('is_home')->default(false);

            $table->mediumText('twitter_link')->nullable();
            $table->mediumText('facebook_link')->nullable();
            $table->mediumText('instagram_link')->nullable();
            $table->mediumText('vimeo_link')->nullable();
            $table->mediumText('pinterest_link')->nullable();

            $table->mediumText('twitter_hashtag')->nullable();
            $table->mediumText('instagram_username')->nullable();
            $table->mediumText('instagram_hashtag')->nullable();

            $table->timestamps();
        });

    }

    public function down() {
        Schema::drop('pages');
    }
}
