//////////////////
//Login form Class
//////////////////
function LoginForm(formID, usernameID, passwordID, url){
	
	this.myFormID = formID;
	this.unID = usernameID;
	this.passID = passwordID;
	this.controllerUrl = url;
	this.self = this;
	
}
//PROTOTYPE: define the methods of our loginForm class
LoginForm.prototype = {
	constructor: LoginForm,
	
	//TODO
	checkUsername:function(){
		
	},
	
	//TODO
	checkPassword:function(){
		
	},
	
	//This handler creates a post request to the server to authenticate the user
	formSubmitHandler:function(event, success) {
		//prevent default action
		event.preventDefault();
		//Get form data
		var unVal = $("#"+this.unID).val();
		var passVal = $("#"+this.passID).val();
		/*var unName = $("#un").attr("name");
		var passName = $("#pass").attr("name");*/
		var url = this.controllerUrl;
		
		//Ajax login
		$.post( url, { un: unVal, pass: passVal }, function(data){
			success(data);
		});
	},
};

////////////////////////////
//logInCallbackHandler Class
////////////////////////////
function logInCallbackHandler(redirectLocation, successSatusCode, errorDivID){
	//domain location of page to be redirected to
	this.redirectLocation = redirectLocation;
	//status code for returned data to checked against
	this.successStatusCode = successSatusCode;
	this.errorDivID = errorDivID;
}
//PROTOTYPE: define the methods of our logInCallbackHandler class
logInCallbackHandler.prototype = {
	constructor: logInCallbackHandler,
	//check & redirect
	handle:function(returnedData){
		if(this.successStatusCode === returnedData)
			window.location.replace(this.redirectLocation);
		else
			this.displayError();
	},
	//reveal error div
	displayError:function(){
		$("#"+this.errorDivID).show();
	}
};

//Create login form obj
var loginForm = new LoginForm("loginform", "un", "pass", "/ajaxLogin.php");
//logInCallbackHandler obj
var loginHandler = new logInCallbackHandler('/dashboard.php', 1, "errorMSG");

$("#loginform").submit(loginForm.formSubmitHandler(event, loginHandler.handle));
