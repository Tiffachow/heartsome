var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ProjectsSchema = new Schema({ //new collection
    id: 			ObjectId,
    contributors: 	{
    	name:       String,
    	link:       String
    },
    title: 			String,
    description: 	String,
    images: 		Array,
    date: 			Date,
    private: 		Boolean,
    time_spent: 	String,
    createdAt: 		{ type: Date, default: Date.now },
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