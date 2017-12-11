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

	page = fs.readFileSync('res_placement.html', 'utf-8');
	contenu_board = fs.readFileSync(query.pseudo + ".json", 'utf-8');
	liste_board = JSON.parse(contenu_board);

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

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;
