
<?php
$name = $_POST['name'];
$pass = $_POST['passw'];

if ($name == "Admin" && $pass == "1234") {
    echo "<script>window.location.assign('afteradminlogin.php');</script>";
} else {
    readfile('adminlogin2.html');
}
?>