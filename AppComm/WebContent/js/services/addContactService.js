angular. module ('addContactService', []).service('addContactService',addFnc);
addFnc.$inject=['$http','$q','$http'];
function addFnc($http,$q,$http) {

var fncContainer={
		localAdd: localAdd
	};
	
	function localAdd(login){
		
	 
//	    var params = {};
//	    params["login"]=login;
//	    params["nom"]=nom;
//	    params["prenom"]=prenom;


	    
		var deferred = $q.defer();
	    // *** Messaging with JEE WebService ***
		$http({
			method: 'POST',
	        url: '/AppComm/AddContactServlet',
	        data: {login: login}
			}).then(function successCallback(data) {
			    // this callback will be called asynchronously
			    // when the response is available
				
				alert(data.data.login);
				if(data){
					deferred.resolve({"login": data.data.login, "nom": data.data.nom, "prenom": data.data.prenom});
				}
				else{
					 var msg = "METHOD GET FAILED FOR ADDING CONTACTS!";
			         deferred.reject({"add":{}, msg: msg});
				}
			  }, function errorCallback(data) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
				  
				  console.log("Erreur requête get ! ");
				  
			  });
//		$http({
//	        method: 'GET',
//	        url: '/AppComm/AddContactServlet'
//	     })
//
//		.success(function(data) {
//			alert(data);
//			if(data){
//				deferred.resolve({"login": data.login, "nom": data.nom, "prenom": data.prenom});
//			}
//			else{
//				 var msg = "METHOD GET FAILED FOR ADDING CONTACTS!";
//		         deferred.reject({"add":{}, msg: msg});
//			}
//		})
//        .error(function(data) {
//           console.log("Erreur requête get ! ");
//        });
	return deferred.promise;
	}
	return fncContainer;
}