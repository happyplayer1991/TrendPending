<?php

require_once 'functions/functions.php';

if(!empty($_GET['field'])):

    $field = $_GET['field'];

    $vehicle = json_decode($_GET['vehicle'], true);

    $result = search_auto_complete_with_selection('ymmt', $field, '', $vehicle);

    echo $result;
endif;