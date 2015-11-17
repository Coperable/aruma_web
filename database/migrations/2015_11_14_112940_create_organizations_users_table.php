<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrganizationsUsersTable extends Migration {

    public function up() {

		Schema::create('organizations_users', function(Blueprint $table) {

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('organization_id')->unsigned();
            $table->foreign('organization_id')->references('id')->on('organizations');
			$table->timestamps();

		});
    }

    public function down() {
		Schema::drop('organizations_users');
    }
}
