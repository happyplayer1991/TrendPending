<?php

$request_uri = explode('/', $_SERVER['REQUEST_URI']);

switch ($request_uri[3]) {
    // ***  Main page *** //
    case '':
        require 'pages/main.php';
        break;
    // *** Main page *** //
    case 'results':
        require 'pages/main.php';
        break;

    //API
    
    case 'api':
        if(strpos($request_uri[4], 'get_ymmt_list') !== false):
            require 'api/get_ymmt_list.php';
        elseif(strpos($request_uri[4], 'get_report') !== false):
            require 'api/get_report.php';
        endif;
        break;
    
    // Everything else
    default:

        break;
}