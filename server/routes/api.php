<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => 'Api'], function() {
    Route::post('/register', 'AuthController@register');
    Route::post('/login', 'AuthController@login');
    Route::get('/verify/{code}', 'AuthController@verifyUser');

    Route::middleware('auth:api')->group(function (){
        Route::apiResource('user', 'UserController');

        Route::get('/folder', 'FolderController@index');
        Route::get('folder/{folderId}', 'FolderController@show');
        Route::post('/folder', 'FolderController@store');
        Route::put('folder/{folderId}', 'FolderController@update');
        Route::put('folder/cut/{folderId}', 'FolderController@cutFolder');
        Route::delete('folder/{folderId}', 'FolderController@destroy');
        Route::put('folder/copy/{folderId}', 'FolderController@copyFolder');

        Route::get('tree', 'FolderController@tree');

        Route::post('/file', 'FileController@store');
        Route::put('file/{folderId}', 'FileController@update');
        Route::delete('file/{fileId}', 'FileController@destroy');
        Route::put('file/copy/{fileId}', 'FileController@copyFile');
        Route::post('file/create', 'FileController@createFile');
    });
});
