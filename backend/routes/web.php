<?php

$router->get('/user', 'UserController@index');
$router->get('/user/{id}', 'UserController@show');
$router->post('/user', 'UserController@store');
$router->put('/user/{id}', 'UserController@update');
$router->delete('/user/{id}', 'UserController@delete');
$router->get('/user', 'UserController@search');

