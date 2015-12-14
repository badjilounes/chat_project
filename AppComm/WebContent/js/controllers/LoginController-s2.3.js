angular.module('loginApp').controller('loginCtrl',loginCrtFnt);

loginCrtFnt.$inject=['$scope','$log', '$window' , 'auth'];

function loginCrtFnt($scope, $log, $window, auth){

    $scope.errMsg = "";

//    if($window.localStorage.getItem("forcingLoging")){
//        $window.localStorage.removeItem("forcingLoging");
//        $scope.errMsg = "You must be logged";
//    }

    $scope.logAuthObject = function(user) {
        $log.info("Trying to login");
        var auth_response = auth.localAuthAsk(user.login, user.pwd);
        auth_response.then(
            function(payload){
            	if(auth_response){
            		   $log.info("login success: " + JSON.stringify(payload));
            		   $window.location.href = "addContact.html";
//            		   
//            		   if(payload.user.login !== undefined){
//                           $window.localStorage.setItem("idtoken", payload.user.login);
//                       }
            	}

            },
            function(err_payload){
                $scope.errMsg = "Wrong login";
                $log.warn("wrong login: " + err_payload.msg);
            }
        );
    };
}