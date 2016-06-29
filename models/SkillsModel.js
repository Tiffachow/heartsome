var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var SkillsSchema = new Schema({ //new collection
    id: 			           ObjectId,
    ownerProfileId: 	       Number, //map to ProfilesSchema
    type:                      String, //language, tool, etc
    name:                      String, //eg NodeJS
    experience:                String, //years
    proficiency:               String, //eg Expert
    works:                     Array, //eg Picllery,Heartsome
    createdAt: 		           { type: Date, default: Date.now }
});

module.exports = mongoose.model('SkillsModel', SkillsSchema); //retrieve model


// +++++++++++++++++++++++++++++++++

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
// require('SkillsModel');

// TO USE ELSEWHERE:
// Instantiate it
// var skillsModelInstance = new SkillsModel(); //create new instance of model, new document in collection
// skillsModelInstance.name = 'Angular2';
// SkillsModel.find({}, function (err, docs) { //findOne, findById, update, http://mongoosejs.com/docs/queries.html
//   // docs.forEach
// });
// skillsModelInstance.save(function (err) {
//   //
// });