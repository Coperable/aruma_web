<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCentersTable extends Migration {

    public function up() {
        Schema::create('centers', function (Blueprint $table) {
            $table->increments('id');

            $table->string('title');

            $table->longText('coordinators')->nullable();

            $table->longText('description')->nullable();
            $table->longText('details')->nullable();

			$table->dateTime('event_date')->nullable();

            $table->string('place')->nullable();
            $table->integer('location_id')->unsigned();
            $table->foreign('location_id')->references('id')->on('locations');

            $table->mediumText('main_picture')->nullable();
            $table->mediumText('picture_1')->nullable();
            $table->mediumText('picture_2')->nullable();

            $table->string('twitter_hashtag')->nullable();
            $table->string('instagram_hashtag')->nullable();

            $table->mediumText('categories')->nullable();

            $table->timestamps();
        });


    }

    public function down() {
        Schema::drop('centers');
    }



}
