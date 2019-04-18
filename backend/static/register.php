<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Register</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" media="screen" href="main.css">
        <script src="main.js"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    <body>
        <?php
            require('db.php');
            if(isset($_POST['register'])){
                $username = $_POST['username'];
                $email = $_POST['email'];
                $password = $_POST['password'];
                $sql = "SELECT * FROM buyer WHERE username='$username' AND password='$password'";
                $res = mysqli_query($conn,$sql);
                if(mysqli_num_rows($res) > 0){
                    echo "haha";
                }
            }
        ?>

        <div class="jumbotron bg-danger">
            <h1 align="center" style="font-family: Impact, Charcoal, sans-serif" color="red">TRIDE O'PRINT</h1>
            <p align="center" style="color: white">-Registration Page-</p>
            <br>
            <table align="center" width="500px">
                <tr>
                    <td>
                        <form method="post">
                            <div class="form-group row">
                                <label for="inputEmail3" style="color: white" class="col-sm-4 col-form-label">Username</label>
                                <div class="col-sm-8">
                                    <input name="username" type="email" class="form-control" id="inputEmail3" placeholder="Username">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputEmail3" style="color: white" class="col-sm-4 col-form-label">Email</label>
                                <div class="col-sm-8">
                                    <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword3" style="color: white" class="col-sm-4 col-form-label">Password</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword3" style="color: white" class="col-sm-4 col-form-label">Confirm Password</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control" id="inputPassword3" placeholder="Confirm Password">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword3" style="color: white" class="col-sm-4 col-form-label">Birthdate</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control" id="inputPassword3" placeholder="Birthdate">
                                </div>   
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword3" style="color: white" class="col-sm-4 col-form-label">Phone Number</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control" id="inputPassword3" placeholder="Phone number">
                                </div>
                            </div>
                            <fieldset class="form-group">
                                <div class="row">
                                    <legend style="color: white" class="col-form-label col-sm-4 pt-0">Gender</legend>
                                    <div class="col-sm-8">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1">
                                            <label style="color: white" class="form-check-label" for="gridRadios1">
                                            Female
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
                                            <label style="color: white" class="form-check-label" for="gridRadios2">
                                            Male
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <button class="btn btn-light" name="register">Register!</button>
                            </fieldset>
                        </form>
                    <td>
                </tr>
            </table>
        </div>
    </body>
</html>