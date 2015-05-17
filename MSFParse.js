Parse.initialize("zLRowA3ONTXnWOrV7yPuYszB88rs4B5tq1TxDRed", "1TVc4CN3DNrWZ6PJts3UmyKeanP68wVU2Kt5gNWJ");

function signUpUser() {

  
          var user = new Parse.User();

	        var username = $("#signup-username").val();
	        var email = $("#signup-email").val();
	        var password = $("#signup-password").val();

	        user.set("username", username);
			user.set("password", password);
			user.set("email", email);

	        user.signUp(null, {
		        success: function(user) {
			        alert("You successfully signed up!");
			        var currentUser = Parse.User.current();  
			        	if(currentUser) {
	  					// TODO: Bring them to the hidden "logged in only" page
  					}  
			     },
			    error: function(user, error) {
				    alert("Error: " + error.code + " " + error.message);
				}
		});
}
function signOut(){

	window.location.href = "index.html";

}
function openSetup(){

	window.location.href = "setup.html";
	

}
function openCommands(){

	window.location.href = "commands.html";

} 

function openHome() {

	window.location.href = "main.html";
}
/*
function openMyShoppingList(){

	window.location.href = "shoppinglist.html";

}
function addFood(){

	Parse.Food.userId = Parse.User.objectId;

}
*/
function signInUser() {

		
			var username = $("#login-username").val();
			var password = $("#login-password").val();

			Parse.User.logIn(username, password, {
  				success: function(user) {
  					//alert("You successfully logged in!");
  					var currentUser = Parse.User.current();
  					if(currentUser) {
	  					window.location.href = "main.html";
  					}  
  				},
 				 error: function(user, error) {
 				 	alert("Error: " + error.code + " " + error.message);
			 	}
		});
}
