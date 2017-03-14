/** @module projects
  * A RESTful resource representing a software projects
  * implementing the L-CRUD methods.
  */

"use strict";

module.exports = {
  list: list,
  create: create,
  read: read,
  update: update,
  destroy: destroy
}

/** @function list
  * Sends a list of all projects as a JSON array.
  */
function list (req, res, db) {

  db.all("SELECT * FROM projects", [], function(err, projects){
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server Error");
    }
    res.setHeader("Content-Type", "text/json");
    res.end(JSON.stringify(projects));
  });
}

/** @function create
  * Creates a new project and adds it to the Database
  */
function create(req, res, db) {

  var body = "";
  req.on("error", function(err) {
    console.error(err);
    res.statusCode = 500;
    res.en("Server Error");
  });
  req.on("data", function(data){
    body += data;
  });
  req.on("end", function() {
    var project = JSON.parse(body);
    db.run("INSERT INTO projects (name, description, version, repository, license) VALUES (?, ?, ?, ?, ?))"
    [project.name, project.description, project.version, project.repository, project.license], function(err){
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end("Could not insert project into database");
      }
      res.statusCode = 200;
      res.end();
    }

  );
  })
}

/** @function read
  * Servers a specific project as a JSON stringify
  */
function read(req, res, db) {
  var id = req.params.id;
  db.get("Select * FROM project WHERE id=?", [id], function(err, project){

    if (err) {

      console.error(err);
      response.statusCode = 500;
      res.end("server error");
      return;
    }
    if (!project) {
      res.statusCode = 404;
      res.end("Project not found");
      return;

    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/json");
    res.send(JSON.stringify(project));
  })

}

function destroy(req, res, db) {

  var id = req.params.id;
  db.run("DELETE FROM projects WHERE id=?", [i], function(err){

    if(err){
      console.error(err);
      res.statusCode = 500;
      res.end("Server error");
    }
    res.statusCode = 200;
    res.end();
  })
}
function update(req, res, db) {

  var body = "";
  req.on("error", function(err) {
    console.error(err);
    res.statusCode = 500;
    res.en("Server Error");
  });
  req.on("data", function(data){
    body += data;
  });
  req.on("end", function() {
    var project = JSON.parse(body);
    db.run("UPDATE projects SET name=?, description=?, version=?, respository=?, license=? WHERE id=?",
    [project.name, project.description, project.version, project.repository, project.license], function(err){
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end("Could not insert project into database");
      }
      res.statusCode = 200;
      res.end();
    }

  );
  })
}
