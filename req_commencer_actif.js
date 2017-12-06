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
	var contenu_fichier;
	var contenu_init_board;
	var liste_membre;
	var liste_init_board;
	var i;
	var liste;
	var test;
	var versus;

	test = false;
	contenu_fichier = fs.readFileSync("salon.json", 'utf-8');
	contenu_init_board = fs.readFileSync("init_board.json", 'utf-8');
	liste_membre = JSON.parse(contenu_fichier);
	liste_init_board = JSON.parse(contenu_init_board);

	liste = "";
	for (i = 0; i < liste_membre.length; i++) {
		if (liste_membre[i].pseudo !== query.pseudo && liste_membre[i].etat === "disponible") {
			liste += "<a href=./req_commencer_passif?pseudo=" + query.pseudo + "&adv=" + liste_membre[i].pseudo + ">" + liste_membre[i].pseudo + "</a>";
			liste += "<br>";

		}

	}
	for(i = 0; i < liste_membre.length; i++) {
		if(liste_membre[i].adv === query.pseudo){
			versus = liste_membre[i].pseudo;
			for (i = 0; i < liste_membre.length; i++) {
				if (liste_membre[i].pseudo === query.pseudo) {
					liste_membre[i].etat = "indisponible";
					liste_membre[i].statut = "actif";
					liste_membre[i].adv = versus;
					contenu_fichier = JSON.stringify(liste_membre);
					fs.writeFileSync("salon.json", contenu_fichier, "UTF-8");

				}
			}
			test = true;
		}
	}
	
	if(test === true) {
		page = fs.readFileSync('res_choix.html','utf-8');
		
		marqueurs_board = {};
		for(var ligne = 0; ligne < 8; ligne++) {
			for(var colonne = 0; colonne < 8; colonne++) {
				console.log(liste_init_board[ligne][colonne]);
				marqueurs_board["sqr_" + ligne + ":" + colonne] = liste_init_board[ligne][colonne];
			}
		}
		page = page.supplant(marqueurs_board);
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




