var express = require('express');
var router = express.Router();

var multer = require('multer');
var Projects = require('../models/database');

var router = express.Router();
// router.use(multer()); // for parsing multipart/form-data
// ================================================================================

/* GET home page. */
// for: '/', '/v/**', '/roulette', '/admin' routes
router.get(/[\/,\/v\/**,\/roulette,\/admin]/gim, function(req, res) {
  return res.render('index', {base: req.baseUrl});
});

// ================================================================================

/* GET home page. */
router.get('/api/home', function(req, res) {
  if (req.session && req.session.admin) {
    var query = {};
  } else {
    var query = {"private": false};
  };
  Projects.find(query, function (err, projects) {
    // find all projects
    return res.json({projects: projects});
  });
  return;
});

// ================================================================================

/* POST to login. */
router.post('/api/admin', function(req, res) {
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

// ================================================================================

/* GET logout. */
router.get('/api/logout/', function(req, res) {
  // End admin session
  delete req.session.admin;
  return res.json({admin: false});
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
    var newProject = new Projects({
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
  Projects.findOne({"title":title}, function(err, project){
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
    Projects.findOne({"title":title}, function(err, project){
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
    Projects.find({"title":title}).remove(function(err){
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