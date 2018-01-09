//========================================================
// Traitement de "req_choix"
// Auteur : Bennaceur / Fumey-humbert / Mercier-Handisyde / Vasseur
// Version : 20.11.2017
//========================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function(req, res, query) {
	var adv;
	var color;
	var contenu_board;
	var contenu_fichier;
	var liste_membre;
	var liste_board;
	var move_black_pawn = require("./black_pawn.js");
	var move_white_pawn = require("./white_pawn.js");
	var resultat;

	contenu_fichier = fs.readFileSync("salon.json", 'utf-8');
	liste_membre = JSON.parse(contenu_fichier);


	for(var i = 0; i < liste_membre.length; i++){
		if(liste_membre[i].pseudo === query.pseudo){

			adv = liste_membre[i].adv;

			if(liste_membre[i].color === "blanc") {

				color = "blanc";
				contenu_board = fs.readFileSync(adv + ".json", 'utf-8');

			} else if(liste_membre[i].color === "noir") {

				color = "noir";
				contenu_board = fs.readFileSync(query.pseudo + ".json", 'utf-8');

			}

			liste_board = JSON.parse(contenu_board);
		}
	}

	if (liste_board[query.x][query.y] === "P") {
	 	resultat = move_black_pawn(req,res,query);
	} else if (liste_board[query.x][query.y] === "p") {
		resultat = move_white_pawn(req,res,query);
	}
};

module.exports = trait;






