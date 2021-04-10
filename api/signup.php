<?php
include_once 'database.php';
require_once 'php-jwt-master/src/BeforeValidException.php';
require_once 'php-jwt-master/src/ExpiredException.php';
require_once 'php-jwt-master/src/SignatureInvalidException.php';
require_once 'php-jwt-master/src/JWT.php';

use \Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
try {
    $signup_username = '';
    $signup_firstname = '';
    $signup_lastname = '';
    $signup_email = '';
    $signup_userType = '';
    $signup_password = '';
    $signup_passwordConfirm = '';
    // $data = json_decode(file_get_contents("php://input"));
    
    // $login_email = $data->email;
    // $login_password = $data->password;
    $signup_username = filter_var($_POST["username"], FILTER_SANITIZE_STRING);
    $signup_firstname = filter_var($_POST["firstname"], FILTER_SANITIZE_STRING);
    $signup_lastname = filter_var($_POST["lastname"], FILTER_SANITIZE_STRING);
    $signup_email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $signup_userType = filter_var($_POST["userType"], FILTER_SANITIZE_STRING);
    $signup_password = filter_var($_POST["password"], FILTER_SANITIZE_STRING);
    $signup_passwordConfirm = filter_var($_POST["passwordConfirm"], FILTER_SANITIZE_STRING);

    if($signup_password != $signup_passwordConfirm) {
        throw new Exception("Passwords are not mathced", 1);
    }
    if($signup_username != "" && $signup_firstname != "" && $signup_lastname != "" && $signup_email != "" &&
        $signup_userType != "" && $signup_password != "") {
        $stmt = mysqli_prepare($con, "INSERT INTO `Users` (`username`,`firstname`,`lastname`, `email`, `userType`, `password`) VALUES (?,?,?,?,?,?)");
        // $stmt= $con->prepare($query);
        $password_hash = password_hash($signup_password, PASSWORD_BCRYPT);
        mysqli_stmt_bind_param($stmt, 'ssssss', $signup_username,$signup_firstname,$signup_lastname, $signup_email, $signup_userType, $password_hash);

        if(mysqli_stmt_execute($stmt) == false) {
            throw new Exception(mysqli_stmt_error($stmt), 1);
        }
        mysqli_stmt_close($stmt);
        $query = "SELECT id, email, password, username, firstname, lastname FROM Users WHERE email = '" . $signup_email . "' LIMIT 0,1";
        // $stmt = mysqli_query($con, $query);
        $sth = mysqli_query($con, $query);
        $row = mysqli_fetch_assoc($sth);
        if($row == null) {
            throw new Exception("No User created", 1);
        }
        // mysqli_stmt_bind_result($stmt, $login_id, $login_email, $password2, $login_username, $login_firstname, $login_lastname);
        // $row = $stmt->fetch(PDO::FETCH_ASSOC);
        // echo json_decode($row);
        $login_id = $row['id'];
        $login_username = $row['username'];
        $login_firstname = $row['firstname'];
        $login_lastname = $row['lastname'];
        $login_email = $row['email'];
        $password2 = $row['password'];
        if(password_verify($signup_password, $password2))
        {
            $secret_key = "YOUR_SECRET_KEY";
            $issuer_claim = "THE_ISSUER"; // this can be the servername
            $audience_claim = "THE_AUDIENCE";
            $issuedat_claim = time(); // issued at
            $notbefore_claim = $issuedat_claim + 10; //not before in seconds
            $expire_claim = $issuedat_claim + 60; // expire time in seconds
            $token = array(
                "iss" => $issuer_claim,
                "aud" => $audience_claim,
                "iat" => $issuedat_claim,
                "nbf" => $notbefore_claim,
                "exp" => $expire_claim,
                "data" => array(
                    "id" => $login_id,
                    "username" => $login_username,
                    "firstname" => $login_firstname,
                    "lastname" => $login_lastname,
                    "email" => $login_email
            ));

            http_response_code(200);

            $jwt = JWT::encode($token, $secret_key);
            setcookie('jwt', $jwt);
            echo json_encode(
                array(
                    "message" => "Successful login.",
                    "token" => $jwt,
                    "user" => array(
                        "id" => $login_id,
                        "username" => $login_username,
                        "firstname" => $login_firstname,
                        "lastname" => $login_lastname,
                        "email" => $login_email
                    ),
                    "expireAt" => $expire_claim
                ));
        }
        else{
            http_response_code(401);
            echo json_encode(array("message" => "Signup failed.", "password" => $login_password));
        }
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Signup failed."));
    }
    // $query = "SELECT id, email, password, username, firstname, lastname FROM Users WHERE email = '" . $login_email . "' LIMIT 0,1";
    // // $stmt = mysqli_query($con, $query);
    // $sth = mysqli_query($con, $query);
    // $row = mysqli_fetch_assoc($sth);
    // if($row == null) {
    //     throw new Exception("No User found", 1);
    // }
    // echo $num;
    // $login_id = "";
    // // mysqli_stmt_bind_result($stmt, $login_id, $login_email, $password2, $login_username, $login_firstname, $login_lastname);
    // // $row = $stmt->fetch(PDO::FETCH_ASSOC);
    // // echo json_decode($row);
    // echo 4;
    // echo $login_id;
    // $login_id = $row['id'];
    // $login_username = $row['username'];
    // $login_firstname = $row['firstname'];
    // $login_lastname = $row['lastname'];
    // $login_email = $row['email'];
    // $password2 = $row['password'];
    // if(password_verify($login_password, $password2))
    // {
    //     $secret_key = "YOUR_SECRET_KEY";
    //     $issuer_claim = "THE_ISSUER"; // this can be the servername
    //     $audience_claim = "THE_AUDIENCE";
    //     $issuedat_claim = time(); // issued at
    //     $notbefore_claim = $issuedat_claim + 10; //not before in seconds
    //     $expire_claim = $issuedat_claim + 60; // expire time in seconds
    //     $token = array(
    //         "iss" => $issuer_claim,
    //         "aud" => $audience_claim,
    //         "iat" => $issuedat_claim,
    //         "nbf" => $notbefore_claim,
    //         "exp" => $expire_claim,
    //         "data" => array(
    //             "id" => $login_id,
    //             "username" => $login_username,
    //             "firstname" => $login_firstname,
    //             "lastname" => $login_lastname,
    //             "email" => $login_email
    //     ));

    //     http_response_code(200);

    //     $jwt = JWT::encode($token, $secret_key);
    //     setcookie('jwt', $jwt);
    //     echo json_encode(
    //         array(
    //             "message" => "Successful login.",
    //             "user" => array(
    //                 "id" => $login_id,
    //                 "username" => $login_username,
    //                 "firstname" => $login_firstname,
    //                 "lastname" => $login_lastname,
    //                 "email" => $login_email
    //             ),
    //             "expireAt" => $expire_claim
    //         ));
    // }
    // else{

    //     http_response_code(401);
    //     echo json_encode(array("message" => "Login failed.", "password" => $login_password));
    // }
} catch (\Throwable $th) {
    http_response_code(404);
    $response["status"] = "false";
    $response["message"] = $th->getMessage();
    echo json_encode($response);
}
exit;
