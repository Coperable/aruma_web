<?php namespace Aruma\Http\Controllers;

use Illuminate\Http\Request;
use Config;
use Log;
use DB;
use Illuminate\Support\Collection;
use Aruma\User;
use Aruma\Model\Product;
use Aruma\Model\Center;
use Aruma\Model\Organization;

class ProductController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show']]);
    }

	public function index() {
        $products = Product::all();
        return $products;
	}

	public function show($id) {
        $product = Product::find($id);
        return $product;
	}

	public function store(Request $request) {
        $product = new Product;

        DB::transaction(function() use ($request, $product) {

            $product->name = $request->input('name');
            $product->description = $request->input('description');
            $product->details = $request->input('details');
            $product->main_picture = $request->input('main_picture');

            $product->organization_id = $request->input('organization_id');

            $product->save();
        });

        return $product;
	}

	public function update(Request $request, $id) {
        $product = Product::find($id);
        DB::transaction(function() use ($request, $product) {

            $product->name = $request->input('name');
            $product->description = $request->input('description');
            $product->details = $request->input('details');
            $product->main_picture = $request->input('main_picture');
            $product->organization_id = $request->input('organization_id');

            $product->save();
        });

        return $product;
	}


	public function destroy($id) {
        DB::table('products_medias')->where('product_id', '=', $id)->delete();
        Product::destroy($id);
	}


}

