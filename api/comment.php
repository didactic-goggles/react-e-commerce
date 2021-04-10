<?php
 
 include('database.php');

 header("Access-Control-Allow-Origin: * ");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: POST");
 header("Access-Control-Max-Age: 3600");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

try {
    if ($_POST['user_id'] != "" && $_POST['product_id'] !="" && $_POST['comment'] !="" && $_POST['rating'] !="" && $_POST['createdDate']!="" ) {
        $stmt = mysqli_prepare($con, "INSERT INTO `Comments` (`user_id`, `product_id`, `comment`, `createdDate`, `rating`) VALUES (?,?,?,?,?)");
        // $stmt= $con->prepare($query);
        
        $user_id = filter_var($_POST['user_id'], FILTER_SANITIZE_NUMBER_INT);
        $product_id = filter_var($_POST['product_id'], FILTER_SANITIZE_NUMBER_INT);
        $comment = filter_var($_POST['comment'], FILTER_SANITIZE_STRING);
        $createdDate = filter_var($_POST['createdDate'], FILTER_SANITIZE_STRING);
        $rating = filter_var($_POST['rating'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION );
        mysqli_stmt_bind_param($stmt, 'sssss', $user_id, $product_id, $comment, $createdDate, $rating);

        if(mysqli_stmt_execute($stmt) == false) {
            throw new Exception(mysqli_stmt_error($stmt), 1);
        }
        mysqli_stmt_close($stmt);
        $response["status"] = "true";
        $response["message"] = "Comment was created successfully";

    } else {
        // $query = "SELECT p.id, p.name, group_concat(c.name) as categories  FROM Products p 
        // LEFT JOIN Product_Category pc ON p.id = pc.product_id
        // LEFT JOIN Categories c on pc.category_id = c.id
        // GROUP BY p.id";
        
        // $sth = mysqli_query($con, $query);
        // $rows = array();
        // while($r = mysqli_fetch_assoc($sth)) {
        //     $rows[] = $r;
        // }
        // if(count($rows) == 0) {
        //     throw new Exception("No Product found", 1);
        // }
        // $response["status"] = "true";
        // $response["message"] = "All Products";
        // $response["products"] = $rows;
        // print json_encode($rows);
    }
    http_response_code(200);
} catch (\Throwable $th) {
    http_response_code(404);
    $response["status"] = "false";
    $response["message"] = $th->getMessage();
}


echo json_encode($response); exit;
