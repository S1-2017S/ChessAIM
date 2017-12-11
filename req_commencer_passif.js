// =============================================================================
// Traitement de req_commencer_passif
// Bennaceur / Fumey-Humbert / Mercier-Handisyde / Vasseur
// Version : 20.11.2017
// =============================================================================

"use strict";

var fs = require("fs");
require("remedial");

var trait = function(req, res, query) {
	var page; 
	var contenu_fichier;
	var contenu_board;
	var liste_membre;
	var liste_board;
	var i;
	var marqueurs;
	var marqueurs_board;

	contenu_fichier = fs.readFileSync("salon.json", "UTF-8");
	contenu_board = fs.readFileSync(query.adv + ".json", 'utf-8');
	liste_membre = JSON.parse(contenu_fichier);
	liste_board = JSON.parse(contenu_board);

	for (i = 0; i < liste_membre.length; i++) {
		if (liste_membre[i].pseudo === query.pseudo) {
			liste_membre[i].adv = query.adv;
			liste_membre[i].etat = "indisponible";
			liste_membre[i].statut = "passif";
			contenu_fichier = JSON.stringify(liste_membre);
			fs.writeFileSync("salon.json", contenu_fichier, "UTF-8");
			marqueurs = {};
			marqueurs.pseudo = query.pseudo;
		}
	}
	page = fs.readFileSync('res_passif.html', 'UTF-8');

	marqueurs_board = {};
	for(var ligne = 0; ligne < 8; ligne++) {
		for(var colonne = 0; colonne < 8; colonne++) {
			
			if(liste_board[ligne][colonne] === "R") {
				marqueurs_board["sqr_" + ligne + ":" + colonne] = "rookB.png";
			} else if(liste_board[ligne][colonne] === "N") {
				marqueurs_board["sqr_" + ligne + ":" + colonne] = "knightB.png";
			} else if(liste_board[ligne][colonne] === "B") {
				marqueurs_board["sqr_" + ligne + ":" + colonne] = "bishopB.png";
			} else if(liste_board[ligne][colonne] === "Q") {
				marqueurs_board["sqr_" + ligne + ":" + colonne] = "queenB.png";
			} else if(liste_board[ligne][colonne] === "K") {
				marqueurs_board["sqr_" + ligne + ":" + colonne] = "kingB.png";
			} else if(liste_board[ligne][colonne] === "P") {
				marqueurs_board["sqr_" + ligne + ":" + colonne] = "pawnB.png";
			} else if(liste_board[ligne][colonne] === "r") {
				marqueurs_board["sqr_" + ligne + ":" + colonne] = "rookW.png";
			} else if(liste_board[ligne][colonne] === "n") {
				marqueurs_board["sqr_" + ligne + ":" + colonne] = "knightW.png";
			} else if(liste_board[ligne][colonne] === "b") {
				marqueurs_board["sqr_" + ligne + ":" + colonne] = "bishopW.png";
			} else if(liste_board[ligne][colonne] === "q") {
				marqueurs_board["sqr_" + ligne + ":" + colonne] = "queenW.png";
			} else if(liste_board[ligne][colonne] === "k") {
				marqueurs_board["sqr_" + ligne + ":" + colonne] = "kingW.png";
			} else if(liste_board[ligne][colonne] === "p") {
				marqueurs_board["sqr_" + ligne + ":" + colonne] = "pawnW.png";
			} else if(liste_board[ligne][colonne] === " ") {
				marqueurs_board["sqr_" + ligne + ":" + colonne] = "vide.png";
			}
		}
	}
	page = page.supplant(marqueurs_board);

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();
};

// =============================================================================

module.exports = trait;


