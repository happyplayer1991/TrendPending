<?php

require_once 'functions/functions.php';

if(!empty($_GET['q'])):

    $query = $_GET['q'];
    $input = trim($query);

    // $response = array();
    // $response['search'] = search_auto_complete('ymm', '2018f');
    // echo json_encode($response);

    // *** get result after call search_auto_complete_with_field_and_input api
    $ymm_list = search_auto_complete_with_field_and_input("ymm", $input);

    $terms = json_decode($ymm_list, true)['terms'];

    $count = 0;
    $result = array();
    foreach($terms as $key=>$term) {
        if($key < 10) {
            /** get year, make, model **/
            $ymm = year_make_model($term);
            $response = search_auto_complete_with_selection("ymm", "trim", "", $ymm);
            // $trims = json_decode($response, true)['terms'];

            $ymm['trim'] = $response;
            array_push($result, $ymm);

            // foreach($trims as $trim) {
            //     if($count < 10) {
            //         $ymm['trim'] = $trim;
            //         array_push($result, $ymm);
            //         $count ++;
            //     } 
            //     else break;
            // }
        }
        /* max count: 10 */
        else break;
    }

    // echo $result;
    echo json_encode($result);
endif;
?>