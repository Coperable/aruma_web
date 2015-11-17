<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactsTable extends Migration {

	public function up() {

		Schema::create('contacts', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();

            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->longText('comment', 1000)->nullable();
            $table->boolean('verified')->default(false);

		});
	}

	public function down() {
		Schema::drop('contacts');
	}

}



