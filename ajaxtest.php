<?php
ini_set('display_errors', 'On');
$rawJson = file_get_contents('php://input');
$orderDetails = json_decode($rawJson, true);
$errors = array();
if (empty($orderDetails['name'])){
	array_push($errors, "Name is Required.");
}

if(empty($orderDetails['email'])){
	array_push($errors, "Email is Required.");
}
if(empty($orderDetails['order']) || $orderDetails['order']['total'] === '0.00'){
        array_push($errors, "Order is Required.");
}
if(count($errors) > 0){
	http_response_code(400);
	echo json_encode(["errors" => $errors]);
}
else{
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

	$headers .= 'From: no-reply@juiceville.co' . "\r\n";

	$result = mail('lorab@vestadvertising.com', 'ONLINE ORDER | juiceville.co', '<pre>' . $rawJson . '</pre>', $headers);
	echo json_encode(array( "success" => 1, "code" => $result));

}
