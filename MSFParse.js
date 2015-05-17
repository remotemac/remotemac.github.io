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

function openNewCommand() {

	window.location.href = "newcommand.html";

}

function downloadRbFile() {

	var finishedScript = "";
	finishedScript += "module Commands\n";
	finishedScript += "  class " + document.getElementById("inputName").value + "\n";
	finishedScript += "    def initialize(args, settings)\n";
	finishedScript += "    end\n";
	finishedScript += "    def go\n";
	finishedScript += "    " + document.getElementById("inputScript").value + "\n";
	finishedScript += "    end\n";
	finishedScript += "    def respond\n";
	finishedScript += "    " + document.getElementById("inputResponse").value + "\n";
	finishedScript += "    end\n";
	finishedScript += "    def media?\n";
	finishedScript += "    " + document.getElementById("hasMedia").value + "\n";
	finishedScript += "    end\n";
	finishedScript += "    def self.matches\n";
	finishedScript += "    " + document.getElementById("inputMatches").value + "\n";
	finishedScript += "    end\n";
	finishedScript += "  end\n";
	finishedScript += "end\n";

	var pom = document.createElement("a");
	pom.setAttribute("href","data:text/plain;charset=utf-8," + encodeURIComponent(finishedScript));
	pom.setAttribute("download", document.getElementById("inputName").value + ".rb");
	
	pom.style.display = "none";

	document.body.appendChild(pom);
	pom.click();
	document.body.removeChild(pom);

	console.log(finishedScript);

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
  						document.cookie = "number=" + username + ";";
	  					window.location.href = "main.html";
  					}  
  				},
 				 error: function(user, error) {
 				 	alert("Error: " + error.code + " " + error.message);
			 	}
		});
}
