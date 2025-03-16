<?php
$db = new mysqli("localhost", "root", "", "tazza_organic");
if ($db->connect_error) {
    echo "Connection not established";
} else {
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        // Get email and password from the login form
        $email = $_POST['email'];
        $password = md5($_POST['password']);  // Encrypt password with md5 (ensure to use a stronger hash in production)

        // Check if the email exists in the database
        $check_user = "SELECT email, password FROM users WHERE email = '$email'";
        $response = $db->query($check_user);

        if ($response->num_rows == 1) {
            // Fetch user details from the database
            $user = $response->fetch_assoc();
            
            // Verify the entered password with the hashed password in the database
            if ($user['password'] == $password) {
                // Start a session and store user details
                session_start();
                $_SESSION['email'] = $user['email'];
                $_SESSION['customer_name'] = $user['customer_name'];

                // Redirect to a protected page or homepage after successful login
                echo '<script>';
                echo 'window.alert("Login Successfully");'; // Replace home.php with the page you want to redirect to
                echo '</script>';
            } else {
                // Password doesn't match
                echo '<script>';
                echo 'window.alert("Incorrect password. Please try again.");';
                echo '</script>';
            }
        } else {
            // User with the provided email doesn't exist
            echo '<script>';
            echo 'window.alert("User not found. Please register.");';
            echo '</script>';
        }
    } else {
        echo "Unauthorized access.";
    }
}
?>
