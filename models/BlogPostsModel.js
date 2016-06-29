var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var BlogPostsSchema = new Schema({ //new collection
    id: 			ObjectId,
    authors:        {
        name:       String,
        link:       String
    },
    title: 			String,
    description: 	String,
    tldr:           String,
    body:           String,
    images: 		Array,
    private: 		Boolean,
    tags:           Array,
    createdAt: 		{ type: Date, default: Date.now },
});

module.exports = mongoose.model('BlogPostsModel', BlogPostsSchema); //retrieve model


// +++++++++++++++++++++++++++++++++

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
// require('BlogPostsModel');

// TO USE ELSEWHERE:
// Instantiate it
// var blogPostsModelInstance = new BlogPostsModel(); //create new instance of model, new document in collection
// blogPostsModelInstance.title = 'Revamping Heartsome';
// BlogPostsModel.find({}, function (err, docs) { //findOne, findById, update, http://mongoosejs.com/docs/queries.html
//   // docs.forEach
// });
// blogPostsModelInstance.save(function (err) {
//   //
// });