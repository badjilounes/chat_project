function clickme(){
	$.post("/AppComm/Auth", {login: $("#login").val(), pwd: $("#pwd").val()},
			function(data){
				if(data){
					console.log(data.login, data.validAuth);
				}
	});
}

function subscribe(){
	
	$.post("/AppComm/Sign", {login: $("#login").val(), pwd: $("#pwd").val()},
			function(data){
				if(data){
					console.log(data.login, data.validAuth);
				}
	});
	
}