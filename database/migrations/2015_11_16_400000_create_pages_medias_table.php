<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePagesMediasTable extends Migration {

    public function up() {

		Schema::create('pages_medias', function(Blueprint $table) {

            $table->integer('media_id')->unsigned();
            $table->foreign('media_id')->references('id')->on('medias');
            $table->integer('page_id')->unsigned();
            $table->foreign('page_id')->references('id')->on('pages');
			$table->timestamps();

		});
    }

    public function down() {
		Schema::drop('pages_medias');
    }
}
