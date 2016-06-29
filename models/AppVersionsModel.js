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

module.exports = mongoose.model('AppVersionsModel', AppVersionsSchema); //retrieve model


// +++++++++++++++++++++++++++++++++

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
// require('AppVersionsModel');

// TO USE ELSEWHERE:
// Instantiate it
// var appVersionsModelInstance = new AppVersionsModel(); //create new instance of model, new document in collection
// appVersionsModelInstance.name = 'material';
// AppVersionsModel.find({}, function (err, docs) { //findOne, findById, update, http://mongoosejs.com/docs/queries.html
//   // docs.forEach
// });
// appVersionsModelInstance.save(function (err) {
//   //
// });