<?php
$db = new mysqli("localhost", "root", "", "tazza_organic");
if ($db->connect_error) {
    echo "Connection not established";
} else {
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $password = md5($_POST['password']);
        $check_user = "SELECT email FROM users WHERE email = '$email'";
        $response = $db->query($check_user);
        if ($response->num_rows == 1) {
            // Output JavaScript using echo
            echo '<script>';
            echo 'window.alert("User already exists");';
            echo '</script>';
        } else {
            $store = "INSERT INTO users(customer_name, email, password)
                      VALUES('$name', '$email', '$password')";
            if ($db->query($store)) {
                // echo "Registered successfully";
                echo '<script>';
                echo 'window.alert("Registered successfully");';
                echo '</script>';
            } else {
                // echo "Registration failed";
                echo '<script>';
                echo 'window.alert("Registration failed");';
                echo '</script>';
            }
        }
    } else {
        echo "User unauthorized";
    }
}
?>
