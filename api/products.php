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
        $queryProductCategories = "SELECT pc.category_id as pcCategoryId, pc.type as pcType FROM Product_Category pc
        WHERE pc.product_id=$product_id";
        $dbProductCategoriesResponse = mysqli_query($con, $queryProductCategories);
        // $commentsSth = mysqli_fetch_assoc($dbProductCommentsResponse);
        $productCategories = array();
        while ($r = mysqli_fetch_assoc($dbProductCategoriesResponse)) {
            if($r['pcType'] == 'category') {
                $categoryQuery = "SELECT name, id from Categories where id=".$r['pcCategoryId'];
                $sthCategory = mysqli_query($con, $categoryQuery);
                // $rows1 = array();
                while ($rCategory = mysqli_fetch_assoc($sthCategory)) {
                    $productCategories["category"] = $rCategory['name'];
                    $productCategories["categoryId"] = $rCategory['id'];
                }
            } else if($r['pcType'] == 'subCategory') {
                $subCategoryQuery = "SELECT sc.sub_category_name as subCategory,sc.id as subCategoryId, 
                    c.name as category, c.id as categoryId FROM `Sub_Categories` sc 
                    LEFT JOIN Categories c on c.id =  sc.category_id
                    WHERE sc.id=".$r['pcCategoryId'];
                $sthSubCategory = mysqli_query($con, $subCategoryQuery);
                // $rows1 = array();
                while ($rSubCategory = mysqli_fetch_assoc($sthSubCategory)) {
                    $productCategories["subCategory"] = $rSubCategory['subCategory'];
                    $productCategories["subCategoryId"] = $rSubCategory['subCategoryId'];
                    $productCategories["category"] = $rSubCategory['category'];
                    $productCategories["categoryId"] = $rSubCategory['categoryId'];
                }
            } else if($r['pcType'] == 'childCategory') {
                $childCategoryQuery = "SELECT cc.child_category_name as childCategory, cc.id as childCategoryId, sc.sub_category_name as subCategory,sc.id as subCategoryId, c.name as category, c.id as categoryId FROM `Child_Categories` cc
                LEFT JOIN Sub_Categories sc on sc.id =  cc.sub_category_id
                LEFT JOIN Categories c on c.id =  sc.category_id
                WHERE cc.id=".$r['pcCategoryId'];
                $sthChildCategory = mysqli_query($con, $childCategoryQuery);
                // $rows1 = array();
                while ($rChildCategory = mysqli_fetch_assoc($sthChildCategory)) {
                    $productCategories["childCategory"] = $rChildCategory['childCategory'];
                    $productCategories["childCategoryId"] = $rChildCategory['childCategoryId'];
                    $productCategories["subCategory"] = $rChildCategory['subCategory'];
                    $productCategories["subCategoryId"] = $rChildCategory['subCategoryId'];
                    $productCategories["category"] = $rChildCategory['category'];
                    $productCategories["categoryId"] = $rChildCategory['categoryId'];
                }
            }
            $rows[] = $r;
        }
        $response["categories"] = $productCategories;
        // if($comments != null) {
        //     $response["comments"] = $comments;
        // }
    } else {
        $query = "SELECT p.id, p.name, pc.category_id as pcCategoryId, pc.type as pcType, pi.image_path as productPrimaryImage,
        pb.brand_id as pbBrandId, pb.type as pbType, AVG(com.rating) as rating FROM Products p 
        LEFT JOIN Product_Brand pb ON p.id = pb.product_id
        LEFT JOIN Product_Category pc ON p.id = pc.product_id
        LEFT JOIN Product_Details pd on pd.product_id = p.id
        LEFT JOIN Product_Images pi on pi.id = pd.product_base_image_id
        LEFT JOIN Comments com on com.product_id = p.id
        GROUP BY p.id";

        $sth = mysqli_query($con, $query);
        $rows = array();
        while ($r = mysqli_fetch_assoc($sth)) {
            if($r['pcType'] == 'category') {
                $categoryQuery = "SELECT name, id from Categories where id=".$r['pcCategoryId'];
                $sthCategory = mysqli_query($con, $categoryQuery);
                // $rows1 = array();
                while ($rCategory = mysqli_fetch_assoc($sthCategory)) {
                    $r["category"] = $rCategory['name'];
                    $r["categoryId"] = $rCategory['id'];
                }
            } else if($r['pcType'] == 'subCategory') {
                $subCategoryQuery = "SELECT sc.sub_category_name as subCategory,sc.id as subCategoryId, 
                    c.name as category, c.id as categoryId FROM `Sub_Categories` sc 
                    LEFT JOIN Categories c on c.id =  sc.category_id
                    WHERE sc.id=".$r['pcCategoryId'];
                $sthSubCategory = mysqli_query($con, $subCategoryQuery);
                // $rows1 = array();
                while ($rSubCategory = mysqli_fetch_assoc($sthSubCategory)) {
                    $r["subCategory"] = $rSubCategory['subCategory'];
                    $r["subCategoryId"] = $rSubCategory['subCategoryId'];
                    $r["category"] = $rSubCategory['category'];
                    $r["categoryId"] = $rSubCategory['categoryId'];
                }
            } else if($r['pcType'] == 'childCategory') {
                $childCategoryQuery = "SELECT cc.child_category_name as childCategory, cc.id as childCategoryId, sc.sub_category_name as subCategory,sc.id as subCategoryId, c.name as category, c.id as categoryId FROM `Child_Categories` cc
                LEFT JOIN Sub_Categories sc on sc.id =  cc.sub_category_id
                LEFT JOIN Categories c on c.id =  sc.category_id
                WHERE cc.id=".$r['pcCategoryId'];
                $sthChildCategory = mysqli_query($con, $childCategoryQuery);
                // $rows1 = array();
                while ($rChildCategory = mysqli_fetch_assoc($sthChildCategory)) {
                    $r["childCategory"] = $rChildCategory['childCategory'];
                    $r["childCategoryId"] = $rChildCategory['childCategoryId'];
                    $r["subCategory"] = $rChildCategory['subCategory'];
                    $r["subCategoryId"] = $rChildCategory['subCategoryId'];
                    $r["category"] = $rChildCategory['category'];
                    $r["categoryId"] = $rChildCategory['categoryId'];
                }
            }
            if($r['pbType'] == 'brand') {
                $brandQuery = "SELECT name, id from Brands where id=".$r['pbBrandId'];
                $sthBrand = mysqli_query($con, $brandQuery);
                // $rows1 = array();
                while ($rBrand= mysqli_fetch_assoc($sthBrand)) {
                    $r["brand"] = $rBrand['name'];
                    $r["brandId"] = $rBrand['id'];
                }
            } else if($r['pbType'] == 'subBrand') {
                $subBrandQuery = "SELECT sb.sub_brand_name as subBrand,sb.id as subBrandId, 
                    b.name as brand, b.id as brandId FROM `Sub_Brands` sb 
                    LEFT JOIN Brands b on b.id =  sb.brand_id
                    WHERE sb.id=".$r['pbBrandId'];
                $sthSubBrand = mysqli_query($con, $subBrandQuery);
                // $rows1 = array();
                while ($rSubBrand = mysqli_fetch_assoc($sthSubBrand)) {
                    $r["subBrand"] = $rSubBrand['subBrand'];
                    $r["subBrandId"] = $rSubBrand['subBrandId'];
                    $r["brand"] = $rSubBrand['brand'];
                    $r["brandId"] = $rSubBrand['brandId'];
                }
            }
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
