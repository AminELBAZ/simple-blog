var controller = require("./controller");

module.exports = function(app) {

  app.get("/:page?", function(req, res) {
    var total_articles = 0;
    var nb_pages = 0;
    var articles_par_page = 6;
    //Récupération du numéro de page
    var articles_skip = null;
    if(req.params.page)
      articles_skip = ((req.params.page-1)*articles_par_page);
    else
      articles_skip = 0;

    //Permet de récupérer le nombre d'articles en bdd
    app.db.collection("articles").count(function(err,total){
      total_articles = total;
      //Affichage de 5 articles par pages, donc calcul du nombre de pages
      nb_pages = Math.ceil(total_articles/articles_par_page);
    });
    //Limitation de la requête au nombre d'articles par pages. Permet de gérer la pagination facillement
    app.db.collection("articles").find({}).skip(articles_skip).limit(articles_par_page).toArray(function(err, articles) {
      if (err) throw err;
      // console.log(articles);
      res.render("index",{
        "articles":articles,
        "total_articles":total_articles,
        "nb_pages":nb_pages,
        "articles_par_page":articles_par_page
      });
    });
    
  });


  // Register posts endpoint
  controller(app);
}
