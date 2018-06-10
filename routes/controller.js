module.exports = function(app) {
  var ObjectID = require('mongodb').ObjectID;
  
  var formidable = require('formidable'),
  path = require('path'),
  fs = require('fs'),
  http = require('http');
  
  
  
  //GET
  app.get("/post/create", function(req, res) {
    res.render("edit",{"article":null,"edit":false});
  });
  
  app.get("/post/edit/:id", function(req, res) {
    app.db.collection("articles").findOne({ "_id":  new ObjectID(req.params.id)},function(err, article) {
      if (err) throw err;
      res.render("edit",{"article":article,"edit":true});
    });
  });
  
  app.get("/post/delete/:id", function(req, res) {
    app.db.collection("articles").deleteOne({ "_id":  new ObjectID(req.params.id)},function(err, article) {
      if (err) throw err;
      console.log("1 article a été supprimé");
    });
    res.redirect('/');
  });
  
  app.get("/post/:id", function(req, res) {
    // res.send("L'id fourni est le suivant :"+req.params.id);
    app.db.collection("articles").findOne({ "_id":  new ObjectID(req.params.id)},function(err, article) {
      if (err) throw err;
      res.render("edit",{"article":article});
    });
  });
  
  //POST
  app.post("/post/save", function(req, res) {
    //Création du form 
    var form = new formidable.IncomingForm();
    //Récupération de données du formulaire
    form.parse(req, function(err, fields, files) {
      var old_path = files.image_upload.path,
      file_size = files.image_upload.size,
      //Récupération de l'extension du fichier
      file_ext = files.image_upload.name.split('.').pop(),
      //Récupération du nom du fichier, sans l'extension
      file_name = files.image_upload.name.split('.')[0],
      //Ajout du timestamp au nom fichier pour qu'il soit unique
      new_file_name = `${file_name}_${new Date().getTime()}.${file_ext}`,
      //Définition du chemin d'upload du fichier
      new_path = path.join(process.env.PWD, 'public/uploads/', new_file_name);
      
      //Upload du nouveau fichier
      fs.readFile(old_path, function(err, data) {
        fs.writeFile(new_path, data, function(err) {
          fs.unlink(old_path, function(err) {
            if (err) {
              res.status(500);
            } else {
              res.status(200);
            }
          });
        });
      });
      //Définition des nouvelles valeurs du document
      if(file_name || file_name != ""){
        var article = {titre: fields.titre, auteur: fields.auteur, resume: fields.resume, image: new_file_name };
      }
      else{
        var article = {titre: fields.titre, auteur: fields.auteur, resume: fields.resume};
      }
      app.db.collection("articles").insertOne(article, function(err, res) {
        if (err) throw err;
        console.log("1 article a été inséré");
      });
      res.redirect('/');
    });
  });
  
  app.post("/post/update", function(req, res) {
    //Création du form 
    var form = new formidable.IncomingForm();
    //Récupération de données du formulaire
    form.parse(req, function(err, fields, files) {
      var old_path = files.image_upload.path,
      file_size = files.image_upload.size,
      //Récupération de l'extension du fichier
      file_ext = files.image_upload.name.split('.').pop(),
      //Récupération du nom du fichier, sans l'extension
      file_name = files.image_upload.name.split('.')[0],
      //Ajout du timestamp au nom fichier pour qu'il soit unique
      new_file_name = `${file_name}_${new Date().getTime()}.${file_ext}`,
      //Définition du chemin d'upload du fichier
      new_path = path.join(process.env.PWD, 'public/uploads/', new_file_name);
      
      //Upload du nouveau fichier
      fs.readFile(old_path, function(err, data) {
        fs.writeFile(new_path, data, function(err) {
          fs.unlink(old_path, function(err) {
            if (err) {
              res.status(500);
            } else {
              res.status(200);
            }
          });
        });
      });
      //Transformation de l'id en objectID
      var id = new ObjectID(fields.id);
      
      //Définition des nouvelles valeurs du document
      if(file_name || file_name != ""){
        var newvalues = { $set: {titre: fields.titre, auteur: fields.auteur, resume: fields.resume, image: new_file_name } };
      }
      else{
        var newvalues = { $set: {titre: fields.titre, auteur: fields.auteur, resume: fields.resume} };
      }
      console.log(id);
      console.log(newvalues);
      console.log(new_path);
      var query = { _id: id };
      app.db.collection("articles").updateOne(query, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 article mis à jour");
      });
      
      res.redirect('/post/edit/'+id);
    });
  });
}