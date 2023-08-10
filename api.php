<?php

$conn = new mysqli(  "localhost", "root",  "",  "product_dataviewer" );

if ($conn->connect_error) {
    die("Database connect error!");
}

$response = [ "error" => false];

$action = "read";

if (isset($_GET["action"])) {
    $action = $_GET["action"];
}



if ($action == "read") {
    $result = $conn->query("SELECT * FROM `products`");

    $products = array();

    while ($row = $result->fetch_assoc()) {
        array_push($products, $row);
    }

    $response["products"]= $products;

}elseif ($action == "create") {
    $product_name = $_POST['product_name'];
    $product_brand = $_POST['product_brand'];
    $product_price = $_POST['product_price'];

    $result = $conn->query("INSERT INTO `products`(`product_name`, `product_brand`, `product_price`) VALUES ('$product_name','$product_brand','$product_price')");

    if ($result) {
        $response["message"] = "Product added Successfully.";
    }else { 
        $response["error"] = true;
        $response["message"] = "Product didn't add.";
    }

}elseif ($action == "update") {
    $id = $_POST['id'];
    $product_name = $_POST['product_name'];
    $product_brand = $_POST['product_brand'];
    $product_price = $_POST['product_price'];

    $result = $conn->query("UPDATE `products` SET `product_name`='$product_name',`product_brand`='$product_brand',`product_price`='$product_price' WHERE `id`='$id'");

    if ($result) {
        $response["message"] = "Product updated Successfully.";
    }else { 
        $response["error"] = true;
        $response["message"] = "Product didn't update.";
    }
}elseif ($action == "delete") {
    $id = $_POST['id'];

    $result = $conn->query("DELETE FROM `products` WHERE `id`='$id'");

    if ($result) {
        $response["message"] = "Product deleted Successfully.";
    }else { 
        $response["error"] = true;
        $response["message"] = "Product didn't delete.";
    }
}

header("content-type: application/json");
echo json_encode($response);
