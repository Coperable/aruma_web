<?php namespace Aruma\Http\Controllers;

use Illuminate\Http\Request;
use Config;
use Carbon;
use Log;
use DB;
use Illuminate\Support\Collection;
use Aruma\User;
use Aruma\Model\GeoPoint;
use Aruma\Model\Location;
use Aruma\Model\Center;
use Aruma\Model\Organization;

class GeoPointController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show']]);
    }

	public function index() {
        $geoPoints = GeoPoint::all();
        return $geoPoints;
	}

	public function show($id) {
        $geoPoint = GeoPoint::find($id);
        $geoPoint->location;
        $geoPoint->organization;
        return $geoPoint;
	}

	public function store(Request $request) {
        $geoPoint = new GeoPoint;

        DB::transaction(function() use ($request, $geoPoint) {

            $geo = $this->processGeoValue($request->input('location'));
            $location = Location::firstOrCreate($geo);
            $location->save();

            $geoPoint->description = $request->input('description');
            $geoPoint->location_id = $location->id;
            $geoPoint->organization_id = $request->input('organization_id');
            $geoPoint->save();

        });

        return $geoPoint;
	}

	public function update(Request $request, $id) {
        $geoPoint = GeoPoint::find($id);
        DB::transaction(function() use ($request, $geoPoint) {

            if($request->has('location')) {
                $pregeo = $request->input('location');
                if(isset($pregeo['address_components'])) {
                    $geo = $this->processGeoValue($pregeo);
                    $location = Location::firstOrCreate($geo);
                    $location->save();
                    $geoPoint->location_id = $location->id;
                }
            }

            $geoPoint->description = $request->input('description');
            $geoPoint->organization_id = $request->input('organization_id');
            $geoPoint->save();

        });

        return $geoPoint;
	}


	public function destroy($id) {
        GeoPoint::destroy($id);
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

        if(isset($geo['address_components'])) {
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

        }
    
        Log::info($result);
        return $result;
    }

}


