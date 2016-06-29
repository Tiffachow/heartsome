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

module.exports = mongoose.model('ProfileModel', ProfilesSchema); //retrieve model


// +++++++++++++++++++++++++++++++++

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
// var Profile = require('Profile');

// TO USE ELSEWHERE:
// Instantiate it
// var profileInstance = new Profile(); //create new instance of model, new document in collection
// profileInstance.title = 'Web Developer';
// Profile.find({}, function (err, docs) { //findOne, findById, update, http://mongoosejs.com/docs/queries.html
//   // docs.forEach
// });
// profileInstance.save(function (err) {
//   //
// });