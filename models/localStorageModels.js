function LocalStorageMessage() {
	this.id = null;
	this.message = null;
}

var Parser = {};

Parser.MessageModelToObject = function ( model ) {
	var obj = new LocalStorageMessage();
	obj.id =  model.id;
	obj.message =  model.message;
	return obj;
};

Parser.MessageObjectToBackboneModel = function ( object ) {
	var model = new LocalStorageModel();
	model.id =  object.id;
	model.message =  object.message;
	return model;
};