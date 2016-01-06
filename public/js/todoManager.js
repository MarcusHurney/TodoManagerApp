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

						$("#success").append('<ul><li>'+ todo.description + '</li></ul>');

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

						$("#failure").fadeIn();

					} else {

						$('#success').fadeIn();
						$('#success').html("");
						$("#success").append('<ul><li>'+ todo.description + '</li></ul>');

					}

			});

	});
});
