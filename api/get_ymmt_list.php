<?php

require_once 'functions/functions.php';

if(!empty($_GET['q'])):

    $query = $_GET['q'];

    
    // $response = array();
    // $response['search'] = search_auto_complete('ymm', '2018f');
    // echo json_encode($response);

    // *** get result after call search_auto_complete_with_filed_and_input api
    $result = search_auto_complete_with_filed_and_input('ymm', $query);

    echo $result;
endif;
?>