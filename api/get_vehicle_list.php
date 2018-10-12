<?php

require_once 'functions/functions.php';

if(!empty($_GET['q'])):

    $query = $_GET['q'];

    // $response = array();
    // $response['search'] = search_auto_complete('ymm', '2018f');
    // echo json_encode($response);

    // *** get result after call search_auto_complete_with_field_and_input api
    $ymm_list = search_auto_complete_with_field_and_input('ymm', $query);

    $ymm_list_arr = json_decode($ymm_list, true);
    $terms = $ymm_list_arr["terms"];

    $count = 0;
    $result = array();
    foreach($terms as $key=>$term) {
        if($key >= 10) {
            break;
        }
        else if($count >= 10) {
            break;
        }
        else if($key < 10) {
            // get year, make, model
            $ymm = year_make_model($term);
            $response = search_auto_complete_with_selection('ymm', 'trim', '', $ymm);
            $response_arr = json_decode($response, true);
            $terms = $response_arr["terms"]; 
            foreach($terms as $term) {
                $vehicle = $ymm;
                $vehicle['trim'] = $term;
                if($count < 10) {
                    array_push($result, $vehicle);
                    $count ++;
                }
            }
        }
    }

    // echo $result;
    echo json_encode($result);
endif;
?>