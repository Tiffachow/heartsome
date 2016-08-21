var express = require('express');
var router = express.Router();

var multer = require('multer');

var aws = require('aws-sdk');

var Project = require('../models/Project');
var AppVersion = require('../models/AppVersion');
var BlogPost = require('../models/BlogPost');
var Profile = require('../models/Profile');

var router = express.Router();
// router.use(multer()); // for parsing multipart/form-data
// process.env.adminpassword

var S3_BUCKET = process.env.S3_BUCKET;
// ================================================================================

/* POST to login. */
router.post('/api/login', function(req, res) {
	// Stores user info by setting cookie
	// Setting a property will automatically cause a Set-Cookie response to be sent
	// Start admin session
	req.session.loggedIn = true;
	return res.json({loggedIn: true});
});

/* GET login. */
router.get('/api/login', function(req, res) {
	if (req.session && req.session.loggedIn) {
		return res.json({loggedIn: true});
	} else {
		return res.json({loggedIn: false});
	}
	return;
});

/* GET logout. */
router.get('/api/logout', function(req, res) {
	// End admin session
	delete req.session.loggedIn;
	return res.json({loggedIn: false});
});

// ================================================================================

/* GET profile. */
router.get('/api/profile', function(req, res) {
	Profile.findOne({}, function(err, profile){
		if (err) {
			console.log("Failed to find profile. Err: " + err);
		} else {
			if (!profile) {
				var newProfile = new Profile({
					firstName: "Tiffany",
					lastName: "Chow",
					title: "Software Engineer",
					location: "New York City",
					email: "tiffachow@gmail.com", //required
					websites: ["http://heartso.me"],
					about: "",
					images: [],
					dob: new Date(93, 6, 3),
					forHire: true,
					skills: [],
					password: process.env.password //required
				}); //create new instance of model, new document in collection
				newProfile.save(function (err) {
					if (err) {
						console.log("Failed to add new profile. Err: " + err);
						return res.json({success: false, loggedIn: true});
					} else {
						console.log("Added new profile!");
						Profile.findOne({}, function(err, profile){
							if (err) {
								console.log("Failed to get profile. Err: " + err);
								return res.json({success: false, loggedIn: true});
							} else {
								return res.json({success: true, profile: profile}); //return new profile
							}
						});
					}
				})
			} else {
				return res.json({success: true, profile: profile});
			}
		}
	});
	return;
});

/* UPDATE profile. */
router.put('/api/profile', function(req, res) {
	console.log("DATA IS: "+JSON.stringify(req.body));
	if (req.session && req.session.loggedIn) {
		Profile.findOne({}, function(err, profile){
			if (err) {
				console.log("Failed to get profile. Err: " + err);
				return res.json({success: false});
			} else {
				profile.firstName = req.body["profile-firstname"] || "";
				profile.lastName = req.body["profile-lastname"] || "";
				profile.title = req.body["profile-title"] || "";
				profile.location = req.body["profile-location"] || "";
				profile.email = req.body["profile-email"]; //required
				profile.websites = req.body["profile-websites"] || [];
				profile.about = req.body["profile-about"] || "";
				profile.images = req.body["profile-images"] || [];
				profile.dob = new Date(req.body["profile-dob"]) || new Date(93,6,3);
				profile.forHire = req.body["profile-forhire"] || true;
				console.log("SKILLS ARRAY: "+JSON.stringify(req.body["profile-skills"]));
				profile.skills = req.body["profile-skills"] || [];
				profile.password = req.body["profile-password"]; //required
				profile.save(function (err) {
					if (err) {
						console.log("Failed to update profile. Err: " + err);
						return res.json({success: false, loggedIn: true});
					} else {
						console.log("Updated profile!");
						return res.json({success: true, profile: profile});
					}
				});
			}
		});
	} else {
		console.log("Failed to update profile. Not admin.")
		return res.json({success: false, loggedIn: false});
	}
});

// ================================================================================

/* POST new blog post. */
router.post('/api/blog/new', function(req, res) {
	if (req.session && req.session.loggedIn) {
		var newPost = new BlogPost({
			title: req.body["post-title"],
			description: req.body["post-description"] || null,
			tldr: req.body["post-tldr"] || null,
			body: req.body["post-body"],
			image: req.body["post-image"] || null,
			private: req.body["post-private"],
			tags: req.body["post-tags"] || null,
			categories: req.body["post-categories"] || null
		}); //create new instance of model, new document in collection
		newPost.save(function (err) {
			if (err) {
				console.log("Failed to add new post. Err: " + err);
				return res.json({success: false, loggedIn: true});
			} else {
				console.log("Added new post!");
				BlogPost.find({}, function(err, posts){
					if (err) {
						console.log("Failed to get all posts. Err: " + err);
						return res.json({success: false});
					} else {
						return res.json({success: true, posts: posts});
					}
				});
			}
		})
	} else {
		console.log("Failed to add new post. Not admin.")
		return res.json({success: false, loggedIn: false});
	}
	return;
});

