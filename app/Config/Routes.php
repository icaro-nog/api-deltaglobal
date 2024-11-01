<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->get('/customer', 'StudentController::index');

$routes->get('/', 'Home::index');

$routes->get('/api/student/test', 'StudentController::test');