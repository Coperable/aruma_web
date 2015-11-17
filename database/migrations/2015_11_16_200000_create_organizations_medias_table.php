<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrganizationsMediasTable extends Migration {

    public function up() {

		Schema::create('organizations_medias', function(Blueprint $table) {

            $table->integer('media_id')->unsigned();
            $table->foreign('media_id')->references('id')->on('medias');
            $table->integer('organization_id')->unsigned();
            $table->foreign('organization_id')->references('id')->on('organizations');
			$table->timestamps();

		});
    }

    public function down() {
		Schema::drop('organizations_medias');
    }
}
