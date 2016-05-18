var LoginApp = angular.module(['LoginApp'], []);
LoginApp.controller('LoginCtrl', function ($scope) {

    $scope.notification = "Enter email and password to login";
    $scope.notificationSignup = "Enter email and password to sign up";
    $scope.show = true;
    var ref = new Firebase("https://tuan-nguyen-bt.firebaseio.com");

    $scope.changeShow = function () {
        $scope.show = !$scope.show;
    }

    $scope.LoginWithFacebook = function () {

        ref.authWithOAuthPopup("facebook", function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
                $scope.notification = "Login Failed. Please try again.";
                document.getElementById('noti').style.color = "#F44336";

            } else {
                console.log("Authenticated successfully with payload:", authData);
                window.location = "cv.html";
            }
        });
    }

    $scope.userSignin = {};
    $scope.LoginWithEmail = function () {

        if ($scope.userSignin.email == null || $scope.userSignin.password == null) {
            $scope.notification = "Please enter email and password";
        }
        else {
            console.log("Login with Email: " + $scope.userSignin.email + ", Password: " + $scope.userSignin.password);
            ref.authWithPassword({
                email: $scope.userSignin.email,
                password: $scope.userSignin.password
            }, function (error, authData) {

                if (error) {
                    console.log("Login Failed!", error);
                    $scope.$apply(function () {
                        $scope.notification = GetError(error);
                    });
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    window.location = "cv.html";
                }
            });
        }
        document.getElementById('noti').style.color = "#F44336";
    }

    $scope.userSignup = {};
    $scope.SignUpWithEmail = function () {

        if ($scope.userSignup.email == null || $scope.userSignup.password == null) {
            $scope.notificationSignup = "Please enter email and password";
        }
        else {
            console.log("Sign up with Email: " + $scope.userSignup.email + ", Password: " + $scope.userSignup.password);
            ref.createUser({
                email: $scope.userSignup.email,
                password: $scope.userSignup.password
            }, function (error, userData) {

                if (error) {
                    console.log("Error creating user:", error);
                    $scope.$apply(function () {
                        $scope.notificationSignup = "Invalid email or password";
                    });
                } else {
                    console.log("Successfully created user account with uid:", userData.uid);
                    $scope.$apply(function () {
                        $scope.changeShow();
                    });
                }
            });
        }

        document.getElementById('notiSignup').style.color = "#F44336";
    }

    /**
     * @return {string}
     */
    function GetError(error) {

        switch (error.code) {
            case "INVALID_EMAIL":
                return "User account email is invalid";

            case "INVALID_PASSWORD":
                return "User account password is incorrect";

            case "INVALID_USER":
                return "User account does not exist";

            default:
                return "Login failed. Please try again!";
        }
    }
});
