$(document).ready(function() {

	$('#success').hide();
	$('#failure').hide();

	$('#getTodos').click(function (event) {

		$('#success').hide();
	    $('#failure').hide();

		$.get('/todos', function (todos) {

			if (todos == "") {

					$("#failure").fadeIn();

				} else {

					$('#success').html("");
					$('#success').fadeIn();
					
					todos.forEach(function (todo) {

						$("#success").append('<ul><li> Description: '+ todo.description + '<br/> Id: ' + todo.id + '<br/> Completed: ' + todo.completed + '</li></ul>');

					});

				}

		});
	});

		$('#getById').click(function (event) {

			$('#success').hide();
		    $('#failure').hide();

		    $id = $('#todoId').val();

			$.get('/todos/custom?id=' + $id, function (todo) {

				if (todo == "") {

						$('#todoId').val("");
						$("#failure").fadeIn();
						
					} else {

						$('#todoId').val("");
						$('#success').fadeIn();
						$('#success').html("");
						$("#success").append('<ul><li> Description: '+ todo.description + '<br/> Id: ' + todo.id + '<br/> Completed: ' + todo.completed + '</li></ul>');

					}

			});

	    });


		$('#addTodo').click(function (event) {

			$('#success').hide();
		    $('#failure').hide();

		    $description = $('#todoDescription').val();

		    $.ajax({
		    	method: 'post',
		    	url: '/todos',
		    	data: JSON.stringify({description: $description, completed: false}),
		    	dataType: 'json',
		    	contentType: 'application/json'
		    }).done(function(data) {
		    	$('#todoDescription').val("");
		    	alert(JSON.stringify(data));
		    });

	    });


});
