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
	var contenu_fichier;
	var contenu_board;
	var liste_membre;
	var liste_board;
	var i;
	var test;
	var j;
	var marqueurs;
	var marqueurs_board;

	test = "a";


	contenu_fichier = fs.readFileSync("salon.json", 'utf-8');
	liste_membre = JSON.parse(contenu_fichier);

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
				contenu_board = fs.readFileSync(query.pseudo + ".json", 'utf-8');
				liste_board = JSON.parse(contenu_board);
			} else if(liste_membre[i].color === "noir") {
				color = "noir";
				contenu_board = fs.readFileSync(adv + ".json", 'utf-8');
				liste_board = JSON.parse(contenu_board);
			}
		}
	}

	
	if(test === "c"){
		page = fs.readFileSync('res_fin.html', 'utf-8');
	}else if(test === "b"){
		marqueurs_board = {};
		page = fs.readFileSync('res_choix.html', 'utf-8');
		for(var ligne = 0; ligne < 8; ligne++) {
			for(var colonne = 0; colonne < 8; colonne++) {
				if(color === "blanc") {
					if(liste_board[ligne][colonne] === "R") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<img src='rookB.png'>";
					} else if(liste_board[ligne][colonne] === "N") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<img src='knightB.png'>";
					} else if(liste_board[ligne][colonne] === "B") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<img src='bishopB.png'>";
					} else if(liste_board[ligne][colonne] === "Q") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<img src='queenB.png'>";
					} else if(liste_board[ligne][colonne] === "K") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<img src='kingB.png'>";
					} else if(liste_board[ligne][colonne] === "P") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<img src='pawnB.png'>";
					} else if(liste_board[ligne][colonne] === "r") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<a href='req_choix?pseudo="+query.pseudo+"&x="+ligne+"&y="+colonne+"'><img src='rookW.png'></a>";
					} else if(liste_board[ligne][colonne] === "n") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<a href='req_choix?pseudo="+query.pseudo+"&x="+ligne+"&y="+colonne+"'><img src='knightW.png'></a>";
					} else if(liste_board[ligne][colonne] === "b") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<a href='req_choix?pseudo="+query.pseudo+"&x="+ligne+"&y="+colonne+"'><img src='bishopW.png'></a>";
					} else if(liste_board[ligne][colonne] === "q") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<a href='req_choix?pseudo="+query.pseudo+"&x="+ligne+"&y="+colonne+"'><img src='queenW.png'></a>";
					} else if(liste_board[ligne][colonne] === "k") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<a href='req_choix?pseudo="+query.pseudo+"&x="+ligne+"&y="+colonne+"'><img src='kingW.png'></a>";
					} else if(liste_board[ligne][colonne] === "p") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<a href='req_choix?pseudo="+query.pseudo+"&x="+ligne+"&y="+colonne+"'><img src='pawnW.png'></a>";
					} else if(liste_board[ligne][colonne] === " ") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<img src='vide.png'>";
					} 
				} else if(color === "noir") {
					if(liste_board[ligne][colonne] === "R") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<a href='req_choix?pseudo="+query.pseudo+"&x="+ligne+"&y="+colonne+"'><img src='rookB.png'></a>";
					} else if(liste_board[ligne][colonne] === "N") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<a href='req_choix?pseudo="+query.pseudo+"&x="+ligne+"&y="+colonne+"'><img src='knightB.png'></a>";
					} else if(liste_board[ligne][colonne] === "B") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<a href='req_choix?pseudo="+query.pseudo+"&x="+ligne+"&y="+colonne+"'><img src='bishopB.png'></a>";
					} else if(liste_board[ligne][colonne] === "Q") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<a href='req_choix?pseudo="+query.pseudo+"&x="+ligne+"&y="+colonne+"'><img src='queenB.png'></a>";
					} else if(liste_board[ligne][colonne] === "K") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<a href='req_choix?pseudo="+query.pseudo+"&x="+ligne+"&y="+colonne+"'><img src='kingB.png'></a>";
					} else if(liste_board[ligne][colonne] === "P") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<a href='req_choix?pseudo="+query.pseudo+"&x="+ligne+"&y="+colonne+"'><img src='pawnB.png'></a>";
					} else if(liste_board[ligne][colonne] === "r") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<img src='rookW.png'>";
					} else if(liste_board[ligne][colonne] === "n") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<img src='knightW.png'>";
					} else if(liste_board[ligne][colonne] === "b") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<img src='bishopW.png'>";
					} else if(liste_board[ligne][colonne] === "q") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<img src='queenW.png'>";
					} else if(liste_board[ligne][colonne] === "k") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<img src='kingW.png'>";
					} else if(liste_board[ligne][colonne] === "p") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<img src='pawnW.png'>";
					} else if(liste_board[ligne][colonne] === " ") {
						marqueurs_board["sqr_" + ligne + ":" + colonne] = 
							"<img src='vide.png'>";
					} 
				}
			}
		}
		page = page.supplant(marqueurs_board);


	}else{
		page = fs.readFileSync('res_passif.html', 'utf-8');
		marqueurs_board = {};
		for(var ligne = 0; ligne < 8; ligne++) {
			for(var colonne = 0; colonne < 8; colonne++) {

				if(liste_board[ligne][colonne] === "R") {
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
					"<img src='rookB.png'>";
				} else if(liste_board[ligne][colonne] === "N") {
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
					"<img src='knightB.png'>";
				} else if(liste_board[ligne][colonne] === "B") {
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
					"<img src='bishopB.png'>";
				} else if(liste_board[ligne][colonne] === "Q") {
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
					"<img src='queenB.png'>";
				} else if(liste_board[ligne][colonne] === "K") {
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
					"<img src='kingB.png'>";
				} else if(liste_board[ligne][colonne] === "P") {
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
					"<img src='pawnB.png'>";
				} else if(liste_board[ligne][colonne] === "r") {
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
					"<img src='rookW.png'>";
				} else if(liste_board[ligne][colonne] === "n") {
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
					"<img src='knightW.png'>";
				} else if(liste_board[ligne][colonne] === "b") {
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
					"<img src='bishopW.png'>";
				} else if(liste_board[ligne][colonne] === "q") {
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
					"<img src='queenW.png'>";
				} else if(liste_board[ligne][colonne] === "k") {
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
					"<img src='kingW.png'>";
				} else if(liste_board[ligne][colonne] === "p") {
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
					"<img src='pawnW.png'>";
				} else if(liste_board[ligne][colonne] === " ") {
					marqueurs_board["sqr_" + ligne + ":" + colonne] = 
					"<img src='vide.png'>";
				}
			}
		}
		page = page.supplant(marqueurs_board);
	}

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;
