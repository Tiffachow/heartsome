var express = require('express');
var router = express.Router();

var multer = require('multer');

var Project = require('../models/Project');
var AppVersion = require('../models/AppVersion');
var BlogPost = require('../models/BlogPost');
var Profile = require('../models/Profile');

var router = express.Router();
// router.use(multer()); // for parsing multipart/form-data
// ================================================================================

/* GET home page. */
// for: '/', '/v/**', '/roulette', '/admin' routes
router.get(/[\/,\/v\/**,\/roulette,\/admin]/gim, function(req, res) {
  return res.render('index', {base: req.baseUrl});
});

// ================================================================================

/* POST to login. */
router.post('/api/login', function(req, res) {
  var password = req.body["password"];
  if (password == process.env.adminpassword) { // If passwords match...
    // Stores user info by setting cookie
    // Setting a property will automatically cause a Set-Cookie response to be sent
    // Start admin session
    req.session.admin = true;
    return res.json({admin: true});
  } else {
    return res.json({admin: false});
  }
  return;
});

/* GET login. */
router.get('/api/login', function(req, res) {
  if (req.session.admin) {
    return res.json({loggedIn: true});
  } else {
    return res.json({loggedIn: false});
  }
});

/* GET logout. */
router.get('/api/logout', function(req, res) {
  // End admin session
  delete req.session.admin;
  return res.json({admin: false});
});

// ================================================================================

/* POST new blog post. */
router.post('/api/blog/new', function(req, res) {
  if (req.session && req.session.admin) {
    var newPost = new BlogPost({
      title: req.body["post-title"],
      description: req.body["post-description"],
      tldr: req.body["post-tldr"],
      body: req.body["post-body"],
      image: req.body["post-image"],
      private: req.body["post-private"],
      tags: req.body["post-tags"],
      categories: req.body["post-categories"]
    }); //create new instance of model, new document in collection
    newPost.save(function (err) {
      if (err) {
        console.log("Failed to add new post. Err: " + err);
        return res.json({success: false, admin: true});
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
    return res.json({success: false, admin: false});
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
  BlogPost.findOne({"id":id}, function(err, post){
    if (err) {
      console.log("Failed to add new post. Err: " + err);
      return res.json({success: false});
    } else {
      post.views++
      post.save(function (err) {
        if (err) {
          console.log("Failed to update post. Err: " + err);
          return res.json({success: false, admin: true});
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
  if (req.session && req.session.admin) {
    var id = req.params["id"];
    BlogPost.findOne({"id":id}, function(err, post){
      if (err) {
        console.log("Failed to find post. Err: " + err);
        return res.json({success: false, admin: true});
      } else {
        post = {
          title: req.body["post-title"],
          description: req.body["post-description"],
          tldr: req.body["post-tldr"],
          body: req.body["post-body"],
          image: req.body["post-image"],
          private: req.body["post-private"],
          tags: req.body["post-tags"],
          categories: req.body["post-categories"]
        };
        post.save(function (err) {
          if (err) {
            console.log("Failed to update post. Err: " + err);
            return res.json({success: false, admin: true});
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
    console.log("Failed to update project. Not admin.")
    return res.json({success: false, admin: false});
  }
  return;
});

/* DELETE a blog post. */
router.delete('/api/blog/post/:id', function(req, res) {
  if (req.session && req.session.admin) {
    var id = req.params["id"];
    BlogPost.find({"id":id}).remove(function(err){
      if (err) {
        console.log("Failed to delete post. Err: " + err);
        return res.json({success: false, admin: true});
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
    return res.json({success: false, admin: false});
  }
  return;
});

// ================================================================================

/* POST new project. */
router.post('/api/new', function(req, res) {
  if (req.session && req.session.admin) {
    var data = {
      contributors: req.body["contributors"],
      title: req.body["title"],
      description: req.body["description"],
      snapshots: req.body["snapshots"],
      date: req.body["date"],
      private: req.body["private"],
      colors: req.body["colors"],
      time_spent: req.body["time_spent"],
    };
    var newProject = new Project({
      contributors: data.contributors,
      title: data.title,
      description: data.description,
      snapshots: data.snapshots,
      date: data.date,
      private: data.private,
      colors: data.colors,
      time_spent: data.time_spent
    }); //create new instance of model, new document in collection
    newProject.save(function (err) {
      if (err) {
        console.log("Failed to add new project. Err: " + err);
        return res.json({success: false, admin: true});
      } else {
        console.log("Saved new project!");
        return res.json({success: true});
      }
    })
  } else {
    console.log("Failed to add new project. Not admin.")
    return res.json({success: false, admin: false});
  }
  return;
});

// ================================================================================

/* GET project. */
router.get('/api/project/:title', function(req, res) {
  var title = req.params["title"];
  Project.findOne({"title":title}, function(err, project){
    if (err) {
      console.log("Failed to add new project. Err: " + err);
      return res.json({success: false});
    } else {
      return res.json({project: project});
    }
  });
  return;
});

// ================================================================================

/* UPDATE project. */
router.put('/api/project/:title', function(req, res) {
  if (req.session && req.session.admin) {
    var title = req.params["title"];
    var data = {
      contributors: req.body["contributors"],
      title: req.body["title"],
      description: req.body["description"],
      snapshots: req.body["snapshots"],
      date: req.body["date"],
      private: req.body["private"],
      colors: req.body["colors"],
      time_spent: req.body["time_spent"],
    };
    Project.findOne({"title":title}, function(err, project){
      if (err) {
        console.log("Failed to find project. Err: " + err);
        return res.json({success: false, admin: true});
      } else {
        project = {
          contributors: data.contributors,
          title: data.title,
          description: data.description,
          snapshots: data.snapshots,
          date: data.date,
          private: data.private,
          colors: data.colors,
          time_spent: data.time_spent
        };
        project.save(function (err) {
          if (err) {
            console.log("Failed to update project. Err: " + err);
            return res.json({success: false, admin: true});
          } else {
            console.log("Updated project!");
            return res.json({success: true, project: project});
          }
        });
      }
    });
  } else {
    console.log("Failed to update project. Not admin.")
    return res.json({success: false, admin: false});
  }
  return;
});

// ================================================================================

/* DELETE project. */
router.delete('/api/project/:title', function(req, res) {
  if (req.session && req.session.admin) {
    var title = req.params["title"];
    Project.find({"title":title}).remove(function(err){
      if (err) {
        console.log("Failed to delete project. Err: " + err);
        return res.json({success: false, admin: true});
      } else {
        console.log("Deleted project");
        return res.json({success: true});
      }
    });
  } else {
    console.log("Failed to delete project. Not admin.")
    return res.json({success: false, admin: false});
  }
  return;
});

// ================================================================================
module.exports = router;