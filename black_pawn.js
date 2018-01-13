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
	var board;

	page = fs.readFileSync('res_placement_noir.html','utf-8');

	contenu_image = fs.readFileSync("pieces.json","utf-8");
	liste_images = JSON.parse(contenu_image);
	
	tableau_initial = fs.readFileSync("init_board.json","UTF-8");
	liste_init = JSON.parse(tableau_initial);

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	board = query.pseudo;
	contenu_board = fs.readFileSync(board +".json","UTF-8");
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
		console.log(liste_board.length);
		var horiz_coord = "ABCDEFGH";
		for(var ligne = 0; ligne < 8; ligne ++) {
			for(var colonne = 0; colonne < 8; colonne ++) {
				marqueurs_board[colonne + 1] = String(8-colonne);
				marqueurs_board[horiz_coord[colonne]] = horiz_coord[7-colonne];
				if (h_new <= 7) {
					if ( liste_board[ligne][colonne] === liste_board[h_new][v] &&liste_board[h_new][v] === " ") {

						check = true;
						pawn = liste_board[h_new][v];
						marqueurs_board["sqr_"+ h_new +":"+ v] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v +"'><img src="+ liste_images[pawn] +"></a>";

						if (check === true && liste_board[h_new2][v] === " ") {

							pawn = liste_board[h_new][v];
							marqueurs_board["sqr_"+ h_new2 +":"+ v] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new2 + "&y_new="+ v +"'><img src="+ liste_images[pawn] +"></a>";

						}

					}
				}

				if (h_new <= 7 && v_new < 8) {
					if (liste_board[h_new][v_new] === liste_board[ligne][colonne].toLowerCase() && liste_board[h_new][v_new] !== " ") {

						pawn = liste_board[h_new][v_new];
						marqueurs_board["sqr_"+ h_new +":"+ v_new] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v_new +"'><img src="+ liste_images[pawn] +"></a>";

					}
				}

				if (h_new <= 7 && v_new2 >= 0) {
					if (liste_board[h_new][v_new2] === liste_board[ligne][colonne].toLowerCase() && liste_board[h_new][v_new2] !== " ") {

						pawn = liste_board[h_new][v_new2];
						marqueurs_board["sqr_"+ h_new +":"+ v_new2] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v_new2 +"'><img src="+ liste_images[pawn] +"></a>";
					}
				}

				if (liste_board[ligne][colonne] === liste_board[query.x][query.y]) {

					pawn = liste_board[ligne][colonne];
					marqueurs_board["sqr_"+ ligne + ":"+ colonne] = "<img src="+ liste_images[pawn] +"></a>";

				}

				if (liste_board[ligne][colonne] === " ") {

					pawn = liste_board[ligne][colonne];
					marqueurs_board["sqr_"+ ligne + ":"+ colonne] = "<img src="+ liste_images[pawn] +"></a>";
				}

				else {

					pawn = liste_board[ligne][colonne];
					marqueurs_board["sqr_"+ ligne + ":"+ colonne] = "<img src="+ liste_images[pawn] +"></a>";

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

		var horiz_coord = "ABCDEFGH";

		marqueurs_board = {};
		for(var ligne = 0; ligne < 8; ligne ++) {

			for(var colonne = 0; colonne < 8; colonne++) {
				marqueurs_board[colonne + 1] = String(8-colonne);
				marqueurs_board[horiz_coord[colonne]] = horiz_coord[7-colonne];



				if(h_new < 8) {
					if ( liste_board[ligne][colonne] === liste_board[h_new][v] &&liste_board[h_new][v] === " ") {

						pawn = liste_board[h_new][v];
						marqueurs_board["sqr_"+ h_new +":"+ v] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v +"'><img src="+ liste_images[pawn] +"></a>";

					}
				}

				if (h_new < 8 && v_new < 8) {
					if (liste_board[h_new][v_new] === liste_board[ligne][colonne].toLowerCase() && liste_board[h_new][v_new] !== " ") {

						pawn = liste_board[h_new][v_new];
						marqueurs_board["sqr_"+ h_new +":"+ v_new] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v_new +"'><img src="+ liste_images[pawn] +"></a>";

					}
				}

				if (h_new <= 7 && v_new2 >= 0) {
					if (liste_board[ligne][colonne] === liste_board[h_new][v_new2].toLowerCase() && liste_board[h_new][v_new2] !== " ") {

						pawn = liste_board[h_new][v_new2];
						marqueurs_board["sqr_"+ h_new +":"+ v_new2] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v_new2 +"'><img src="+ liste_images[pawn] +"></a>";
					}
				}

				if (liste_board[ligne][colonne] === liste_board[query.x][query.y]) {

					pawn = liste_board[ligne][colonne];
					marqueurs_board["sqr_"+ ligne + ":"+ colonne] = "<img src="+ liste_images[pawn] +"></a>";

				}

				if (liste_board[ligne][colonne] === " ") {

					pawn = liste_board[ligne][colonne];
					marqueurs_board["sqr_"+ ligne + ":"+ colonne] = "<img src="+ liste_images[pawn] +"></a>";
				}

				else {

					pawn = liste_board[ligne][colonne];
					marqueurs_board["sqr_"+ ligne + ":"+ colonne] = "<img src="+ liste_images[pawn] +"></a>";

				}

			}
		}
		page = page.supplant(marqueurs);
		page = page.supplant(marqueurs_board);

		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(page);
		res.end();
	}


};

module.exports = black_pawn;
