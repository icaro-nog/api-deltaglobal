<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->get('/customer', 'CustomerController::index');

$routes->get('/', 'Home::index');
