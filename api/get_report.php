<?php

require_once 'functions/functions.php';

if(!empty($_GET['field'])):

    $field = $_GET['field'];

    $ymmt = array( 
        'year' => '2018',
        'make' => 'Ford',
        'model' => 'EcoSport',
        'trim' => 'S'
    );

    if($field == 'drivetrain'):
        $result = search_auto_complete_with_selection('drivetrain', '', $ymmt);
    elseif($field == 'body_type'): 
        $result = search_auto_complete_with_selection('body_type', '', $ymmt);
    endif;

    echo $result;
endif;