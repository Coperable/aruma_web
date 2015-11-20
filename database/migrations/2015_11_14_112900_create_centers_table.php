<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCentersTable extends Migration {

    public function up() {
        Schema::create('centers', function (Blueprint $table) {
            $table->increments('id');

            $table->string('title');

            $table->longText('description')->nullable();
            $table->mediumText('details')->nullable();

            $table->string('place')->nullable();
            $table->integer('location_id')->unsigned();
            $table->foreign('location_id')->references('id')->on('locations');

            $table->mediumText('main_picture')->nullable();

            $table->string('twitter_hashtag')->nullable();
            $table->string('instagram_hashtag')->nullable();

            $table->timestamps();
        });


    }

    public function down() {
        Schema::drop('centers');
    }



}
