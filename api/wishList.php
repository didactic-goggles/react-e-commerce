<?php
 
include('database.php');

header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PATCH");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


try {
    if ($_POST['product_id'] != "" && $_POST['createdDate'] !="" && $_POST['user_id'] !="") {
        $stmt = mysqli_prepare($con, "INSERT INTO `WishList` (`user_id`, `product_id`, `createdDate`) VALUES (?,?,?)");
        // $stmt= $con->prepare($query);
        
        $user_id = filter_var($_POST['user_id'], FILTER_SANITIZE_NUMBER_INT);
        $product_id = filter_var($_POST['product_id'], FILTER_SANITIZE_NUMBER_INT);
        $createdDate = filter_var($_POST['createdDate'], FILTER_SANITIZE_STRING);
        mysqli_stmt_bind_param($stmt, 'sss', $user_id, $product_id, $createdDate);

        if(mysqli_stmt_execute($stmt) == false) {
            throw new Exception(mysqli_stmt_error($stmt), 1);
        }

        mysqli_stmt_close($stmt);
        $response["status"] = "true";
        $response["message"] = "Product was added to wishlist successfully";

    } else if($_POST['product_id'] != "" && $_POST['type'] !="" && $_POST['user_id'] !=""){
        $stmt = mysqli_prepare($con, "DELETE from `WishList` where user_id = ". $_POST['user_id']. " AND product_id = ".$_POST['product_id'] );

        if(mysqli_stmt_execute($stmt) == false) {
            throw new Exception(mysqli_stmt_error($stmt), 1);
        }
        mysqli_stmt_close($stmt);
        $response["status"] = "true";
        $response["message"] = "Product was deleted from wishlist successfully";
    } else if($_POST['user_id'] != ""){
        $queryWishList = "SELECT id, product_id, user_id, createdDate from WishList where user_id=".$_POST['user_id'];
        $sthWishList = mysqli_query($con, $queryWishList);
        $rowsWishList = array();
        while ($rWishList = mysqli_fetch_assoc($sthWishList)) {
            $rowsWishList[] = $rWishList;
        }
        mysqli_stmt_close($stmt);
        $response["status"] = "true";
        $response["message"] = "Wishlist";
        $response["wishList"] = $rowsWishList;
    } else {
        throw new Exception('Invalid payload', 1);
    }
    http_response_code(200);
} catch (\Throwable $th) {
    http_response_code(404);
    $response["status"] = "false";
    $response["message"] = $th->getMessage();
}


echo json_encode($response); exit;
