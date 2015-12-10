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
	    $http.post("/AppComm/Auth",
	    {login: params.login, pwd: params.pwd},
	            function(err, res, body){
	                if(err){
	                    console.log(err);
//	                    response.status(401).send("");
	                }
	                else{
	                    //console.log("Body req: " + body + " " + JSON.stringify(body));
	                    if(body.validAuth){
	                    	var page="";
	                        var user = authUser.createUser({login: params.login, pwd: params.pwd, role: body.role});
	                        page="home.html";
	                    }	
	                    else{
	                    	console.log("Erreur 403 - Access Forbidden");
//	                        response.status(403).send("Access Forbidden");
	                    }
	                }
	        })
	    

		.success(function(data) {
            deferred.resolve({"user":data.user, page: data.page, "validAuth": true, msg: ""});
		})
        .error(function(data) {
            var msg = "";
            if(data && data.msg)
                msg = data.msg;
            deferred.reject({"user":{},"ValidAuth": false, msg: msg});
        });
	return deferred.promise;
	}

	function userList(){
		return userMap;
	}
	return fncContainer;
}