// $(document).ready(function() {

// 	$.ajaxSetup({

// 		beforeSend: function(xhr) {
// 			xhr.setRequestHeader("Auth", localStorage.getItem('token'));
// 		}

// 	}); // Sets all headers to contain the user token.

// 	function hideAlerts() {

// 		$('#success').hide();
// 		$('#failure').hide();

// 	}; //DRY - Hides alert divs.

// 	hideAlerts();

// 	$('#getTodos').click(function (event) {

// 		hideAlerts();

// 		$.get('/todos', function (todos) {

// 			if (todos == "") {

// 					$("#failure").fadeIn();

// 				} else {

// 					$('#success').html("");
// 					$('#success').fadeIn();
					
// 					todos.forEach(function (todo) {

// 						$("#success").append('<ul><li> Description: '+ todo.description + '<br/> Id: ' + todo.id + '<br/> Completed: ' + todo.completed + '</li></ul>');

// 					});

// 				}

// 		});
// 	});

// 		//GET by ID

// 		$('#getById').click(function (event) {

// 			hideAlerts();

// 		    $id = $('#todoId').val();

// 			$.get('/todos/' + $id, function () {

// 			}).done(function (todo) {
// 				$('#todoId').val("");
// 				$('#success').fadeIn();
// 				$('#success').html("");
// 				$("#success").append('<ul><li> Description: '+ todo.description + '<br/> Id: ' + todo.id + '<br/> Completed: ' + todo.completed + '</li></ul>');
// 			}).fail(function (data) {
// 				$('#todoId').val("");
// 				$("#failure").fadeIn();
// 			});

// 	    });

// 	    //GET Completed Todos

// 	    $('#getCompleted').click(function (event) {

// 	    	hideAlerts();

// 	    	$.get('/todos?completed=true', function () {

// 	    	}).done(function (todos) {

// 	    		$('#success').fadeIn();
// 				$('#success').html("");

// 	    		todos.forEach(function (todo) {

// 	    			$("#success").append('<ul><li> Description: '+ todo.description + '<br/> Id: ' + todo.id + '<br/> Completed: ' + todo.completed + '</li></ul>');

// 	    		});

// 	    	}).fail(function (data) {

// 	    		$("#failure").fadeIn();

// 	    	});

// 	    });

// 	    //GET Incomplete Todos

// 	    $('#getIncomplete').click(function (event) {

// 	    	hideAlerts();

// 	    	$.get('/todos?completed=false', function () {

// 	    	}).done(function (todos) {


// 	    		$('#success').fadeIn();
// 				$('#success').html("");

// 				todos.forEach(function (todo) {

// 					$("#success").append('<ul><li> Description: '+ todo.description + '<br/> Id: ' + todo.id + '<br/> Completed: ' + todo.completed + '</li></ul>');

// 				});

// 	    	}).fail(function (data) {

// 	    		$("#failure").fadeIn();

// 	    	});


// 	    });

// 	    //GET Todos by Description

// 	    $('#searchByDescription').click(function (event) {

// 	    	hideAlerts();

// 	    	$.get('/todos?q=' + $('#enterDescription').val(), function () {

// 	    	}).done(function (todos) {

// 	    		$('#enterDescription').val("");
// 	    		$('#success').fadeIn();
// 				$('#success').html("");

// 				todos.forEach(function (todo) {

// 					$("#success").append('<ul><li> Description: '+ todo.description + '<br/> Id: ' + todo.id + '<br/> Completed: ' + todo.completed + '</li></ul>');

// 				});

// 	    	}).fail(function (data) {

// 	    		$('#enterDescription').val("");
// 	    		$("#failure").fadeIn();

// 	    	});

// 	    });

// 	    //Add a new todo item

// 		$('#addTodo').click(function (event) {

// 			hideAlerts();

// 		    $description = $('#todoDescription').val();

// 		    $.ajax({
// 		    	method: 'post',
// 		    	headers: {'Auth': localStorage.getItem('token')}, //Here
// 		    	url: '/todos',
// 		    	data: JSON.stringify({description: $description, completed: false}),
// 		    	dataType: 'json',
// 		    	contentType: 'application/json'
// 		    }).done(function(data) {
// 		    	$('#todoDescription').val("");
// 		    	alert(data);
// 		    });

// 	    });

// 	    //DELTE Todo Item

// 	    $('#deleteTodo').click(function (event) {

// 	    	hideAlerts();

// 		    $itemToDelete = $('#deleteById').val();

