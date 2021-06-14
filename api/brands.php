<?php

include('database.php');
header("Content-Type:application/json; charset:utf-8");
mysqli_set_charset($con, 'utf8');
try {
    if (!empty($_GET['id'])) {
        $query = "SELECT * from Brands where id=" . $_GET['id'];
    
        $sth = mysqli_query($con, $query);
        $rows = array();
        while ($r = mysqli_fetch_assoc($sth)) {
            $rows[] = $r;
            $querySubBrands = "SELECT * FROM Sub_Brands where brand_id=". $_GET['id'];
            $rows[0]["subBrands"] = array();
            // echo $querySubCategories;
            $sth1 = mysqli_query($con, $querySubBrands);
            while ($r1 = mysqli_fetch_assoc($sth1)) {
                $rows[0]["subBrands"][] = $r1;
            }
        }
        if (count($rows) == 0) {
            throw new Exception("No Brand found", 1);
        }
        $response["status"] = "true";
        $response["message"] = "Brand";
        $response["brand"] = $rows[0];
        http_response_code(200);
    } else if (!empty($_POST['name'])) {
        $stmt = mysqli_prepare($con, "INSERT INTO `Brands` (`name`) VALUES (?)");
        $brandName = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
        mysqli_stmt_bind_param($stmt, 's', $brandName);

        if(mysqli_stmt_execute($stmt) == false) {
            throw new Exception(mysqli_stmt_error($stmt), 1);
        }
        mysqli_stmt_close($stmt);
        $response["status"] = "true";
        $response["message"] = "Brand was created successfully";
    } else {
        $query = "SELECT * from Brands";
    
        $sth = mysqli_query($con, $query);
        $rows = array();
        while ($r = mysqli_fetch_assoc($sth)) {
            $querySubBrands = "SELECT * FROM Sub_Brands where brand_id=". $r['id'];
            $r["subBrands"] = array();
            // echo $querySubCategories;
            $sth1 = mysqli_query($con, $querySubBrands);
            while ($r1 = mysqli_fetch_assoc($sth1)) {
                $r["subBrands"][] = $r1;
            }
            $rows[] = $r;
        }
        if (count($rows) == 0) {
            throw new Exception("No Brand found", 1);
        }
        $response["status"] = "true";
        $response["message"] = "All Brands";
        $response["brands"] = $rows;
        http_response_code(200);
    }
} catch (\Throwable $th) {
    http_response_code(404);
    $response["status"] = "false";
    $response["message"] = $th->getMessage();
}


echo json_encode($response);
exit;
