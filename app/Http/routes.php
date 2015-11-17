<?php

Route::post('auth/login', 'Auth\AuthController@login');
Route::post('auth/signup', 'Auth\AuthController@signup');

Route::get('api/profile', ['middleware' => 'auth', 'uses' => 'ParticipantController@getProfile']);

Route::get('api/me', ['middleware' => 'auth', 'uses' => 'UserController@getUser']);
Route::put('api/me', ['middleware' => 'auth', 'uses' => 'UserController@updateUser']);

Route::post('api/users/assign/roles',  ['middleware' => 'auth', 'uses' => 'UserController@assignRoles']);
Route::post('api/users/assign/regions',  ['middleware' => 'auth', 'uses' => 'UserController@assignRegions']);

Route::resource('api/users', 'UserController');

Route::resource('api/centers', 'CenterController');
Route::resource('api/organizations', 'OrganizationController');
Route::resource('api/products', 'ProductController');
Route::resource('api/activities', 'ActivityController');

Route::post('api/media/upload', ['middleware' => 'auth', 'uses' => 'MediaController@storeImage']);

Route::get('/', function () {
    return view('welcome');
});
Route::get('/admin', function () {
    return view('admin');
});
