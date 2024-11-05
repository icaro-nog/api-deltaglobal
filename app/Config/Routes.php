<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->get('/student', 'StudentController::index');

$routes->get('/', 'Home::index');

$routes->get('/api/student/test', 'StudentController::test');

$routes->post('/api/student/create', 'StudentController::create');

$routes->get('api/student/list', 'StudentController::list');

$routes->get('api/student/get/(:num)', 'StudentController::get/$1');

$routes->put('api/student/update/(:num)', 'StudentController::update/$1');