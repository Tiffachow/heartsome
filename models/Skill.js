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

module.exports = mongoose.model('SkillModel', SkillsSchema); //retrieve model


// +++++++++++++++++++++++++++++++++

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
// var Skill = require('Skill');

// TO USE ELSEWHERE:
// Instantiate it
// var skillInstance = new Skill(); //create new instance of model, new document in collection
// skillInstance.name = 'Angular2';
// Skill.find({}, function (err, docs) { //findOne, findById, update, http://mongoosejs.com/docs/queries.html
//   // docs.forEach
// });
// skillInstance.save(function (err) {
//   //
// });