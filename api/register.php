<?php
include_once 'database.php';

header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

try {
    $firstName = '';
    $lastName = '';
    $email = '';
    $password = '';

    $data = json_decode(file_get_contents("php://input"));

    $stmt = mysqli_prepare($con, "INSERT INTO `Users` (username, firstname, lastname, email, password) VALUES (?,?,?,?,?)");
    // $stmt= $con->prepare($query);
    mysqli_stmt_bind_param($stmt, 'sssss', $signup_username, $signup_firstname, $signup_lastname, $signup_email, $password_hash);
    $signup_username = $data->username;
    $signup_firstname = $data->firstname;
    $signup_lastname = $data->lastname;
    $signup_email = $data->email;
    $signup_password = $data->password;
    $password_hash = password_hash($signup_password, PASSWORD_BCRYPT);

    if(mysqli_stmt_execute($stmt) == false) {
        throw new Exception(mysqli_stmt_error($stmt), 1);
    }
    mysqli_stmt_close($stmt);
    http_response_code(200);
    echo json_encode(array(
        "status" => "true",
        "message" => "User was successfully registered."
    ));
    // else{
    //     http_response_code(400);

    //     echo json_encode(array("message" => "Unable to register the user."));
    // }
} catch (\Throwable $th) {
    http_response_code(400);
    echo $th->getMessage();
}
