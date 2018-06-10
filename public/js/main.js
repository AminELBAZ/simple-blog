$( document ).ready(function() {
    var page = $(location).attr('href').split("/")[3];
    //Indication de la page actuelle
    if(page >= 1){
      $('#page'+page).addClass("active");
    }else{
      $('#page1').addClass("active");
    }
    //Désactivation du bouton suivant si il s'agit de la dernière page
    if(page == $('#nb_pages').val()){
        $('#page-next').parent().addClass('disabled');
    }
    else{
        //Désactivation du bouton précédent si il s'agit de la première page
        if(page == 1 || page == ""){
            $('#page-previous').parent().addClass('disabled');
        }
    }
   

    console.log( "ready!" );
    listen();
  });

function listen(){


  $("#submit-research").click(function(){
    $("form").attr("action","/post/"+$("#research").val())
  });

  //Confirmation de suppression d'un article
  $('.delete-article').click(function(event){
    var isGood=confirm("Êtes-vous sûr(e) de vouloir supprimer l'article ?");
    if (isGood) {
      return;
    } else {
      event.preventDefault();
      return;
    }
  });
  
  //Permet de gérer dynamiquement la pagination previous
  $('#page-previous').click(function(event){
    //Récupération du paramètre page
    var page = $(location).attr('href').split("/")[3];
    //Changement de l'url pour
    if (page > 1){
      page = page - 1;
      $(this).attr('href','/'+page);
    }
    else{
        event.preventDefault();
    }
  });

  //Permet de gérer dynamiquement la pagination next
  $('#page-next').click(function(event){
    //Récupération du paramètre page
    var page = $(location).attr('href').split("/")[3];
    //Si il s'agit de la dernière page, alors on ne fait rien
    if (page == $('#nb_pages').val()){
    //   console.log("fin");
      event.preventDefault();
    }
    //Changement de l'url pour la page suivante
    if (page >= 1){
      page = parseInt(page) + 1;
      $(this).attr('href','/'+page);
    }
    else{
      $(this).attr('href','/2');
    }
  });
}