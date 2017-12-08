//========================================================
// Traitement de "req_choix"
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
	var contenu_board;
	var liste_board;

	contenu_board = fs.readFileSync(query.pseudo + ".json", 'utf-8');
	liste_board = JSON.parse(contenu_board);

	marqueurs_board = {};
	for(var ligne = 0; ligne < 8; ligne++) {
		for(var colonne = 0; colonne < 8; colonne++) {
			marqueurs_board["sqr_" + ligne + ":" + colonne] = liste_board[ligne][colonne];
		}
	}
	page = page.supplant(marqueurs_board);

	page = fs.readFileSync('res_placement.html', 'utf-8');

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;
