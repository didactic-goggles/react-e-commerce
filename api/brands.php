<?php

include('database.php');
header("Content-Type:application/json; charset:utf-8");
mysqli_set_charset($con, 'utf8');
try {
    $query = "SELECT * from Brands";

    $sth = mysqli_query($con, $query);
    $rows = array();
    while ($r = mysqli_fetch_assoc($sth)) {
        $rows[] = $r;
    }
    if (count($rows) == 0) {
        throw new Exception("No Brand found", 1);
    }
    $response["status"] = "true";
    $response["message"] = "All Brands";
    $response["brands"] = $rows;
    http_response_code(200);
} catch (\Throwable $th) {
    http_response_code(404);
    $response["status"] = "false";
    $response["message"] = $th->getMessage();
}


echo json_encode($response);
exit;
