<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGeoPointsTable extends Migration {

    public function up() {

		Schema::create('geo_points', function(Blueprint $table) {

            $table->increments('id');
            $table->integer('location_id')->unsigned();
            $table->foreign('location_id')->references('id')->on('locations');
            $table->integer('organization_id')->unsigned();
            $table->foreign('organization_id')->references('id')->on('organizations');
            $table->string('description')->nullable();
			$table->timestamps();

		});

    }

    public function down() {
		Schema::drop('geo_points');
    }
}
