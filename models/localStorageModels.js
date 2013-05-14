function LocalStorageMessage() {
	this.id = null;
	this.title = null;
	this.description = null;
	this.priority = null;
}

var Parser = {};

Parser.MessageModelToObject = function ( model ) {
	var obj = new LocalStorageMessage();
	obj.id =  model.id;
	obj.title = model.title;
	obj.description =  model.description;
	obj.priority =  model.priority;
	return obj;
};

Parser.MessageObjectToBackboneModel = function ( object ) {
	var model = new LocalStorageModel();
	model.id =  object.id;
	model.title = object.title;
	model.description =  object.description;
	model.priority =  object.priority;
	return model;
};