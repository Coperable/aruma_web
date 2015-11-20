<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCenterUsersTable extends Migration {

    public function up() {

		Schema::create('centers_users', function(Blueprint $table) {

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('center_id')->unsigned();
            $table->foreign('center_id')->references('id')->on('centers');
            $table->boolean('admin')->default(true);
			$table->timestamps();

		});
    }

    public function down() {
		Schema::drop('centers_users');
    }
}
