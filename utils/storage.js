//variables que serán 'keys' en el localstorage
function keys() {
    this.keyUsersList = "keyUsersList";
    this.keyUserConversation = "keyUserConversation_";
    this.keyThumbnails = "keyThumbnails_";
}

var StorageKeys = new keys(),
    Storage = {
        usersList : null
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
	   	 TID.log.debug('"MAXIMUM LIMIT IN LocalStorage REACHED. Cleaning... ');
		 alert(i18n.getPropertyValue("fullLocalStorage"));
		 Storage.clear();
    }
}

Storage.getUsersList = function () {
    if ( typeof localStorage !== undefined ) {
        return JSON.parse( localStorage.getItem( StorageKeys.keyUsersList ) );
    }
    return null;
};

Storage.saveUsersList = function ( userList ) {
    var element = null;
    var arrayList = [];
    for ( var i = 0, l = userList.length; i < l; i++ ) {
        var user = userList[i];
        element = Parser.UserObjectToBackboneModel( user );
        arrayList.push( element );
    }

    Storage.save( StorageKeys.keyUsersList, JSON.stringify( arrayList ) );
    if ( localStorage !== null ) {
        this.usersList = localStorage.getItem( StorageKeys.keyUsersList );
    }
}

Storage.getUserConversation = function ( userId ) {
    if ( typeof( localStorage ) !== undefined ) {
        return JSON.parse( localStorage.getItem( StorageKeys.keyUserConversation + userId ) );
    }
    return null;
}

Storage.saveConversationMessage = function ( userId, messageEvent ) {
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

Storage.deleteConversationItem = function ( userId, messageCid ) {
	//found the item, and delete it.
	var messagesList = Storage.getUserConversation( userId );
	if ( messagesList ) {
		var i = messagesList.length -1;
		var found = messagesList[ i ].cid == messageCid;

		while ( ! found && i > 0 ) {
			found = messagesList[ i ].cid == messageCid;
			if ( ! found ) {
				i--;
			}
		}
		if(found){
			
			messagesList.splice(i, 1);			
			Storage.saveMessageList(userId, messagesList); 
		}			
	}			
}

Storage.deleteConversation = function(userConnect) {
	
	var messagesList = Storage.getUserConversation(userConnect);
	if (messagesList) {

		for (var i = 0; i < messagesList.length; i++) {
			messagesList.splice(i, 1);			
			Storage.saveMessageList(userConnect, messagesList); 
		}
	}			
}

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