// 		    $.ajax({
// 		    	method: 'delete',
// 		    	url: '/todos/delete/' + $itemToDelete,
// 		    	headers: {'Auth': localStorage.getItem('token')}, //Here
// 		    }).done(function(deletedTodo) {
// 		    	$('#deleteById').val("");
// 		    	$('#success').html("");
// 		    	$('#success').fadeIn();
// 		    	$('#success').html("Todo item deleted!")
// 		    }).fail(function(data) {
// 		    	$('#deleteById').val("");
// 		    	$('#failure').html("");
// 		    	$('#failure').fadeIn();
// 		    	$('#failure').html("No todo with that ID");
// 		    });

// 	    });

// 	    //Updates a todo item

// 	    $('#updateTodo').click(function (event) {

// 	    	hideAlerts();

// 		    var completedStatus;
// 		    var descriptionContent;

// 		    var editedTodo = {};

// 		    if ($('#updateStatus').val().toLowerCase() === 'true') {

// 		    	completedStatus = true;
// 		    	editedTodo.completed = completedStatus;

// 		    } else if ($('#updateStatus').val().toLowerCase() === 'false') {

// 		    	completedStatus = false;
// 		    	editedTodo.completed = completedStatus;

// 		    } 

// 		    if ($('#updateDescription').val().trim().length > 0) {

// 		    	descriptionContent = $('#updateDescription').val().trim();
// 		    	editedTodo.description = descriptionContent;

// 		    }

      

// 		    $.ajax({
// 		    	method: 'put',
// 		    	url: '/todos/update/' + $('#updateTodoById').val(),
// 		    	headers: {'Auth': localStorage.getItem('token')}, //Here
// 		    	data: JSON.stringify(editedTodo),
// 		    	dataType: 'json',
// 		    	contentType: 'application/json'
// 		    }).done(function(data) {

// 		    	$('#updateTodoById').val("");
// 		    	$('#updateDescription').val("");
// 		    	$('#updateStatus').val("");

// 		    	alert(data);

// 		    }).fail(function(data) {

// 		    	$('#updateTodoById').val("");
// 		    	$('#updateDescription').val("");
// 		    	$('#updateStatus').val("");

// 		    	$('#failure').fadeIn();
// 		    });

// 	    });

// 		//Creates a new user

// 		$('#createNewUser').click(function (event) {

// 			hideAlerts();

// 			var $email = $('#newUserEmail').val();
// 			var $password = $('#newUserPassword').val();

// 			$.ajax({
// 		    	method: 'post',
// 		    	url: '/users',
// 		    	data: JSON.stringify({email: $email, password: $password}),
// 		    	dataType: 'json',
// 		    	contentType: 'application/json'
// 			}).done(function (user) {
// 				$('#newUserEmail').val("");
// 				$('#newUserPassword').val("");
// 				alert(JSON.stringify(user));
// 			}).fail(function (data) {
// 				$('#newUserEmail').val("");
// 				$('#newUserPassword').val("");
// 				alert(JSON.stringify(data));
// 			});

// 		});

// 		//Login User

// 		$('#loginUser').click(function (event) {

// 			hideAlerts();

// 			var $loginEmail = $('#loginEmail').val();
// 			var $loginPassword = $('#loginPassword').val();

// 			$.ajax({
// 				method: 'post',
// 				url: '/users/login',
// 				data: JSON.stringify({email: $loginEmail, password: $loginPassword}),
// 				dataType: 'json',
// 				contentType: 'application/json'
// 			}).done(function (user, status, xhr) {
// 				$('#loginEmail').val("");
// 				$('#loginPassword').val("");
// 				var token = xhr.getResponseHeader('Auth'); // Setting the value of token to the value of the header key 'Auth'
// 				localStorage.setItem('token', token); // In local storage 'token' is set to the value of header's token ^, now it can be passed along with the other methods from the front-end.
// 				alert(JSON.stringify(user));
// 			}).fail(function (data) {
// 				$('#loginEmail').val("");
// 				$('#loginPassword').val("");
// 				alert(JSON.stringify(data));
// 			});
// 		});

// 		//Logout User

// 		$('#logoutUser').click(function (event) { //Don't need to send data with this, just the auth header

// 			hideAlerts();

// 			$.ajax({
// 				method: 'delete',
// 				url: '/users/login',
// 				headers: {'Auth': localStorage.getItem('token')},
// 				dataType: 'json',
// 				contentType: 'application/json'
// 			}).done(function (user, status, xhr) {
// 				$('#loginEmail').val("");
// 				$('#loginPassword').val("");
// 				alert("Logged out user", JSON.stringify(user));
// 			}).fail(function (data) {
// 				$('#loginEmail').val("");
// 				$('#loginPassword').val("");
// 				alert(JSON.stringify(data));
// 			});
// 		});


// });
