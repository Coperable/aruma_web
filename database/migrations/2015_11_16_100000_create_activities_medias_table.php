<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateActivitiesMediasTable extends Migration {

    public function up() {

		Schema::create('activities_medias', function(Blueprint $table) {

            $table->integer('media_id')->unsigned();
            $table->foreign('media_id')->references('id')->on('medias');
            $table->integer('activity_id')->unsigned();
            $table->foreign('activity_id')->references('id')->on('activities');
			$table->timestamps();

		});
    }

    public function down() {
		Schema::drop('activities_medias');
    }
}
