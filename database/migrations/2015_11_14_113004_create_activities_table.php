<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateActivitiesTable extends Migration {

    public function up() {
        Schema::create('activities', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('organization_id')->unsigned()->nullable;
            $table->foreign('organization_id')->references('id')->on('organizations');

            $table->integer('center_id')->unsigned()->nullable;
            $table->foreign('center_id')->references('id')->on('centers');

            $table->string('title');

            $table->longText('coordinators')->nullable();

            $table->longText('description')->nullable();
            $table->longText('details')->nullable();

			$table->dateTime('event_date')->nullable();

            $table->string('place')->nullable();
            $table->integer('location_id')->unsigned();
            $table->foreign('location_id')->references('id')->on('locations');

            $table->mediumText('main_picture')->nullable();
            $table->integer('media_id')->unsigned();

            $table->string('twitter_hashtag')->nullable();
            $table->string('instagram_hashtag')->nullable();

            $table->mediumText('categories')->nullable();

            $table->boolean('center_activity')->default(FALSE);

            $table->boolean('remark')->default(false);
            $table->boolean('novelty')->default(false);

            $table->timestamps();
        });


    }

    public function down() {
        Schema::drop('activities');
    }

}
