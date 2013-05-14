
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
	
	var messageList = Storage.getMessagesList();

	for (i = 0; i < messageList.length; i++) {
		var messageItem = messageList[i];
		var template = _.template($('#tmpl_foursquare_list').html(), messageItem);
		$('#main-article').append(template);             
	}
});

var saveNote = function() {
	//TODO: get inputs type, description, priority
};