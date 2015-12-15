angular.module('addApp').controller('addContactCtrl', addCrtFct);

addCrtFct.$inject=['$http','$scope','$window','$log','$compile','addContactService'];

function addCrtFct($http, $scope, $window, $log, $compile,addContactService){
	
	$scope.errMsg="";
	
	$scope.user={
			login:"",
			nom:"",
			prenom:""
	};
//	  	
	
	
	
		 $scope.addContact = function(){

		 $log.info("add contact");
		 
	     var add_response = addContactService.localAdd($scope.user.login);
	     add_response.then(
	            function(payload){
	            	if(add_response){
	            		   $log.info("add success: " + JSON.stringify(payload));
	            		   if(payload.login == ""){
	            			   $scope.errMsg="User does not exist";
	            		   }
	            		   else{
	            			   $scope.user.login=payload.login;
		            		   $scope.user.nom=payload.nom;
		            		   $scope.user.prenom=payload.prenom;
		            		   
		            		//add contact
		            		   angular.element(document.getElementById('contact-list')).append('<li class="list-group-item"><div class="col-xs-12 col-sm-3"><img src="img/default_pic.jpg" class="img-responsive img-circle" /></div><div class="col-xs-12 col-sm-9"><span class="name">'+ $scope.user.nom +' '+ $scope.user.prenom+'</span><br/><span class="glyphicon glyphicon-map-marker text-muted c-info" data-toggle="tooltip" title="3903 W Alexander Rd"></span><span class="visible-xs"> <span class="text-muted">3903 W Alexander Rd</span><br/></span><span class="glyphicon glyphicon-earphone text-muted c-info" data-toggle="tooltip" title="(867) 322-1852"></span><span class="visible-xs"> <span class="text-muted">(867) 322-1852</span><br/></span><span class="fa fa-comments text-muted c-info" data-toggle="tooltip" title="debbie.schmidt@example.com"></span><span class="visible-xs"> <span class="text-muted">debbie.schmidt@example.com</span><br/></span></div><div class="clearfix"></div></li>');
		            		   angular.element(document.getElementById('close_add')).click();
	            		   }
	            		   
	            	}
	            	else{
	            		
	            	}

	            },
	            function(err_payload){
	            	$log.info("add failed: " + JSON.stringify(err_payload.msg));
	            	
//	            	$window.location.href = "addContact.html";
	            	
	            }
	     );

//		 $('<li class="list-group-item"><div class="col-xs-12 col-sm-3"><img src="img/default_pic.jpg" class="img-responsive img-circle" /></div><div class="col-xs-12 col-sm-9"><span class="name">'+ $scope.user.nom +' '+ $scope.user.prenom+'</span><br/><span class="glyphicon glyphicon-map-marker text-muted c-info" data-toggle="tooltip" title="3903 W Alexander Rd"></span><span class="visible-xs"> <span class="text-muted">3903 W Alexander Rd</span><br/></span><span class="glyphicon glyphicon-earphone text-muted c-info" data-toggle="tooltip" title="(867) 322-1852"></span><span class="visible-xs"> <span class="text-muted">(867) 322-1852</span><br/></span><span class="fa fa-comments text-muted c-info" data-toggle="tooltip" title="debbie.schmidt@example.com"></span><span class="visible-xs"> <span class="text-muted">debbie.schmidt@example.com</span><br/></span></div><div class="clearfix"></div></li>').appendTo('#contact-list');
	}
	
}