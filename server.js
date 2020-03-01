var express = require("express");
var path = require("path");
var fs = require('fs');

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// displays index.html

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  // displays note.html
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
  // read notes from db.json
  app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf8", function(err, data){
        if (err) throw err;
        //console.log(data);
        let dataArray = JSON.parse(data);
        dataArray.forEach((item, i) => {
            item.id = i ;
          });
          res.json(dataArray);
          console.log(dataArray);
    })
  });
// save notes to db.json and display it to the user
  app.post("/api/notes", function(req, res){
      fs.readFile("./db/db.json", "utf8", function(err, data){
        if (err) throw err;
        const dataArray = JSON.parse(data);
        dataArray.push(req.body);
        fs.writeFile("./db/db.json", JSON.stringify(dataArray), function(err, data){
            if (err) throw err;
            res.send("Saved!")
        })
      })
  });
  //DELETE /api/notes/:id remove the note with id equals to the button user clicked on
  app.delete("/api/notes/:id", function(req, res) {
    fs.readFile("./db/db.json", "utf-8", function(err, data) {
      const dataArr = JSON.parse(data);
      dataArr.splice(req.params.id, 1);
      fs.writeFile("./db/db.json", JSON.stringify(dataArr), err => {
        if (err) {
          console.log(err);
        } else {
          res.send("great");
        }
      });
    });
  });
  
  