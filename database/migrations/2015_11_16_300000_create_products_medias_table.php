<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsMediasTable extends Migration {

    public function up() {

		Schema::create('products_medias', function(Blueprint $table) {

            $table->integer('media_id')->unsigned();
            $table->foreign('media_id')->references('id')->on('medias');
            $table->integer('product_id')->unsigned();
            $table->foreign('product_id')->references('id')->on('products');
			$table->timestamps();

		});
    }

    public function down() {
		Schema::drop('products_medias');
    }
}
