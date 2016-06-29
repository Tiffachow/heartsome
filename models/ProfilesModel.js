var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ProfilesSchema = new Schema({ //new collection
    id: 			           ObjectId,
    first_name: 	           String,
    last_name:                 String,
    title:                     String, //career
    location:                  String,
    email:                     String,
    websites:                  Array,
    about: 	                   String,
    images: 		           Array,
    dob: 			           Date,
    for_hire: 		           Boolean,
    time_spent: 	           String,
    createdAt: 		           { type: Date, default: Date.now },
});

module.exports = mongoose.model('ProfilesModel', ProfilesSchema); //retrieve model


// +++++++++++++++++++++++++++++++++

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
// require('ProfilesModel');

// TO USE ELSEWHERE:
// Instantiate it
// var profilesModelInstance = new ProfilesModel(); //create new instance of model, new document in collection
// profilesModelInstance.title = 'Web Developer';
// ProfilesModel.find({}, function (err, docs) { //findOne, findById, update, http://mongoosejs.com/docs/queries.html
//   // docs.forEach
// });
// profilesModelInstance.save(function (err) {
//   //
// });