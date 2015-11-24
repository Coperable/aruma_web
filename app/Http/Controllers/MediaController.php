<?php namespace Aruma\Http\Controllers;

use Illuminate\Http\Request;
use Config;
use Storage;
use File;
use Log;
use DB;
use Validator;
use Response;
use Illuminate\Support\Collection;
use Aruma\User;
use Aruma\Model\Media;
use Aruma\Model\OrganizationMedia;
use Aruma\Model\ActivityMedia;

class MediaController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show', 'videosSearch', 'parseVideoId']]);
    }

	public function index() {
        $medias = Media::where('active', true)->get();
        return $medias;
	}

    public function show($id) {
        $media = Media::find($id);
        $file = Storage::disk('local')->get($media->name);
        return response($file, 200)->header('Content-Type', 'image/'.$media->ext);
    }


    public function storeImage(Request $request) {

        if(!$request->hasFile('file')) { 
            return Response::json(['error' => 'No File Sent']);
        }

        if(!$request->file('file')->isValid()) {
            return Response::json(['error' => 'File is not valid']);
        }

        $file = $request->file('file');

        $v = Validator::make(
            $request->all(),
            ['file' => 'required|mimes:jpeg,jpg,png|max:8000']
        );

        if($v->fails()) {
            return Response::json(['error' => $v->errors()]);
        }


        $image = $this->processImageUpload($request);
        return Response::json(['OK' => 1, 'filename' => $image->name, 'media_id' => $image->id]);
    }


    public function processImageUpload(Request $request) {
        $user = User::find($request['user']['sub']);
        $file = $request->file('file');

        $image = Media::create([
            'name' => $request->file('file')->getClientOriginalName(),
            'ext' => $request->file('file')->guessExtension(),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'user_id' => $user->id,
            'type' => 'IMAGE'
        ]);
        
        $filename = 'media_'.md5(strtolower(trim($image->name))).'_'.$image->id . '.' . $image->ext;

        $image->name = $filename;
        $image->save();

        Storage::disk('local')->put($filename,  File::get($file));
        Storage::disk('s3-aruma')->put('/aruma/' . $filename, file_get_contents($file), 'public');
        
        return $image;

    }

    public function addOrganizationMedia(Request $request, $organizationId) {

        if(!$request->hasFile('file')) { 
            return Response::json(['error' => 'No File Sent']);
        }

        if(!$request->file('file')->isValid()) {
            return Response::json(['error' => 'File is not valid']);
        }

        $file = $request->file('file');

        $v = Validator::make(
            $request->all(),
            ['file' => 'required|mimes:jpeg,jpg,png|max:8000']
        );

        if($v->fails()) {
            return Response::json(['error' => $v->errors()]);
        }

        $image = $this->processImageUpload($request);

        //return Response::json(['OK' => 1, 'filename' => $filename, 'media_id' => $image->id]);

        DB::transaction(function() use ($request, $image, $organizationId) {
            $organizationMedia = OrganizationMedia::firstOrCreate([
                'media_id' => $image->id,
                'organization_id' => $organizationId
            ]);

        });
        return Response::json(['OK' => 1, 'filename' => $image->name, 'media_id' => $image->id]);
 
    }


    public function addActivityMedia(Request $request, $activityId) {

        if(!$request->hasFile('file')) { 
            return Response::json(['error' => 'No File Sent']);
        }

        if(!$request->file('file')->isValid()) {
            return Response::json(['error' => 'File is not valid']);
        }

        $file = $request->file('file');

        $v = Validator::make(
            $request->all(),
            ['file' => 'required|mimes:jpeg,jpg,png|max:8000']
        );

        if($v->fails()) {
            return Response::json(['error' => $v->errors()]);
        }

        $image = $this->processImageUpload($request);

        //return Response::json(['OK' => 1, 'filename' => $filename, 'media_id' => $image->id]);

        DB::transaction(function() use ($request, $image, $activityId) {
            $activityMedia = ActivityMedia::firstOrCreate([
                'media_id' => $image->id,
                'activity_id' => $activityId
            ]);

        });
        return Response::json(['OK' => 1, 'filename' => $image->name, 'media_id' => $image->id]);
 
    }


}

