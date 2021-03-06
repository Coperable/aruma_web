<?php namespace Aruma\Http\Controllers;

use Illuminate\Http\Request;
use Config;
use Carbon;
use Log;
use DB;
use Illuminate\Support\Collection;
use Aruma\User;
use Aruma\Model\Activity;
use Aruma\Model\Location;
use Aruma\Model\Center;
use Aruma\Model\Organization;
use Aruma\Model\Media;
use Aruma\Model\ActivityMedia;

class ActivityController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show']]);
    }

	public function index() {
        $activities = Activity::all();
        return $activities;
	}

	public function show($id) {
        $activity = Activity::find($id);
        Log:info($activity);
        $activity->medias;
        $activity->location;
        return $activity;
	}

	public function medias($id) {
        $activity = Activity::find($id);
        return $activity->medias;
	}

	public function store(Request $request) {
        $activity = new Activity;

        DB::transaction(function() use ($request, $activity) {

            if($request->has('location') && isset($request->input('location')['address_components'])) {
                $geo = $this->processGeoValue($request->input('location'));
                $location = Location::firstOrCreate($geo);
                $location->save();
                $activity->location_id = $location->id;
            }

            $activity->title = $request->input('title');
            $activity->description = $request->input('description');
            $activity->details = $request->input('details');
            $activity->main_picture = $request->input('main_picture');

            $arr = explode(".", $request->input('event_date'), 2);
            $event_date = str_replace("T", " ", $arr[0]);
            $activity->event_date = Carbon::createFromFormat('Y-m-d H:i:s', $event_date);


            $activity->twitter_hashtag = $request->input('twitter_hashtah');
            $activity->instagram_hashtag = $request->input('instagram_hashtag');

            $activity->organization_id = $request->input('organization_id');
            $activity->center_id = $request->input('center_id');
            $activity->coordinators = $request->input('coordinators');
            $activity->place = $request->input('place');
            $categories = $request->input('categories');
            $activity->categories = strtolower(implode(';', collect($categories)->flatten()->toArray()));
            $activity->center_activity = $request->input('center_activity');

            $activity->save();

            if($activity->media_id) {
                $activityMedia = ActivityMedia::firstOrCreate([
                    'media_id' => $activity->media_id,
                    'activity_id' => $activity->id
                ]);
            }



        });

        return $activity;
	}

	public function update(Request $request, $id) {
        $activity = Activity::find($id);
        DB::transaction(function() use ($request, $activity) {

            if($request->has('location')) {
                $pregeo = $request->input('location');
                if(isset($pregeo['address_components'])) {
                    $geo = $this->processGeoValue($pregeo);
                    $location = Location::firstOrCreate($geo);
                    $location->save();
                    $activity->location_id = $location->id;
                }
            }

            $activity->title = $request->input('title');
            $activity->description = $request->input('description');
            $activity->details = $request->input('details');
            $activity->main_picture = $request->input('main_picture');

            $arr = explode(".", $request->input('event_date'), 2);
            $event_date = str_replace("T", " ", $arr[0]);
            $activity->event_date = Carbon::createFromFormat('Y-m-d H:i:s', $event_date);


            $activity->twitter_hashtag = $request->input('twitter_hashtah');
            $activity->instagram_hashtag = $request->input('instagram_hashtag');

            $activity->organization_id = $request->input('organization_id');
            $activity->center_id = $request->input('center_id');
            $activity->coordinators = $request->input('coordinators');
            $activity->place = $request->input('place');
            $categories = $request->input('categories');
            $activity->categories = strtolower(implode(';', collect($categories)->flatten()->toArray()));
            $activity->center_activity = $request->input('center_activity');

            $activity->save();

            if($activity->media_id) {
                $activityMedia = ActivityMedia::firstOrCreate([
                    'media_id' => $activity->media_id,
                    'activity_id' => $activity->id
                ]);
            }


        });

        return $activity;
	}


	public function destroy($id) {
        DB::table('activities_medias')->where('activity_id', '=', $id)->delete();
        Activity::destroy($id);
	}

    public function processGeoValue($geo) {
        Log::info($geo);
        $result = array(
            'formatted_address' => $geo['formatted_address'],
            'google_id' => $geo['id'],
            'place_id' => $geo['place_id'],
            'name' => $geo['name']
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
        $coordinates = $geo['coordinates'];
        if(is_array($coordinates)) {
            $result['latitude'] = $coordinates['lat'];
            $result['longitude'] = $coordinates['lng'];
        }
    
        Log::info($result);
        return $result;
    }

	public function setMainPicture(Request $request, $activityId, $mediaId) {
        $user = User::find($request['user']['sub']);
        $activity = Activity::find($activityId);
        $media = Media::find($mediaId);
        DB::transaction(function() use ($request, $activity, $media) {
            $activity->main_picture = $media->name;
            $activity->save();
        });

        return $media;
    }

	public function removePicture(Request $request, $activityId, $mediaId) {
        $user = User::find($request['user']['sub']);
        $activity = Activity::find($activityId);
        DB::transaction(function() use ($request, $activity, $mediaId) {
            if($activity->media_id == $mediaId) {
                $activity->media_id = null;
                $activity->main_picture = null;
                $activity->save();
            }
            DB::table('activities_medias')->where('activity_id', '=', $activity->id)->where('media_id', '=', $mediaId)->delete();
            Media::destroy($mediaId);
        });
    }


}

