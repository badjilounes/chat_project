angular. module ('ChatService', []).service('chat',chatFnc);
chatFnc.$inject=['$http','$q'];

function chatFnc($http,$q) {
	var userMap={};

	var fncContainer={
		localChatFct: localChatFct,
		userList: userList
	};
	function localChatFct(login,pwd){
		
	 
	    var params = {};
	    params["login"]=login;
	    params["pwd"]=pwd;
		var deferred = $q.defer();
	    // *** Messaging with JEE WebService ***

		$http({
	        method: 'GET',
	        url: '/AppComm/Chat',
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