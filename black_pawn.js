//============================================================================
// Mouvement pions noirs
// Auteurs : Bennaceur / Fumey-Humbert / Mercier-Handisyde / Vasseur
// Version : Janvier 2018
//============================================================================


"use strict";

var fs = require("fs");
require('remedial');

var black_pawn = function(req, res, query) {
	var h;
	var h_new2;
	var v;
	var h_new;
	var v_new;
	var v_new2;
	var page;
	var adv;
	var pawn;
	var marqueurs;
	var marqueurs_board;
	var contenu_board;
	var contenu_fichier;
	var tableau_initial;
	var contenu_image;
	var liste_membre;
	var liste_board;
	var liste_init;
	var liste_images;
	var l;
	var c;
	var check;

	page = fs.readFileSync('res_placement.html','utf-8');

	contenu_image = fs.readFileSync("pieces.json","utf-8");
	liste_images = JSON.parse(contenu_image);

	tableau_initial = fs.readFileSync("init_board.json","UTF-8");
	liste_init = JSON.parse(tableau_initial);

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;

	contenu_board = fs.readFileSync(query.pseudo +".json","UTF-8");
	liste_board = JSON.parse(contenu_board);

	if(liste_board[query.x][query.y] === liste_init[query.x][query.y]) {
		h = query.x;
		v = query.y;
		h_new = Number(h)+1;
		h_new2 = Number(h)+2;
		v_new = Number(v)+1;
		v_new2 = Number(v)-1;
		check = false;
		marqueurs_board = {};
		
		var horiz_coord = "ABCDEFGH";

		if (h_new < 8 && v_new < 8 && v_new2 >= 0) {
			var l = 7;
			for(var ligne = 0; ligne < 8; ligne ++) {
				var c = 7;
				for(var colonne = 0; colonne < 8; colonne ++) {
					marqueurs_board[colonne + 1] = String(8-colonne);
					marqueurs_board[horiz_coord[colonne]] = horiz_coord[7-colonne];
					pawn = liste_board[ligne][colonne];
					if (liste_board[h_new][v] === liste_board[ligne][colonne] && liste_board[h_new][v] === " ") {
						check = true;
						marqueurs_board["sqr_"+ l +":"+ c] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v +"'><img src="+ liste_images[pawn] +"></a>";
					} else if (check === true && liste_board[h_new2][v] === liste_board[ligne][colonne] && liste_board[h_new2][v] === " ") {
						marqueurs_board["sqr_"+ l +":"+ c] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new2 + "&y_new="+ v +"'><img src="+ liste_images[pawn] +"></a>";
					} else if (liste_board[h_new][v_new] === liste_board[ligne][colonne] && liste_board[h_new][v_new] === liste_board[h_new][v_new].toLowerCase()) {
						marqueurs_board["sqr_"+ l +":"+ c] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v_new +"'><img src="+ liste_images[pawn] +"></a>";
					} else if (liste_board[h_new][v_new2] === liste_board[ligne][colonne] && liste_board[h_new][v_new2] === liste_board[h_new][v_new2].toLowerCase()) {
						marqueurs_board["sqr_"+ l +":"+ c] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v_new2 +"'><img src="+ liste_images[pawn] +"></a>";
					} else {
						marqueurs_board["sqr_"+ l +":"+ c] = "<img src="+ liste_images[pawn] +"></a>";
					}
				}
				c--;
			}
			l--;
		}

		page = page.supplant(marqueurs_board);

		page = page.supplant(marqueurs);

		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(page);
		res.end();

	} else if (liste_board[query.x][query.y] !== liste_init[query.x][query.y]) {
		h = query.x;
		v = query.y;
		h_new = Number(h)+1;
		v_new = Number(v)+1;
		v_new2 = Number(v)-1;
		marqueurs_board = {};
		l = 7;
		var horiz_coord = "ABCDEFGH";

		if (v_new < 8 && v_new2 >= 0 && h_new < 8) {
			for(var ligne = 0; ligne < 8; ligne ++) {
				var c = 7;
				for(var colonne = 0; colonne < 8; colonne ++) {
					marqueurs_board[colonne + 1] = String(8-colonne);
					marqueurs_board[horiz_coord[colonne]] = horiz_coord[7-colonne];
					pawn = liste_board[ligne][colonne];
					if (liste_board[h_new][v] === liste_board[ligne][colonne] && liste_board[h_new][v] === " ") {
						marqueurs_board["sqr_"+ l +":"+ c] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v +"'><img src="+ liste_images[pawn] +"></a>";
					} else if (liste_board[h_new][v_new] === liste_board[ligne][colonne] && liste_board[h_new][v_new] === liste_board[h_new][v_new].toLowerCase()) {                    marqueurs_board["sqr_"+ l +":"+ c] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v_new +"'><img src="+ liste_images[pawn] +"></a>";
					} else if (liste_board[h_new][v_new2] === liste_board[ligne][colonne] && liste_board[h_new][v_new2] === liste_board[h_new][v_new2].toLowerCase()) {                 
						marqueurs_board["sqr_"+ l +":"+ c] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v_new2 +"'><img src="+ liste_images[pawn] +"></a>";
					} else {
						marqueurs_board["sqr_"+ l +":"+ c]= "<img src="+ liste_images[pawn] +"></a>";
					}
				}
				c--;
			}
			l--;

		}

		page = page.supplant(marqueurs_board);

		page = page.supplant(marqueurs);

		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(page);
		res.end();
	}

};

module.exports = black_pawn;
