<?php

namespace Aruma\Http\Controllers\Auth;

use Log;
use Password;
use Illuminate\Mail\Message;
use Illuminate\Http\Request;
use Aruma\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;

class PasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    protected $redirectTo = '/';

    public function __construct() {
        $this->middleware('guest');
    }

    public function postEmail(Request $request) {

        $this->validate($request, ['email' => 'required|email']);

        $response = Password::sendResetLink($request->only('email'), function (Message $message) {
            $message->subject($this->getEmailSubject());
        });
        Log::info('se envio mail');

        switch ($response) {
            case Password::RESET_LINK_SENT:
                return response()->json(['message' => 'Se envió mail'], 200);

            case Password::INVALID_USER:
                return response()->json(['message' => 'error: '.trans($response)], 400);
        }
    }



    public function postReset(Request $request) {
        $this->validate($request, [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed',
        ]);

        $credentials = $request->only(
            'email', 'password', 'password_confirmation', 'token'
        );

        $response = Password::reset($credentials, function ($user, $password) {
            $this->resetPassword($user, $password);
        });

        switch ($response) {
            case Password::PASSWORD_RESET:
                //return redirect($this->redirectPath());
                return redirect('/');

            default:
            return redirect()->back()
                        ->withInput($request->only('email'))
                        ->withErrors(['email' => trans($response)]);
        }
}

}
