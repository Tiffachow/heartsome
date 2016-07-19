var mongoose = require('mongoose');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var ProfilesSchema = new Schema({ //new collection
	id:                                          ObjectId,
	firstName:                             String,
	lastName:                             String,
	title:                                       String, //career
	location:                                String,
	email:                                    { type: String, required: true },
	websites:                              [String],
	about:                                    String,
	images:                                 [String], //s3 url
	dob:                                      Date,
	forHire:                                  { type: Boolean, default: true },
	skills:                                     [{
		type: {
    								type: String //language, tool, etc
      	},
		name:                        { type: String }, //eg NodeJS
		experience:               String, //years
		proficiency:               String, //eg Expert
		works:                       [String], //eg Picllery,Heartsome. map to Project model title
	}],
	createdAt:                             { type: Date, default: Date.now },
	password:                             { type: String, required: true }
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