/* GET all blog posts. */
router.get('/api/blog/all', function(req, res) {
	BlogPost.find({}, function(err, posts){
		if (err) {
			console.log("Failed to get all posts. Err: " + err);
			return res.json({success: false});
		} else {
			return res.json({success: true, posts: posts});
		}
	});
	return;
});

/* GET one blog post. */
router.get('/api/blog/post/:id', function(req, res) {
	var id = req.params["id"];
	BlogPost.findOne({"_id":id}, function(err, post){
		if (err) {
			console.log("Failed to get post. Err: " + err);
			return res.json({success: false});
		} else {
			post.views++
			post.save(function (err) {
				if (err) {
					console.log("Failed to update post. Err: " + err);
					return res.json({success: false, loggedIn: true});
				} else {
					console.log("Updated post!");
					return res.json({success: true, post: post});
				}
			});
		}
	});
	return;
});

/* UPDATE blog post. */
router.put('/api/blog/post/:id', function(req, res) {
	if (req.session && req.session.loggedIn) {
		var id = req.params["id"];
		BlogPost.findOne({"_id":id}, function(err, post){
			if (err) {
				console.log("Failed to find post. Err: " + err);
				return res.json({success: false, loggedIn: true});
			} else {
				post.title = req.body["post-title"];
				post.description = req.body["post-description"] || null;
				post.tldr = req.body["post-tldr"] || null;
				post.body = req.body["post-body"];
				post.image = req.body["post-image"] || null;
				post.private = req.body["post-private"];
				post.tags = req.body["post-tags"] || null;
				post.categories = req.body["post-categories"] || null;
				post.save(function (err) {
					if (err) {
						console.log("Failed to update post. Err: " + err);
						return res.json({success: false, loggedIn: true});
					} else {
						console.log("Updated post!");
						BlogPost.find({}, function(err, posts){
							if (err) {
								console.log("Failed to get all posts. Err: " + err);
								return res.json({success: false});
							} else {
								return res.json({success: true, posts: posts});
							}
						});
					}
				});
			}
		});
	} else {
		console.log("Failed to update post. Not admin.")
		return res.json({success: false, loggedIn: false});
	}
	return;
});

/* DELETE a blog post. */
router.delete('/api/blog/post/:id', function(req, res) {
	if (req.session && req.session.loggedIn) {
		var id = req.params["id"];
		BlogPost.find({"_id":id}).remove(function(err){
			if (err) {
				console.log("Failed to delete post. Err: " + err);
				return res.json({success: false, loggedIn: true});
			} else {
				console.log("Deleted post");
				BlogPost.find({}, function(err, posts){
					if (err) {
						console.log("Failed to get all posts. Err: " + err);
						return res.json({success: false});
					} else {
						return res.json({success: true, posts: posts});
					}
				});
			}
		});
	} else {
		console.log("Failed to delete post. Not admin.")
		return res.json({success: false, loggedIn: false});
	}
	return;
});

// ================================================================================

/* POST new project. */
router.post('/api/projects/new', function(req, res) {
	if (req.session && req.session.loggedIn) {
		var newProject = new Project({
			contributors: req.body["project-contributors"] || null,
			builtFor: req.body["project-customers"] || null,
			title: (req.body["project-title"]).toString(),
			link: req.body["project-link"] || null,
			github: req.body["project-github"] || null,
			componentName: req.body["project-componentname"] || null,
			description: req.body["project-description"] || null,
			tech: req.body["project-tech"] || null,
			images: req.body["project-images"] || null,
			videos: req.body["project-videos"] || null,
			date: req.body["project-date"],
			private: req.body["project-privacy"],
			timeSpent: req.body["project-timespent"] || null,
		}); //create new instance of model, new document in collection
		newProject.save(function (err) {
			if (err) {
				console.log("Failed to add new project. Err: " + err);
				return res.json({success: false, loggedIn: true});
			} else {
				console.log("Added new project!");
				Project.find({}, function(err, projects){
					if (err) {
						console.log("Failed to get all projects. Err: " + err);
						return res.json({success: false});
					} else {
						return res.json({success: true, projects: projects});
					}
				});
			}
		})
	} else {
		console.log("Failed to add new project. Not admin.")
		return res.json({success: false, loggedIn: false});
	}
	return;
});

