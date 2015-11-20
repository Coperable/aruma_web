<?php

namespace Aruma\Http\Controllers\Auth;

use Config;
use Hash;
use Log;
use JWT;
use Validator;

use Aruma\User;
use Aruma\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Aruma\Jobs\UpdateProfilePicture;
use Storage;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */
    /*

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    */

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
/*
    public function __construct() {
        $this->middleware('guest', ['except' => 'getLogout']);
    }
*/
    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
/*
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);
    }
*/

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
/*
    protected function create(array $data) {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }

*/
//Start

    protected function createToken($user) {
        $payload = [
            'sub' => $user->id,
            'iat' => time(),
            'exp' => time() + (2 * 7 * 24 * 60 * 60)
        ];
        return JWT::encode($payload, Config::get('app.token_secret'));
    }


    public function login(Request $request) {
        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::where('email', '=', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'Wrong email and/or password'], 401);
        }

        if (Hash::check($password, $user->password)) {
            unset($user->password);


            if(!isset($user->photo)) {
                //$this->dispatch(new UpdateProfilePicture($user));
                $gravatar = md5(strtolower(trim($user->email)));
                $user->photo = $gravatar;
                $user->save();
                Storage::disk('s3-aruma')->put('/aruma/profiles/' . $gravatar, file_get_contents('http://www.gravatar.com/avatar/'.$gravatar.'?d=identicon&s=150'), 'public');
            }
 

            return response()->json([
                'token' => $this->createToken($user),
                'select_profile' => ($user->profile_type == null) 
            ]);
        } else {
            return response()->json(['message' => 'Wrong email and/or password'], 401);
        }
    }

    public function signup(Request $request) {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->messages()], 400);
        }

        $user = new User;
        $user->username = $request->input('username');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->save();

        //$this->dispatch(new UpdateProfilePicture($user));
        $gravatar = md5(strtolower(trim($user->email)));
        $user->photo = $gravatar;
        $user->save();
        Storage::disk('s3-aruma')->put('/aruma/profiles/' . $gravatar, file_get_contents('http://www.gravatar.com/avatar/'.$gravatar.'?d=identicon&s=150'), 'public');


        return response()->json(['token' => $this->createToken($user)]);
    }

}

