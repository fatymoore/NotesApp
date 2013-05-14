
$(document).ready(function() {
	//var notes = JSON.parse(localStorage['notesList']),
	var note = null;

	var notes = [{
		title: 'title 1',
		description: 'description1'
	}, {
		title: 'title 2',
		description: 'description 2'
	}];

	/*
	for (var i = 0, l = notes.length; i < l; i++) {
		note = notes[i];
		$('#main-article>ul').append("<li class='arrow'><b>"+note.title+"</b><p>"+note.description+"</p></li>");
	}
	*/

	var messageList = JSON.parse(localStorage.get('notesList'));

	for (i = 0; i < messageList.length; i++) {
		var messageItem = messageList[i];
		var template = _.template($('#tmpl_messages_list').html(), messageItem);
		$('#main-article').append(template);
	}
});

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

	notesList = JSON.parse(localStorage.get('notesList'));
	notesList.push(note);
 	list = JSON.stringify(notesList);
	localStorage.save('notesList', list);

};
