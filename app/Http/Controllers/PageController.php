<?php namespace Aruma\Http\Controllers;

use Illuminate\Http\Request;
use Config;
use Log;
use DB;
use Illuminate\Support\Collection;
use Aruma\User;
use Aruma\Model\Page;
use Aruma\Model\Center;
use Aruma\Model\Organization;

class PageController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show', 'home']]);
    }

	public function index() {
        $pages = Page::all();
        return $pages;
	}

	public function show($id) {
        $page = Page::find($id);
        return $page;
	}

	public function home() {
        $home = Page::where('is_home', '=', true)->firstOrFail();
        Log::info($home);
        //$activities = DB::table('activities')->where('remark', '=', 1)->select('id', 'main_picture', 'title as name', 'description')->get();
        $activities = DB::table('activities')->select('id', 'main_picture', 'title as name', 'description')->get();
        $organizations = DB::table('organizations')->where('remark', '=', 1)->select('id', 'name', 'main_picture', 'slogan as description')->get();
        $products = DB::table('products')->where('remark', '=', 1)->select('id', 'name', 'main_picture', 'description')->get();
        $centers = DB::table('centers')->select('id', 'title as name', 'main_picture', 'description')->get();

        $home->activities = $activities;
        $home->organizations = $organizations;
        $home->products = $products;
        $home->centers = $centers;


        return $home;
	}


	public function store(Request $request) {
        $page = new Page;

        DB::transaction(function() use ($request, $page) {
            $page->title = $request->input('title');
            $page->description = $request->input('description');
            $page->details = $request->input('details');
            $page->main_picture = $request->input('main_picture');
            $page->is_home = $request->input('is_home');
            $page->twitter_link = $request->input('twitter_link');
            $page->instagram_link = $request->input('instagram_link');
            $page->facebook_link = $request->input('facebook_link');
            $page->vimeo_link = $request->input('vimeo_link');
            $page->pinterest_link = $request->input('pinterest_link');
            $page->twitter_hashtag = $request->input('twitter_hashtag');
            $page->instagram_hashtag = $request->input('instagram_hashtag');
            $page->instagram_username = $request->input('instagram_username');

            $page->save();
        });

        return $page;
	}

	public function update(Request $request, $id) {
        $page = Page::find($id);
        DB::transaction(function() use ($request, $page) {

            $page->title = $request->input('title');
            $page->description = $request->input('description');
            $page->details = $request->input('details');
            $page->main_picture = $request->input('main_picture');
            $page->is_home = $request->input('is_home');
            $page->twitter_link = $request->input('twitter_link');
            $page->facebook_link = $request->input('facebook_link');
            $page->instagram_link = $request->input('instagram_link');
            $page->vimeo_link = $request->input('vimeo_link');
            $page->pinterest_link = $request->input('pinterest_link');

            $page->twitter_hashtag = $request->input('twitter_hashtag');
            $page->instagram_hashtag = $request->input('instagram_hashtag');
            $page->instagram_username = $request->input('instagram_username');

            $page->save();
        });

        return $page;
	}


	public function destroy($id) {
        Page::destroy($id);
	}


}
