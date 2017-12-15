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
	var adv;
	var pawn;
	var color;
	var marqueurs;
	var marqueurs_board;
	var contenu_board;
	var contenu_fichier;
	var contenu_image;
	var liste_membre;
	var liste_board;
	var liste_image;


	page = fs.readFileSync('res_placement.html', 'utf-8');
	
	contenu_fichier = fs.readFileSync("salon.json", 'utf-8');
	liste_membre = JSON.parse(contenu_fichier);
	
	contenu_image = fs.readFileSync("pieces.json", 'utf-8');
	liste_image = JSON.parse(contenu_image);

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
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

	marqueurs_board = {};
	for(var ligne = 0; ligne < 8; ligne++) {
		for(var colonne = 0; colonne < 8; colonne++) {
		
		pawn = liste_board[ligne][colonne];	
			
			if(color === "noir") {

				if(liste_board[ligne][colonne] === liste_board[ligne][colonne].toUpperCase() && liste_board[ligne][colonne] !== " ") {
					
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
						"<img src="+liste_image[pawn]+">";
				
				} else if(liste_board[ligne][colonne] === liste_board[ligne][colonne].toLowerCase() && liste_board[ligne][colonne] !== " ") {
					
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
						"<a href='req_placement?pseudo="+query.pseudo+"&x="+query.x+"&y="+query.y+"&x_new="+ligne+"&y_new="+colonne+"'><img src="+liste_image[pawn]+"></a>";
				
				} else if(liste_board[ligne][colonne] === " ") {
					
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
						"<a href='req_placement?pseudo="+query.pseudo+"&x="+query.x+"&y="+query.y+"&x_new="+ligne+"&y_new="+colonne+"'><img src="+liste_image[pawn]+"></a>";
				
				}

			} else if (color === "blanc") {

				if(liste_board[ligne][colonne] === liste_board[ligne][colonne].toUpperCase() && liste_board[ligne][colonne] !== " ") {
					
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
						"<a href='req_placement?pseudo="+query.pseudo+"&x="+query.x+"&y="+query.y+"&x_new="+ligne+"&y_new="+colonne+"'><img src="+liste_image[pawn]+"></a>";
				
				} else if(liste_board[ligne][colonne] === liste_board[ligne][colonne].toLowerCase() && liste_board[ligne][colonne] !== " ") {
					
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
						"<img src="+liste_image[pawn]+">";
				
				} else if(liste_board[ligne][colonne] === " ") {
					
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
						"<a href='req_placement?pseudo="+query.pseudo+"&x="+query.x+"&y="+query.y+"&x_new="+ligne+"&y_new="+colonne+"'><img src="+liste_image[pawn]+"></a>";
				
				}
			
			}
		}
	}
	page = page.supplant(marqueurs_board);

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;
