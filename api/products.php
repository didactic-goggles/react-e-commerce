<?php

include('database.php');
header("Content-Type:application/json; charset:utf-8");
mysqli_set_charset($con, 'utf8');
try {
    if (isset($_GET['product_id']) && $_GET['product_id'] != "") {
        $product_id = $_GET['product_id'];
        $query = "SELECT * FROM `Products` WHERE id=$product_id and status='active'";
        $sth = mysqli_query($con, $query);
        $row = mysqli_fetch_assoc($sth);
        if ($row == null) {
            throw new Exception("No Product found", 1);
        }
        $response["status"] = "true";
        $response["message"] = "Product Details";
        $response["product"] = $row;
        $queryProductDetails = "SELECT * from `Product_Details` WHERE product_id=$product_id";
        $dbProductResponse = mysqli_query($con, $queryProductDetails);
        $productDetails = mysqli_fetch_assoc($dbProductResponse);
        if ($productDetails != null) {
            $response["productDetails"] = $productDetails;
        }
        // Product Comments
        $queryProductComments = "SELECT c.id, c.comment, c.rating, c.createdDate, u.username as username, u.id as userId from Comments c
        LEFT JOIN Users u on u.id = c.user_id
        WHERE product_id=$product_id";
        $dbProductCommentsResponse = mysqli_query($con, $queryProductComments);
        $comments = array();
        while ($r = mysqli_fetch_assoc($dbProductCommentsResponse)) {
            $comments[] = $r;
        }
        $response["comments"] = $comments;

        // Product Images
        $queryProductImages = "SELECT pi.id, pi.image_path from Product_Images pi
        LEFT JOIN Products p on p.id = pi.product_id
        WHERE pi.product_id=$product_id";
        $dbProductImagesResponse = mysqli_query($con, $queryProductImages);
        // $commentsSth = mysqli_fetch_assoc($dbProductCommentsResponse);
        $productImages = array();
        while ($r = mysqli_fetch_assoc($dbProductImagesResponse)) {
            $productImages[] = $r;
        }
        $response["productImages"] = $productImages;

        // Product Categories
        $queryProductCategories = "SELECT cc.child_category_name, cc.id as child_category_id, sc.sub_category_name , sc.id as sub_category_id, c.name, c.id FROM `Product_Category` pc 
        LEFT JOIN Child_Categories cc on cc.id = pc.category_id
        LEFT JOIN Sub_Categories sc on sc.id = cc.sub_category_id
        LEFT JOIN Categories c on c.id = sc.category_id
        WHERE pc.product_id=$product_id";
        $dbProductCategoriesResponse = mysqli_query($con, $queryProductCategories);
        // $commentsSth = mysqli_fetch_assoc($dbProductCommentsResponse);
        $productCategories = array();
        while ($r = mysqli_fetch_assoc($dbProductCategoriesResponse)) {
            $productCategories[] = $r;
        }
        $response["categories"] = $productCategories;
        // if($comments != null) {
        //     $response["comments"] = $comments;
        // }
    } else {
        $query = "SELECT p.id, p.name, cc.child_category_name as childCategory, 
        cc.id as childCategoryId, sc.sub_category_name as subCategory, sc.id as subCategoryId, 
        c.name as category, c.id as categoryId, pi.image_path as productPrimaryImage,
        pd.brand_id as brandId, AVG(com.rating) as rating FROM Products p 
        LEFT JOIN Product_Category pc ON p.id = pc.product_id
        LEFT JOIN Child_Categories cc on pc.category_id = cc.id
        LEFT JOIN Sub_Categories sc on sc.id = cc.sub_category_id
        LEFT JOIN Categories c on c.id = sc.category_id
        LEFT JOIN Product_Details pd on pd.product_id = p.id
        LEFT JOIN Product_Images pi on pi.id = pd.product_base_image_id
        LEFT JOIN Comments com on com.product_id = p.id
        GROUP BY p.id";

        $sth = mysqli_query($con, $query);
        $rows = array();
        while ($r = mysqli_fetch_assoc($sth)) {
            $rows[] = $r;
        }
        if (count($rows) == 0) {
            throw new Exception("No Product found", 1);
        }
        $response["status"] = "true";
        $response["message"] = "All Products";
        $response["products"] = $rows;
        // print json_encode($rows);
    }
    http_response_code(200);
} catch (\Throwable $th) {
    http_response_code(404);
    $response["status"] = "false";
    $response["message"] = $th->getMessage();
}


echo json_encode($response);
exit;
