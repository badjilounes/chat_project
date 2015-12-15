angular.module('ChatApp').controller('ChatController', ChatCrtFct);

ChatCrtFct.$inject=['$http','$scope','$window','$log','ChatService'];

function ChatCrtFct($http, $scope, $window, $log, ChatService){
	
	$scope.chatUser={
			usr1: "",
			usr2: "",
			date: "",
			content:""
	};
	
	
	$scope.setChatUser=function(chat){
		$scope.chatUser.usr1 = chat.usr1;
		$scope.chatUser.usr2 = chat.usr2;
		$scope.chatUser.date = chat.date;
		$scope.chatUser.content = chat.content;
	}
	
	$scope.sendMess = function(){
		 $log.info("Trying to chat");
	        var chat_response = auth.localChat(chat.usr1, chat.usr2, chat.date, chat.content);
	        chat_response.then(
	            function(payload){
	            	if(chat_response){
	            		   $log.info("chat success: " + JSON.stringify(payload));
	            		   
	            			
	            			var d = new Date();
	            	    	var text = document.getElementById("btn-input").value;
	            	    	$('<div class="row msg_container base_sent" id="msg_send"><div class="col-md-10 col-xs-10 "><div class="messages msg_sent"><p>'+chat.content+'</p><time datetime="'+ chat.date+'">'+chat.usr1+'</time></div></div><div class="col-md-2 col-xs-2 avatar"><img src="img/default_pic.jpg" class=" img-responsive "></div></div></br>').appendTo('#msg_container');
	            	}

	            },
	            function(err_payload){
	            	$log.info("chat failed: " + JSON.stringify(err_payload.msg));
	            }
	        );
		
		
		
    	
	}
	
	
}