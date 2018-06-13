var mongoose = require('mongoose');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var TagsSchema = new Schema({ //new collection
	id:             	ObjectId,
	name:           	{ type: String, required: true },
	type:    			{ type: String, required: true }, // blogTag, blogCategory, projectTech, versionTag
	createdAt:      	{ type: Date, default: Date.now }
});

module.exports = mongoose.model('TagModel', TagsSchema); //retrieve model


// +++++++++++++++++++++++++++++++++

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
// var AppVersion = require('AppVersion');

// TO USE ELSEWHERE:
// Instantiate it
// var tagInstance = new Tag(); //create new instance of model, new document in collection
// tagInstance.name = 'material';
// Tag.find({}, function (err, docs) { //findOne, findById, update, http://mongoosejs.com/docs/queries.html
//   // docs.forEach
// });
// tagInstance.save(function (err) {
//   //
// });