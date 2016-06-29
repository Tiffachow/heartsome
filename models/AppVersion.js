var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var AppVersionsSchema = new Schema({ //new collection
    id: 			ObjectId,
    name: 			String,
    description: 	String,
    date: 			Date,
    time_spent: 	String,
    private:        Boolean,
    tags:           Array,
    link:           String,
    createdAt: 		{ type: Date, default: Date.now }
});

module.exports = mongoose.model('AppVersionModel', AppVersionsSchema); //retrieve model


// +++++++++++++++++++++++++++++++++

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
// var AppVersion = require('AppVersion');

// TO USE ELSEWHERE:
// Instantiate it
// var appVersionInstance = new AppVersion(); //create new instance of model, new document in collection
// appVersionInstance.name = 'material';
// AppVersion.find({}, function (err, docs) { //findOne, findById, update, http://mongoosejs.com/docs/queries.html
//   // docs.forEach
// });
// appVersionInstance.save(function (err) {
//   //
// });