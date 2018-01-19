//=============================================================================
// Traitement de req_commencer_actif
// Bennaceur /  Fumey-Humbert / Mercier-Handisyde / Vasseur
// Version : 20.11.2017
//==============================================================================

"use strict";

var fs = require("fs");
var moment = require('moment');
require('remedial');

var trait = function(req, res, query) {
	var marqueurs;
	var marqueurs_board;
	var page;
	var pawn;
	var contenu_fichier;
	var contenu_init_board;
	var contenu_image;
	var liste_membre;
	var liste_init_board;
	var liste_image;
	var i;
	var liste;
	var test;
	var versus;
	var horiz_coord;
	var ligne;
	var colonne;

	test = false;
	//============ Préparation d'une éventuelle partie ============\\
	contenu_fichier = fs.readFileSync("salon.json", 'utf-8');
	liste_membre = JSON.parse(contenu_fichier);	
	
	contenu_init_board = fs.readFileSync("init_board.json","UTF-8");
	liste_init_board = JSON.parse(contenu_init_board);

	contenu_image = fs.readFileSync("pieces.json", 'utf-8');
	liste_image = JSON.parse(contenu_image);

	//=== Génération des liens permettant de défier un joueur ====\\
	liste = "";
	for (i = 0; i < liste_membre.length; i++) {
		
		if (liste_membre[i].pseudo !== query.pseudo && liste_membre[i].etat === "disponible") {
	liste += "<form action='/req_commencer_passif' method='GET'><input type ='hidden' name='pseudo' value='"+ query.pseudo +"'><input type ='hidden' name ='adv' value='"+ liste_membre[i].pseudo +"'><button class='button1' name='action' value=''>" + liste_membre[i].pseudo + "</button></form>";
			}

		}
	  //=========== Création du statut de jeu si joeur défié ============\\

	for(i = 0; i < liste_membre.length; i++) {
		if(liste_membre[i].adv === query.pseudo){
			versus = liste_membre[i].pseudo;
			for (i = 0; i < liste_membre.length; i++) {
				if (liste_membre[i].pseudo === query.pseudo) {
					liste_membre[i].etat = "indisponible";
					liste_membre[i].statut = "actif";
					liste_membre[i].color = "blanc";
					liste_membre[i].adv = versus;
					contenu_fichier = JSON.stringify(liste_membre);
					fs.writeFileSync("salon.json", contenu_fichier, "UTF-8");

				}
			}
			test = true;
		}
	}
	//========= Si le joueur subit un défi, il commence actif ========\\
	if(test === true) {

		page = fs.readFileSync('res_choix.html','utf-8');

		marqueurs_board = {};
		horiz_coord = "ABCDEFGH";

		for(ligne = 0; ligne < 8; ligne++) {
			for(colonne = 0; colonne < 8; colonne++) {
				marqueurs_board[colonne + 1] = String(colonne + 1);
                marqueurs_board[horiz_coord[colonne]] = horiz_coord[colonne];	
				
				pawn = liste_init_board[ligne][colonne];	

				if(liste_init_board[ligne][colonne] === liste_init_board[ligne][colonne].toUpperCase() && liste_init_board[ligne][colonne] !== " ") {
					
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
						"<img src="+liste_image[pawn]+">";
				
				} else if(liste_init_board[ligne][colonne] === liste_init_board[ligne][colonne].toLowerCase() && liste_init_board[ligne][colonne] !== " ") {
					
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
						"<a href='req_choix?pseudo="+query.pseudo+"&x="+ligne+"&y="+colonne+"'><img src="+liste_image[pawn]+"></a>";
				
				} else if(liste_init_board[ligne][colonne] === " ") {
					
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
						"<img src="+liste_image[pawn]+">";
				
				}
				 
			}
		}

		page = page.supplant(marqueurs_board);
	  
	  //============ Sinon, il reste en attente sur le salon ===========\\
	} else {
		
		page = fs.readFileSync('res_salon.html','utf-8');

	}

		marqueurs = {};
		marqueurs.pseudo = query.pseudo;
		marqueurs.joueurs = liste;
		marqueurs.date = moment().format('LLL');
		marqueurs.heure = "";
		page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();
};
//==================================================

module.exports = trait;




