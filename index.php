<?php

$request_uri = explode('/', $_SERVER['REQUEST_URI']);
switch ($request_uri[3]) {
    // ***  Home page *** //
    case '':
        require 'pages/trendpending.php';
        break;
    // *** results *** //
    case 'results':
        require 'pages/trendpending.php';
        break;
    // Everything else
    default:

        break;
}