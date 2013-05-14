//variables que serán 'keys' en el localstorage
function keys() {
    this.keyMessagesList = "keyMessagesList";
   // this.keyMessage = "keyMessage_";
}

var StorageKeys = new keys(),
    Storage = {
        messagesList : null
    };

seen = [];

Storage.clear = function () {
    if ( typeof( localStorage ) !== undefined ) {
        localStorage.clear();
    }
}

Storage.save = function( key, data ) {
    try {
        localStorage.setItem( key, data );
    } catch( e ) {
	   	 //TID.log.debug('"MAXIMUM LIMIT IN LocalStorage REACHED. Cleaning... ');
		 Storage.clear();
    }
}

Storage.getMessagesList = function () {
    if ( typeof localStorage !== undefined ) {
        return JSON.parse( localStorage.getItem( StorageKeys.keyMessagesList ) );
    } else {
    	
    }
    
    return null;
};

Storage.saveMessagesList = function ( messageList ) {
    var element = null;
    var arrayList = [];
    for ( var i = 0, l = messageList.length; i < l; i++ ) {
        var message = messageList[i];
        element = Parser.MessageObjectToBackboneModel( message );
        arrayList.push( element );
    }

    Storage.save( StorageKeys.keyMessagesList, JSON.stringify( arrayList ) );
    if ( localStorage !== null ) {
        this.messagesList = localStorage.getItem( StorageKeys.keyMessagesList );
    }
}

/*

Storage.getMessage = function ( messageId ) {
    if ( typeof( localStorage ) !== undefined ) {
        return JSON.parse( localStorage.getItem( StorageKeys.keyMessage + messageId ) );
    }
    return null;
}

Storage.saveMessage = function ( messageId, messageEvent ) {
	var element = null;
	if ( messageEvent.eventType == EventType.text ) {
		element =  Parser.TextMessageModelToObject(messageEvent);
	} else if ( messageEvent.eventType == EventType.image ) {
		element = Parser.ImageMessageModelToObject( messageEvent );
	} else if ( messageEvent.eventType == EventType.location ) {
		element = Parser.LocationMessageModelToObject( messageEvent );
	} else if ( messageEvent.eventType == EventType.audio ) {
		element = Parser.AudioMessageModelToObject( messageEvent );
	}
	var arrayList = Storage.getUserConversation( userId );
	if ( arrayList === null ) {
		arrayList = [];
	}
	arrayList[ arrayList.length ] = element;
	Storage.saveMessageList( userId, arrayList );
}
*/
Storage.deleteMessageItem = function ( messageId ) {
	//found the item, and delete it.
	var messagesList = Storage.getMessagesList( messageId );
	if ( messagesList ) {
		var i = messagesList.length -1;
		var found = messagesList[ i ].id == messageId;

		while ( ! found && i > 0 ) {
			found = messagesList[ i ].id == messageId;
			if ( ! found ) {
				i--;
			}
		}
		
		if(found){			
			messagesList.splice(i, 1);			
			Storage.saveMessageList(messagesList); 
		}			
	}			
}
/*
Storage.deleteConversation = function(userConnect) {
	
	var messagesList = Storage.getUserConversation(userConnect);
	if (messagesList) {

		for (var i = 0; i < messagesList.length; i++) {
			messagesList.splice(i, 1);			
			Storage.saveMessageList(userConnect, messagesList); 
		}
	}			
}
*/
/*
Storage.replaceConversationMessage = function(userId, messageEvent, position){
	var arrayList = Storage.getUserConversation(userId); 
	arrayList[position] = messageEvent;	

	Storage.saveMessageList(userId, arrayList); 	
}

Storage.saveMessageList = function(userId, array){
		
	Storage.save(StorageKeys.keyUserConversation+userId, JSON.stringify(array, function(key, val) {
	   if (typeof val == "object") {
	        if (seen.indexOf(val) >= 0)
	            return undefined
	        seen.push(val)
	    }
	    return val
	})); 
}
*/
