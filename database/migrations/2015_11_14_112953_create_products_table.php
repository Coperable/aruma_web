<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration {

    public function up() {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('organization_id')->unsigned();
            $table->foreign('organization_id')->references('id')->on('organizations');

            $table->string('name');

            $table->longText('description')->nullable();
            $table->longText('details')->nullable();

            $table->mediumText('main_picture')->nullable();
            $table->mediumText('picture_1')->nullable();

            $table->timestamps();
        });


    }

    public function down() {
        Schema::drop('products');
    }
}
