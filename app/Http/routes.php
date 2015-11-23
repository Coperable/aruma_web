<?php

Route::post('auth/login', 'Auth\AuthController@login');
Route::post('auth/signup', 'Auth\AuthController@signup');

Route::get('api/profile', ['middleware' => 'auth', 'uses' => 'ParticipantController@getProfile']);

Route::get('api/me', ['middleware' => 'auth', 'uses' => 'UserController@getUser']);
Route::put('api/me', ['middleware' => 'auth', 'uses' => 'UserController@updateUser']);

Route::post('api/users/assign/roles',  ['middleware' => 'auth', 'uses' => 'UserController@assignRoles']);
Route::post('api/users/assign/centers',  ['middleware' => 'auth', 'uses' => 'UserController@assignCenters']);
Route::post('api/users/assign/organizations',  ['middleware' => 'auth', 'uses' => 'UserController@assignOrganizations']);

Route::resource('api/users', 'UserController');

Route::resource('api/centers', 'CenterController');
Route::resource('api/organizations', 'OrganizationController');
Route::resource('api/products', 'ProductController');
Route::resource('api/activities', 'ActivityController');
Route::resource('api/roles', 'RoleController');

Route::get('api/pages/home', ['uses' => 'PageController@home']);
Route::resource('api/pages', 'PageController');

Route::post('api/media/upload', ['middleware' => 'auth', 'uses' => 'MediaController@storeImage']);
Route::post('api/media/organization/{organizationId}/upload', ['middleware' => 'auth', 'uses' => 'MediaController@addOrganizationMedia']);

Route::get('api/organization/{id}/medias', ['uses' => 'OrganizationController@medias']);

Route::post('api/organization/{organizationId}/mainPicture/{mediaId}', ['middleware' => 'auth', 'uses' => 'OrganizationController@setMainPicture']);

Route::get('api/center/{centerId}/summary', ['uses' => 'CenterController@summary']);

Route::get('api/centers/{centerId}/activities', ['middleware' => 'auth', 'uses' => 'CenterController@activities']);
Route::get('api/centers/{centerId}/members', ['middleware' => 'auth', 'uses' => 'CenterController@members']);

Route::post('password/email', 'Auth\PasswordController@postEmail');

Route::get('password/reset/{token}', 'Auth\PasswordController@getReset');
Route::post('password/reset', 'Auth\PasswordController@postReset');

Route::get('/', function () {
    return view('welcome');
});
Route::get('/admin', function () {
    return view('admin');
});