/* GET all projects. */
router.get('/api/projects/all', function(req, res) {
	Project.find({}, function(err, projects){
		if (err) {
			console.log("Failed to get all projects. Err: " + err);
			return res.json({success: false});
		} else {
			return res.json({success: true, projects: projects});
		}
	});
	return;
});

/* GET one project. */
router.get('/api/projects/project/:id', function(req, res) {
	var id = req.params["id"];
	Project.findOne({"_id":id}, function(err, project){
		if (err) {
			console.log("Failed to get project. Err: " + err);
			return res.json({success: false});
		} else {
			console.log("Got project!");
			return res.json({success: true, project: project});
		}
	});
	return;
});

/* UPDATE project. */
router.put('/api/projects/project/:id', function(req, res) {
	if (req.session && req.session.loggedIn) {
		var id = req.params["id"];
		Project.findOne({"_id":id}, function(err, project){
			if (err) {
				console.log("Failed to find project. Err: " + err);
				return res.json({success: false, loggedIn: true});
			} else {
				project.contributors = req.body["project-contributors"] || null;
				project.builtFor = req.body["project-customers"] || null;
				project.title = req.body["project-title"];
				project.link = req.body["project-link"] || null;
				project.github = req.body["project-github"] || null;
				project.componentName = req.body["project-componentname"] || null;
				project.description = req.body["project-description"] || null;
				project.tech = req.body["project-tech"] || null;
				project.images = req.body["project-images"] || null;
				project.videos = req.body["project-videos"] || null;
				project.date = req.body["project-date"];
				project.private = req.body["project-privacy"];
				project.timeSpent = req.body["project-timespent"] || null;
				project.save(function (err) {
					if (err) {
						console.log("Failed to update project. Err: " + err);
						return res.json({success: false, loggedIn: true});
					} else {
						console.log("Updated project!");
						Project.find({}, function(err, projects){
							if (err) {
								console.log("Failed to get all projects. Err: " + err);
								return res.json({success: false});
							} else {
								return res.json({success: true, projects: projects});
							}
						});
					}
				});
			}
		});
	} else {
		console.log("Failed to update project. Not admin.")
		return res.json({success: false, loggedIn: false});
	}
	return;
});

/* DELETE a project. */
router.delete('/api/projects/project/:id', function(req, res) {
	if (req.session && req.session.loggedIn) {
		var id = req.params["id"];
		Project.find({"_id":id}).remove(function(err){
			if (err) {
				console.log("Failed to delete project. Err: " + err);
				return res.json({success: false, loggedIn: true});
			} else {
				console.log("Deleted project");
				Project.find({}, function(err, projects){
					if (err) {
						console.log("Failed to get all projects. Err: " + err);
						return res.json({success: false});
					} else {
						return res.json({success: true, projects: projects});
					}
				});
			}
		});
	} else {
		console.log("Failed to delete project. Not admin.")
		return res.json({success: false, loggedIn: false});
	}
	return;
});

// ================================================================================

/* GET S3 signed request. */
router.get('/api/sign-s3', function(req, res) {
	var s3 = new aws.S3(); //Initialising the s3 object automatically loads the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY variables that were set into the environment earlier.
	var fileName = req.query['file-name'];
	var fileType = req.query['file-type'];
	var s3Params = {
		Bucket: S3_BUCKET,
		Key: fileName,
		Expires: 60,
		ContentType: fileType,
		ACL: 'public-read'
	};

	s3.getSignedUrl('putObject', s3Params, (err, data) => {
		if(err) {
			console.log(err);
			return res.json({success: false, error: err});
		} else {
			var returnData = {
				signedRequest: data,
				url: "https://" + S3_BUCKET + ".s3.amazonaws.com/" + fileName
			};
			return res.json({success: true, s3SignedRequest: returnData});
		}
	});
	return;
});

/* DELETE S3 object. */
router.delete('/api/s3-delete', function(req, res) {
	var s3 = new aws.S3(); //Initialising the s3 object automatically loads the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY variables that were set into the environment earlier.
	var fileName = req.query['file-name'];
	var s3Params = {
		Bucket: S3_BUCKET,
		Key: fileName
	};

	s3.deleteObject(s3Params, function(err, data) {
		if(err) {
			console.log(err, err.stack); // an error occurred
			return res.json({success: false, error: err});
		} else {
			console.log(data);           // successful response
			return res.json({success: true});
		}
	});
	return;
});

// ================================================================================

/* GET home page. */
// for: '/', '/v/**', '/roulette', '/admin', '/project/**' routes
router.get(/\/|\/v\/\p{L}*|\/roulette|\/admin|\/project\/\p{L}*/, function(req, res) {
	return res.render('index', {base: req.baseUrl, host: req.get('Host')});
});

// ================================================================================
module.exports = router;