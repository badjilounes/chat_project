angular.module('loginApp').controller('loginCtrl',loginCrtFnt);

loginCrtFnt.$inject=['$scope','$log', '$window' , 'auth'];

function loginCrtFnt($scope, $log, $window, auth){

    $scope.errMsg = "";
    if($window.localStorage.getItem("forcingLoging")){
        $scope.errMsg = "You must be logged";
        $window.localStorage.removeItem("forcingLoging");
    }

    $scope.logAuthObject = function(user) {
        $log.info("Trying to login");
        var auth_response = auth.localAuthAsk(user.login, user.pwd);
        auth_response.then(
            function(payload){
            	if(auth_response){
            		   $log.info("login success: " + JSON.stringify(payload));
                       $window.location.href = "home.html";
            	}
            },
            function(err_payload){
                $scope.errMsg = "Wrong login";
                $log.warn("wrong login: " + err_payload.msg);
            }
        );
    };
}