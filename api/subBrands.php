<?php

include('database.php');
header("Content-Type:application/json; charset:utf-8");
mysqli_set_charset($con, 'utf8');
try {
    if (!empty($_GET['id'])) {
        $query = "SELECT * from Sub_Brands where id=" . $_GET['id'];
    
        $sth = mysqli_query($con, $query);
        $rows = array();
        while ($r = mysqli_fetch_assoc($sth)) {
            $rows[] = $r;
        }
        if (count($rows) == 0) {
            throw new Exception("No Sub Brand found", 1);
        }
        $response["status"] = "true";
        $response["message"] = "Sub Brand";
        $response["brand"] = $rows[0];
        http_response_code(200);
    } else if (!empty($_POST['name'])) {
        $stmt = mysqli_prepare($con, "INSERT INTO `Sub_Brands` (`sub_brand_name`, `brand_id`) VALUES (?,?)");
        $subBrandName = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
        $brandId = filter_var($_POST['brand_id'], FILTER_SANITIZE_NUMBER_INT);
        mysqli_stmt_bind_param($stmt, 'ss', $subBrandName, $brandId);

        if(mysqli_stmt_execute($stmt) == false) {
            throw new Exception(mysqli_stmt_error($stmt), 1);
        }
        mysqli_stmt_close($stmt);
        $response["status"] = "true";
        $response["message"] = "Sub Brand was created successfully";
    } else {
        $query = "SELECT * from Sub_Brands";
    
        $sth = mysqli_query($con, $query);
        $rows = array();
        while ($r = mysqli_fetch_assoc($sth)) {
            $rows[] = $r;
        }
        if (count($rows) == 0) {
            throw new Exception("No Sub Brand found", 1);
        }
        $response["status"] = "true";
        $response["message"] = "All Sub Brands";
        $response["subBrands"] = $rows;
        http_response_code(200);
    }
} catch (\Throwable $th) {
    http_response_code(404);
    $response["status"] = "false";
    $response["message"] = $th->getMessage();
}


echo json_encode($response);
exit;
