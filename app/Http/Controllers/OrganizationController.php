<?php namespace Aruma\Http\Controllers;

use Illuminate\Http\Request;
use Config;
use Log;
use DB;
use Carbon;
use Illuminate\Support\Collection;
use Aruma\User;
use Aruma\Model\Organization;
use Aruma\Model\Media;
use Aruma\Model\OrganizationMedia;
use Aruma\Model\Location;
use Aruma\Model\UserOrganization;

class OrganizationController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show']]);
    }

	public function index() {
        $organizations = Organization::all();
        return $organizations;
	}

	public function show($id) {
        $organization = Organization::find($id);
        $organization->activities;
        $organization->products;
        $organization->medias;
        //$organization->location;
        $organization->users;
        return $organization;
	}

	public function medias($id) {
        $organization = Organization::find($id);
        return $organization->medias;
	}

	public function store(Request $request) {
        $user = User::find($request['user']['sub']);
        $organization = new Organization;

        DB::transaction(function() use ($request, $organization, $user) {
            $organization->user_id = $user->id;

            $organization->name = $request->input('name');
            $organization->description = $request->input('description');
            $organization->main_picture = $request->input('main_picture');

            $organization->slogan = $request->input('slogan');
            $organization->what_for_title = $request->input('what_for_title');
            $organization->why_title = $request->input('why_title');
            $organization->how_title = $request->input('how_title');
            $organization->what_for_text = $request->input('what_for_text');
            $organization->why_text = $request->input('why_text');
            $organization->how_text = $request->input('how_text');
            $organization->website = $request->input('website');
            $organization->twitter_hashtag = $request->input('twitter_hashtag');
            $organization->instagram_hashtag = $request->input('instagram_hashtag');
            $organization->main_picture = $request->input('main_picture');
            $organization->media_id = $request->input('media_id');
            $organization->title_legend = $request->input('title_legend');
            $organization->products_legend = $request->input('products_legend');

            $organization->save();
                 
            if($organization->media_id) {
                $organizationMedia = OrganizationMedia::firstOrCreate([
                    'media_id' => $organization->media_id,
                    'organization_id' => $organization->id
                ]);
            }

        });

        return $organization;
	}

	public function update(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $organization = Organization::find($id);
        DB::transaction(function() use ($request, $organization, $user) {
            $organization->user_id = $user->id;

            $organization->name = $request->input('name');
            $organization->description = $request->input('description');
            $organization->main_picture = $request->input('main_picture');

            $organization->slogan = $request->input('slogan');
            $organization->what_for_title = $request->input('what_for_title');
            $organization->why_title = $request->input('why_title');
            $organization->how_title = $request->input('how_title');
            $organization->what_for_text = $request->input('what_for_text');
            $organization->why_text = $request->input('why_text');
            $organization->how_text = $request->input('how_text');
            $organization->website = $request->input('website');
            $organization->main_picture = $request->input('main_picture');
            $organization->media_id = $request->input('media_id');
            $organization->twitter_hashtag = $request->input('twitter_hashtag');
            $organization->instagram_hashtag = $request->input('instagram_hashtag');
            $organization->title_legend = $request->input('title_legend');
            $organization->products_legend = $request->input('products_legend');

            if($organization->media_id) {
                $organizationMedia = OrganizationMedia::firstOrCreate([
                    'media_id' => $organization->media_id,
                    'organization_id' => $organization->id
                ]);
            }

            Log::info($organization);
            $organization->save();
         
        });

        return $organization;
	}

	public function destroy($id) {
        Organization::destroy($id);
	}


    public function processGeoValue($geo) {
        Log::info($geo);
        $result = array(
            'formatted_address' => $geo['formatted_address'],
            'google_id' => $geo['id'],
            'place_id' => $geo['place_id'],
            'name' => $geo['name'],
        );
        $values_allowed = array(
            'sublocality' => true,
            'locality' => true,
            'sublocality_level_1',
            'administrative_area_level_2' => true,
            'administrative_area_level_1' => true,
            'country' => true,
            'latitude ' => true,
            'longitude' => true
        );

        $address_components = $geo['address_components'];
        if(is_array($address_components)) {
            foreach($address_components as $component) {
                $key_code =  $component['types'][0];
                if(isset($values_allowed[$key_code])) {
                    if($key_code == 'sublocality_level_1') {
                        $key_code = 'sublocality';
                    }
                    $result[$key_code] = $component['short_name']; 
                }
            }
        }
    
        Log::info($result);
        return $result;
    }

	public function setMainPicture(Request $request, $organizationId, $mediaId) {
        $user = User::find($request['user']['sub']);
        $organization = Organization::find($organizationId);
        $media = Media::find($mediaId);
        DB::transaction(function() use ($request, $organization, $media) {
            $organization->main_picture = $media->name;
            $organization->save();
        });

        return $media;
    }

}

