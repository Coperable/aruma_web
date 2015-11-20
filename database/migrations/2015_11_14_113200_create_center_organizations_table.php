<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCenterOrganizationsTable extends Migration {

    public function up() {

        Schema::create('centers_organizations', function(Blueprint $table) {

            $table->integer('center_id')->unsigned();
            $table->foreign('center_id')->references('id')->on('centers');
            $table->integer('organization_id')->unsigned();
            $table->foreign('organization_id')->references('id')->on('organizations');
            $table->boolean('admin')->default(true);
            $table->timestamps();

        });
    }

    public function down() {
		Schema::drop('centers_organizations');
    }
}
