<?php

include('database.php');
header("Content-Type:application/json; charset:utf-8");
mysqli_set_charset($con, 'utf8');
try {
    $query = "SELECT * from Categories";

    $sth = mysqli_query($con, $query);
    $rows = array();
    while ($r = mysqli_fetch_assoc($sth)) {
        $querySubCategories = "SELECT * FROM Sub_Categories where category_id=". $r["id"];
        $r["subCategories"] = array();
        // echo $querySubCategories;
        $sth1 = mysqli_query($con, $querySubCategories);
        // $rows1 = array();
        while ($r1 = mysqli_fetch_assoc($sth1)) {
            $queryChildCategories = "SELECT * FROM Child_Categories where sub_category_id=". $r1["id"];
            $r1["childCategories"] = array();
            // echo $querySubCategories;
            $sth2 = mysqli_query($con, $queryChildCategories);
            // $rows1 = array();
            while ($r2 = mysqli_fetch_assoc($sth2)) {
                $r1["childCategories"][] = $r2;
                // echo json_encode($r1);
            }
            $r["subCategories"][] = $r1;
            // echo json_encode($r1);
        }
        $rows[] = $r;
    }
    if (count($rows) == 0) {
        throw new Exception("No Category found", 1);
    }
    $response["status"] = "true";
    $response["message"] = "All Categories";
    $response["categories"] = $rows;
    http_response_code(200);
} catch (\Throwable $th) {
    http_response_code(404);
    $response["status"] = "false";
    $response["message"] = $th->getMessage();
}


echo json_encode($response);
exit;
