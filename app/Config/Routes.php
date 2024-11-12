<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->group('api', ['filter' => 'auth'], static function($routes) {
    
    $routes->post('student/create', 'StudentController::create');
    
    $routes->get('student/list', 'StudentController::list');
    
    $routes->get('student/get/(:num)', 'StudentController::get/$1');
    
    $routes->post('student/update/(:num)', 'StudentController::update/$1');
    
    $routes->delete('student/delete/(:num)', 'StudentController::delete/$1');
});

$routes->get('/login', 'LoginController::index');

$routes->get('/register', 'RegisterController::register');

$routes->post('api/register/create', 'RegisterController::create');

$routes->post('api/login/store', 'LoginController::store');
 
$routes->get('/student', 'StudentController::index');

$routes->get('/', 'Home::index');