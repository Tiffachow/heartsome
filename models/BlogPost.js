var mongoose = require('mongoose');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var BlogPostsSchema = new Schema({ //new collection
	id:                                   ObjectId,
	title:                               { type: String, required: true },
	description:                     String,
	tldr:                                  String,
	body:                               { type: String, required: true }, //link to AWS S3 markdown file
	image:                             { type: String, default: "/dist/images/defaultpostimg.png" },
	private:                            { type: Boolean, default: false },
	tags:                                [String],
	categories:                      [String],
	views:                              { type: Number, default: 0 },
	shares:                            { type: Number, default: 0 },
	createdAt:                       { type: Date, default: Date.now }
});

// https://developers.facebook.com/docs/plugins/comments/
// https://heartsome.disqus.com/admin/settings/universalcode/

module.exports = mongoose.model('BlogPostModel', BlogPostsSchema); //retrieve model


// +++++++++++++++++++++++++++++++++

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
// var BlogPost = require('BlogPost');

// TO USE ELSEWHERE:
// Instantiate it
// var blogPostInstance = new BlogPost(); //create new instance of model, new document in collection
// blogPostInstance.title = 'Revamping Heartsome';
// BlogPost.find({}, function (err, docs) { //findOne, findById, update, http://mongoosejs.com/docs/queries.html
//   // docs.forEach
// });
// blogPostInstance.save(function (err) {
//   //
// });