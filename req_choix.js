//========================================================
// Traitement de "req_choix"
// Auteur : Bennaceur / Fumey-humbert / Mercier-Handisyde / Vasseur
// Version : 20.11.2017
//========================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function(req, res, query) {
	var h;
	var v;
	var h_new;
	var v_new;
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
	var liste_images;


	page = fs.readFileSync('res_placement.html', 'utf-8');

	contenu_fichier = fs.readFileSync("salon.json", 'utf-8');
	liste_membre = JSON.parse(contenu_fichier);

	contenu_image = fs.readFileSync("pieces.json", 'utf-8');
	liste_images = JSON.parse(contenu_image);

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
				contenu_board = fs.readFileSync(query.pseudo + ".json", 'utf-8');

			}

			liste_board = JSON.parse(contenu_board);
		}
	}

	var l = 7;
	var horiz_coord = "ABCDEFGH";

	marqueurs_board = {};
	for(var ligne = 0; ligne < 8; ligne++) {

		var c = 7;

		for(var colonne = 0; colonne < 8; colonne++) {

			pawn = liste_board[ligne][colonne];

			if(color === "noir") {
				marqueurs_board[colonne + 1] = String(8 - colonne);
				marqueurs_board[horiz_coord[colonne]] = horiz_coord[7 - colonne];
				h = query.x;
				v = query.y;

				if(liste_board[h][v] === "P") {
					console.log(h+v);
					h_new = Number(h)+1;
					console.log(liste_board[h][v]);
					console.log(liste_board[Number(h)+1][v]);
					if(liste_board[h_new][v] === " ") {
						console.log(h_new);
						console.log(v);
						pawn = liste_board[h_new][v];
						marqueurs_board["sqr_"+ h_new +":"+v] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v +"'><img src="+ liste_images[pawn] +"></a>";
					}
					v_new = Number(v)+1;
					if(liste_board[h_new][v_new] !== " " && liste_board[h_new][v_new] === liste_board[h_new][v_new].toLowerCase() && liste_board[h_new][v_new] === liste_board[h_new][v_new]) {
						pawn = liste_board[h_new][v_new];
						marqueurs_board["sqr_"+ h_new +":"+ v_new] = "<a href='req_placement?pseudo="+ query.pseudo + "&x=" + h +"&y="+ v +"&x_new="+ h_new +"&y_new="+ v_new +"'><img src="+ liste_images[pawn]+"></a>";

					}
					v_new = Number(v)-1;
					if(liste_board[h_new][v_new] !== " " && liste_board[h_new][v_new] === liste_board[h_new][v_new].toLowerCase() && liste_board[h_new][v_new]=== liste_board[ligne][colonne]) {
						pawn  = liste_board[h_new][v_new];
						marqueurs_board["sqr_"+ h_new +":"+ v_new] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new +"&y_new="+ v_new +"'><img src ="+ liste_images[pawn]+"></a>";
					}

				} else if (liste_board[ligne][colonne] === liste_board[ligne][colonne].toUpperCase() && liste_board[ligne][colonne] !== " ") {

					marqueurs_board["sqr_" + l + ":" + c] =
						"<img src="+liste_images[pawn]+">";
				

				} else if(liste_board[ligne][colonne] === liste_board[ligne][colonne].toLowerCase() && liste_board[ligne][colonne] !== " ") {

					marqueurs_board["sqr_" + l + ":" + c] =
						"<img src="+liste_images[pawn]+"></a>";
				
				} else if(liste_board[ligne][colonne] === " ") {

					marqueurs_board["sqr_" + l + ":" + c] =
						"<img src="+liste_images[pawn]+"></a>";


				}
			
			}else if (color === "blanc") {
				h = query.x;
				v = Number(query.y);
				marqueurs_board[colonne + 1] = String(colonne + 1);
				marqueurs_board[horiz_coord[colonne]] = horiz_coord[colonne];


				if(liste_board[ligne][colonne] === liste_board[h][v] && liste_board[h][v] === "p") {
					h_new = Number(h)-1;
					if(liste_board[h_new][v] === " ") {
						pawn = liste_board[h_new][v];
						marqueurs_board["sqr_"+ h_new +":"+ v] = "<a href='req_placement?pseudo="+ query.pseudo +"&x="+ h +"&y="+ v +"&x_new="+ h_new+"&y_new="+ v+"'><img src="+ liste_images[pawn] +"></a>";

					}
					v_new = Number(v)+1;
					if(liste_board[h_new][v_new] !== " " && liste_board[h_new][v_new] === liste_board[h_new][v_new].toUpperCase()) {
						pawn = liste_board[h_new][v_new];
						marqueurs_board["sqr_"+ h_new+":"+ v_new] = "<a href='req_placement?pseudo="+ query.pseudo +"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v_new+"'><img src="+ liste_images[pawn] +"></a>";
					}
					v_new = Number(v)-1;
					if(liste_board[h_new][v_new] !== " " && liste_board[h_new][v_new] === liste_board[h_new][v_new].toUpperCase()) {
						pawn = liste_board[h_new][v_new];
						marqueurs_board["sqr_"+ h_new +":"+ v_new] = "<a href='req_placement?pseudo="+ query.pseudo +"&x="+ h +"&y="+ v +"&x_new="+ h_new +"&y_new="+ v_new+"'><img src="+ liste_images[pawn] +"></a>";
					}

				} else if (liste_board[ligne][colonne] === liste_board[ligne][colonne].toUpperCase() && liste_board[ligne][colonne] !== " ") {

					marqueurs_board["sqr_" + ligne + ":" + colonne] =
						"<img src="+liste_images[pawn]+"></a>";

				} else if(liste_board[ligne][colonne] === liste_board[ligne][colonne].toLowerCase() && liste_board[ligne][colonne] !== " ") {

					marqueurs_board["sqr_" + ligne + ":" + colonne] =
						"<img src="+liste_images[pawn]+">";

				} else if(liste_board[ligne][colonne] === " ") {

					marqueurs_board["sqr_" + ligne + ":" + colonne] =
						"<img src="+liste_images[pawn]+"></a>";

				}
			}
			c--;
		}
		l--;
	}
	page = page.supplant(marqueurs_board);

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;






