angular.module('ChatApp').controller('ChatController', ChatCrtFct);

ChatCrtFct.$inject=['$http','$q','$scope','$window','$log','ChatService'];

function ChatCrtFct($http, $q, $scope, $window, $log, ChatService){
	
	$scope.chatUser={
			login: "",
			nom: "",
			prenom: ""
	};
	
	
	$scope.setChatUser=function(user){
		$scope.chatUser.login = user.login;
		$scope.chatUser.nom = user.nom;
		$scope.chatUser.prenom = user.prenom;
	}
	
	$scope.sendMess = function(){
		var text = $('#btn-input').text();
		
		
	}
	
	
}