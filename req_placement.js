//========================================================
// Traitement de "req_placement"
// Auteur : Bennaceur / Fumey-humbert / Mercier-Handisyde / Vasseur
// Version : 20.11.2017
//========================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function(req, res, query) {

	var page;
	var marqueurs;
	var marqueurs_board;
	var liste_membre;
	var liste_board;
	var contenu_fichier;
	var contenu_board;
	var i;
	var adv;

	contenu_fichier = fs.readFileSync("salon.json", 'utf-8');
	contenu_board = fs.readFileSync(query.pseudo + ".json", 'utf-8');
	liste_membre = JSON.parse(contenu_fichier);
	liste_board = JSON.parse(contenu_board);

	for(i = 0; i < liste_membre.length; i++){
		if(liste_membre[i].pseudo === query.pseudo){
			adv = liste_membre[i].adv;	
			liste_membre[i].statut = "passif"
		}
	}

	for(i = 0; i < liste_membre.length; i++){
		if(liste_membre[i].pseudo === adv){
			liste_membre[i].statut = "actif";
		}
	}

	marqueurs_board = {};
	for(var ligne = 0; ligne < 8; ligne++) {
		for(var colonne = 0; colonne < 8; colonne++) {
			marqueurs_board["sqr_" + ligne + ":" + colonne] = liste_board[ligne][colonne];
		}
	}
	page = page.supplant(marqueurs_board);
	
	contenu_fichier = JSON.stringify(liste_membre);
	fs.writeFileSync("salon.json", contenu_fichier,'utf-8');

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	marqueurs.adv 
		page = fs.readFileSync('res_passif.html', 'utf-8');

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;
