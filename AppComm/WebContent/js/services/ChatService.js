angular. module ('chatService', []).service('chat',chatFnc);
chatFnc.$inject=['$http','$q','$scope','$http'];

function chatFnc($http,$q, $http,$scope) {
	var userMap={};

	var fncContainer={
		localChatFct: localChat,
		userList: userList
	};
	
	function localChat(usr1,usr2,date,content){
		
	 
	    var params = {};
	    params["usr1"]=usr1;
	    params["usr2"]=usr2;
	    params["date"]=date;
	    params["content"]=content;

	    
		var deferred = $q.defer();
	    // *** Messaging with JEE WebService ***

		$http({
	        method: 'GET',
	        url: '/AppComm/Chat',
	     })

		.success(function(data) {
			if(data){
				deferred.resolve({"chat":{"usr1": usr1, "usr2": usr2, "date": date, "content": content}});
			}
			else{
				 var msg = "METHOD GET FAILED !";
		         deferred.reject({"chat":{}, msg: msg});
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