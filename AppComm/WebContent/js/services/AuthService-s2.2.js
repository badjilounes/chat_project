angular. module ('authService', []).service('auth',authFnc);
authFnc.$inject=['$http','$q'];
function authFnc($http,$q) {
	var userMap={};

	var fncContainer={
		localAuthAsk:localAuthAsk,
		userList: userList
	};
	function localAuthAsk(login,pwd){
		
	 
	    var params = {};
	    params["login"]=login;
	    params["pwd"]=pwd;
		var deferred = $q.defer();
	    // *** Authentication request to JEE WebService ***
//	    $http.get("/AppComm/Auth",
//	            function(err, data, res){
//	                if(err){
//	                    console.log(err);
////	                    response.status(401).send("");
//	                }
//	                else{
//	                    console.log("Bool resp: " + res + " " + JSON.stringify(res));
//	                    if(res){
//	                    
//	                        var user = {login: params.login, pwd: params.pwd, validAuth: res};
//	                       
//	                    }	
//	                    else{
//	                    	console.log("Erreur 403 - Access Forbidden");
////	                        response.status(403).send("Access Forbidden");
//	                    }
//	                }
//	        })
		$http({
	        method: 'GET',
	        url: '/AppComm/Auth',
	     })

		.success(function(data) {
			if(data){
				deferred.resolve({"user":{"login": login, "pwd": pwd}, "validAuth": true, msg: ""});
			}
			else{
				 var msg = "Authentification failed";
		         deferred.reject({"user":{},"ValidAuth": false, msg: msg});
			}
		})
        .error(function(data) {
           console.log("Erreur requête get ! ");
        });
	return deferred.promise;
	}

	function userList(){
		return userMap;
	}
	return fncContainer;
}