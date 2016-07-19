var mongoose = require('mongoose');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var ProjectsSchema = new Schema({ //new collection
	id:                                    ObjectId,
	contributors:                   {
		name:                 String,
		links:                   [String]
	},
	builtFor:                          [{
		name:                  String, //eg USA Rx
		links:                   [String] //eg USARX.com
	}],
	title:                                 { type: String, required: true },
	description:                     String,
	tech:                                [String],
	images:                           [String], //s3 url
	videos:                            [String], //s3 url
	date:                                Date,
	private:                           { type: Boolean, default: false },
	timeSpent:                       String,
	createdAt:                       { type: Date, default: Date.now },
});

// a setter
ProjectsSchema.path('title').set(function (v) {
  return capitalize(v);
});

module.exports = mongoose.model('ProjectModel', ProjectsSchema); //retrieve model


// +++++++++++++++++++++++++++++++++

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
// var Project = require('Project');

// TO USE ELSEWHERE:
// Instantiate it
// var projectInstance = new Project(); //create new instance of model, new document in collection
// projectInstance.title = 'Flippy';
// Project.find({}, function (err, docs) { //findOne, findById, update, http://mongoosejs.com/docs/queries.html
//   // docs.forEach
// });
// projectInstance.save(function (err) {
//   //
// });