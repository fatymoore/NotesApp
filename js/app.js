var saveNote = function() {
	//TODO: get inputs type, description, priority
	var title, message, priority, note, notesList, list;
	title = $('#title').val();
	message = $('#message').val();
	priority = $('#priority').val();

	note = {
		title: title,
		description: message,
		priority: priority
	};

	notesList = JSON.parse(localStorage.getItem('notesList'));
	if (!notesList) {
		notesList = [];
	}
	notesList.push(note);
 	list = JSON.stringify(notesList);
	localStorage.setItem('notesList', list);
};

var clearForm = function() {
	$('#title').val();
	$('#message').val();
};

$(document).ready(function() {

	var updateList = function() {
		var messageList = JSON.parse(localStorage.getItem('notesList'));
		if (messageList != null)
		{
			$('#main-article>ul').html('');
			for (i = 0; i < messageList.length; i++) {
				var messageItem = messageList[i];
				/*
				var template = _.template($('#tmpl_messages_list').html(), messageItem);
				$('#main-article>ul').append(template);
				*/

				$('#main-article>ul').append(""+
					"<li class='arrow'><strong>"+messageItem.title+"</strong>"+
					"<p>"+messageItem.description+"</p>"+
					"<p>"+messageItem.priority+"</p>"+
					"</li>");
			}
		}
	};
	//var notes = JSON.parse(localStorage['notesList']),
	/*var note = null;

	var notes = [{
		title: 'title 1',
		description: 'description1'
	}, {
		title: 'title 2',
		description: 'description 2'
	}];
*/
	/*
	for (var i = 0, l = notes.length; i < l; i++) {
		note = notes[i];
		$('#main-article>ul').append("<li class='arrow'><b>"+note.title+"</b><p>"+note.description+"</p></li>");
	}
	*/

	$('#save').click(function() {
		saveNote();
		clearForm();
		updateList();
	});
/*
	$('.check').click(function() {
		saveNote();
		updateList();
	});
*/
	updateList();
});

