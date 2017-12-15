//===================================================
// Traitement de "req_passer_actif"
//===================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function(req, res, query) {
	var page;
	var color;
	var adv;
	var pawn;
	var contenu_fichier;
	var contenu_board;
	var contenu_image;
	var liste_membre;
	var liste_board;
	var liste_image;
	var i;
	var test;
	var j;
	var marqueurs;
	var marqueurs_board;

	test = "a";


	contenu_fichier = fs.readFileSync("salon.json", 'utf-8');
	liste_membre = JSON.parse(contenu_fichier);

	contenu_image = fs.readFileSync("pieces.json", 'utf-8');
	liste_image = JSON.parse(contenu_image);

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	for(i = 0; i < liste_membre.length; i++){
		if(liste_membre[i].pseudo === query.pseudo){
			adv = liste_membre[i].adv;
			if(liste_membre[i].statut === "actif"){
				test = "b"
			}else if(liste_membre[i].adv === ""){
				test = "c"
			}
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

	
	if(test === "c"){
		page = fs.readFileSync('res_fin.html', 'utf-8');
	}else if(test === "b"){
		marqueurs_board = {};
		page = fs.readFileSync('res_choix.html', 'utf-8');

		var l = 7;

		for(var ligne = 0; ligne < 8; ligne++) {
		
			var c = 7;

			for(var colonne = 0; colonne < 8; colonne++) {
		
				pawn = liste_board[ligne][colonne];

				if(color === "noir") {

					if(liste_board[ligne][colonne] === liste_board[ligne][colonne].toUpperCase() && liste_board[ligne][colonne] !== " ") {
						
						marqueurs_board["sqr_" + l + ":" + c] = 
							"<a href='req_choix?pseudo="+query.pseudo+"&x="+ligne+"&y="+colonne+"'><img src="+liste_image[pawn]+"></a>";
					
					} else if(liste_board[ligne][colonne] === liste_board[ligne][colonne].toLowerCase() && liste_board[ligne][colonne] !== " ") {
						
						marqueurs_board["sqr_" + l + ":" + c] = 
							"<img src="+liste_image[pawn]+">";
					
					} else if(liste_board[ligne][colonne] === " ") {
						
						marqueurs_board["sqr_" + l + ":" + c] = 
							"<img src="+liste_image[pawn]+">";
					
					}

				} else if (color === "blanc") {

					if(liste_board[ligne][colonne] === liste_board[ligne][colonne].toUpperCase() && liste_board[ligne][colonne] !== " ") {
						
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<img src="+liste_image[pawn]+">";
					
					} else if(liste_board[ligne][colonne] === liste_board[ligne][colonne].toLowerCase() && liste_board[ligne][colonne] !== " ") {
						
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<a href='req_choix?pseudo="+query.pseudo+"&x="+ligne+"&y="+colonne+"'><img src="+liste_image[pawn]+"></a>";
					
					} else if(liste_board[ligne][colonne] === " ") {
						
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<img src="+liste_image[pawn]+">";
					
					}
				
				}
				c--;
			}
			l--;
		}
		page = page.supplant(marqueurs_board);


	}else{
		page = fs.readFileSync('res_passif.html', 'utf-8');
		marqueurs_board = {};

		var l = 7;

		for(var ligne = 0; ligne < 8; ligne++) {

			var c = 7;

			for(var colonne = 0; colonne < 8; colonne++) {
				
				pawn = liste_board[ligne][colonne];

				if(color === "blanc") {
					
					marqueurs_board["sqr_" + ligne + ":" + colonne] = "<img src="+liste_image[pawn]+">";
				} else if(color === "noir") {
					
					marqueurs_board["sqr_" + l + ":" + c] = "<img src="+liste_image[pawn]+">";
				}
				c--;
			}
			l--;
		}
		page = page.supplant(marqueurs_board);
	}

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;
