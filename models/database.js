var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ProjectsSchema = new Schema({ //new collection
    id: 			ObjectId,
    contributors: 	{
    	name: String,
    	link: String,
    },
    title: 			String,
    description: 	String,
    snapshots: 		Array,
    date: 			Date,
    private: 		Boolean,
    colors: 		Array,
    time_spent: 	String,
    createdAt: 		{ type: Date, default: Date.now },
});

// a setter
ProjectsSchema.path('title').set(function (v) {
  return capitalize(v);
});

module.exports = mongoose.model('ProjectsModel', ProjectsSchema); //retrieve model


// +++++++++++++++++++++++++++++++++

// TO USE ELSEWHERE:
// Instantiate it
// var projectsModelInstance = new ProjectsModel(); //create new instance of model, new document in collection
// projectsModelInstance.title = 'hello';
// ProjectsModel.find({}, function (err, docs) { //findOne, findById, update, http://mongoosejs.com/docs/queries.html
//   // docs.forEach
// });
// projectsModelInstance.save(function (err) {
//   //
// });