<?php namespace Aruma\Http\Controllers;

use Illuminate\Http\Request;
use Config;
use Carbon;
use Log;
use DB;
use Illuminate\Support\Collection;
use Aruma\User;
use Aruma\Model\Center;
use Aruma\Model\Location;
use Aruma\Model\Competition;

class CenterController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show', 'activities', 'members', 'summary']]);
    }

	public function index() {
        $centers = Center::all();
        return $centers;
	}

	public function show($id) {
        $center = Center::find($id);
        $center->activities;
        $center->users;
        $center->organizations;
        return $center;
	}

	public function summary($centerId) {
        $center = Center::find($centerId);
        
        $members = new Collection();
        $past_activities = new Collection();
        $next_activities = new Collection();
        $next_competition = array();
        $activities = array();

        if($centerId == 1) {
            $activities = Competition::all();
            $center->activities = $activities;
        } else {
            $activities = $center->activities;
        }
        $activities->each(function($competition) use ($past_activities, $next_activities, $members)  {
            $competition->users->each(function($member) use ($members) {
                $members->push($member);
            });
            $competition->location;
            if (Carbon::now()->gte($competition->event_date)) {
                $competition->past = true;
                $past_activities->push($competition);
            } else {
                $competition->past = false;
                $next_activities->push($competition);
            }
        });

        Log::info($members);


        $center->next_competition = $next_activities->first();
        $center->next_activities = $next_activities;
        $center->past_activities = $past_activities;
        $center->activities_count = count($activities);
        $center->members = $members->unique();
        $center->members_count = count($center->members);
    
        return $center;
	}


	public function store(Request $request) {
        $user = User::find($request['user']['sub']);
        $center = new Center;

        DB::transaction(function() use ($request, $center, $user) {
            $geo = $this->processGeoValue($request->input('location'));
            $location = Location::firstOrCreate($geo);
            $location->save();

            $center->title = $request->input('title');
            $center->description = $request->input('description');
            $center->details = $request->input('details');
            $center->main_picture = $request->input('main_picture');
            $center->twitter_hashtag = $request->input('twitter_hashtag');
            $center->instagram_hashtag = $request->input('instagram_hashtag');
            $center->location_id = $location->id;
            $center->save();
                 
        });

        return $center;
	}

	public function update(Request $request, $id) {
        $center = Center::find($id);
        DB::transaction(function() use ($request, $center, $user) {
            $geo = $this->processGeoValue($request->input('location'));
            $location = Location::firstOrCreate($geo);
            $location->save();

            $center->title = $request->input('title');
            $center->description = $request->input('description');
            $center->details = $request->input('details');
            $center->main_picture = $request->input('main_picture');
            $center->twitter_hashtag = $request->input('twitter_hashtag');
            $center->instagram_hashtag = $request->input('instagram_hashtag');
            $center->location_id = $location->id;
            $center->save();
 
        });

        return $center;
	}

    public function activities(Request $request, $centerId) {
        $center = Center::find($centerId);
        return $center->activities;
    }

    public function members(Request $request, $centerId) {
        $center = Center::find($centerId);
        return $center->users;
    }


	public function destroy($id) {
        Center::destroy($id);
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


}



