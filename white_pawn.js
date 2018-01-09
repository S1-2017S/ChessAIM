//===========================================================================
// Déplacement + affichage pions blancs
// Auteurs : Bennaceur / Fumey-Humbert / Mercier-Handisyde / Vasseur
// Version : Janvier 2018
//===========================================================================


"use strict";

var fs = require("fs");
require('remedial');

var white_pawn = function(req, res, query) {
	var h;
	var h_new2;
	var i;
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


	//============ Récupération des informations de jeu ================\\
	page = fs.readFileSync('res_placement.html','utf-8');

	contenu_fichier = fs.readFileSync("salon.json","UTF-8");
	liste_membre = JSON.parse(contenu_fichier);

	contenu_image = fs.readFileSync("pieces.json","utf-8");
	liste_images = JSON.parse(contenu_image);

	tableau_initial = fs.readFileSync("init_board.json","UTF-8");
	liste_init = JSON.parse(tableau_initial);

	for (i = 0; i < liste_membre.length; i++) {
		if (liste_membre[i].pseudo === query.pseudo) {
			adv = liste_membre[i].adv;
		}
	}

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;

	contenu_board = fs.readFileSync(adv +".json","UTF-8");
	liste_board = JSON.parse(contenu_board);


	//======== Différenciation des cas entre pion déjà et jamais joué =======\\

	if(liste_board[query.x][query.y] === liste_init[query.x][query.y]) {
		h = query.x;
		v = query.y;
		h_new = Number(h)-1;
		h_new2 = Number(h)-2;
		v_new = Number(v)+1;
		v_new2 = Number(v)-1;
		check = false;


		marqueurs_board = {};

		//======= Génération des liens cliquables, avec affichage du plateau ========\\

		var horiz_coord = "ABCDEFGH";

		var l = 7;

		for(var ligne = 0; ligne < 8; ligne ++) {

			var c = 7;

			for(var colonne = 0; colonne < 8; colonne ++) {

				marqueurs_board[colonne + 1] = String(colonne +1);
				marqueurs_board[horiz_coord[colonne]] = horiz_coord[colonne];

				if (h_new >= 0) {
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

				if (h_new >= 0 && v_new < 8) {
					if (liste_board[h_new][v_new] === liste_board[ligne][colonne].toUpperCase() && liste_board[h_new][v_new] !== " ") {

						pawn = liste_board[h_new][v_new];
						marqueurs_board["sqr_"+ h_new +":"+ v_new] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v_new +"'><img src="+ liste_images[pawn] +"></a>";

					} 
				}

				if (h_new >= 0 && v_new >= 0) {
					if (liste_board[h_new][v_new2] === liste_board[ligne][colonne].toUpperCase() && liste_board[h_new][v_new2] !== " ") {

						pawn = liste_board[h_new][v_new2];
						marqueurs_board["sqr_"+ h_new +":"+ v_new2] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v_new2 +"'><img src="+ liste_images[pawn] +"></a>";
					} 
				}

				if (liste_board[ligne][colonne] === liste_board[query.x][query.y]) {

					pawn = liste_board[ligne][colonne];
					marqueurs_board["sqr_"+ ligne + ":"+colonne] = "<img src="+ liste_images[pawn] +"></a>";

				}

				if (liste_board[ligne][colonne] === " ") {

					pawn = liste_board[ligne][colonne];
					marqueurs_board["sqr_"+ ligne + ":"+colonne] = "<img src="+ liste_images[pawn] +"></a>";
				}

				else {

					pawn = liste_board[ligne][colonne];
					marqueurs_board["sqr_"+ ligne + ":"+colonne] = "<img src="+ liste_images[pawn] +"></a>";

				}
			}
			c--;
		}
		l--;


		page = page.supplant(marqueurs_board);

		page = page.supplant(marqueurs);

		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(page);
		res.end();

		//================ Cas où un pion à déjà été joué ======================\\

	} else if (liste_board[query.x][query.y] !== liste_init[query.x][query.y]) {

		h = query.x;
		v = query.y;
		h_new = Number(h)-1;
		v_new = Number(v)+1;
		v_new2 = Number(v)-1;

		marqueurs_board = {};
		var horiz_coord = "ABCDEFGH";


		var l = 7;

		for(var ligne = 0; ligne < 8; ligne ++) {

			var c = 7;

			for(var colonne = 0; colonne < 8; colonne ++) {

				marqueurs_board[colonne + 1] = String(colonne +1);
				marqueurs_board[horiz_coord[colonne]] = horiz_coord[colonne];

				if ( liste_board[ligne][colonne] === liste_board[h_new][v] && liste_board[h_new][v] === " ") {

					pawn = liste_board[h_new][v];
					marqueurs_board["sqr_"+ h_new +":"+ v] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v +"'><img src="+ liste_images[pawn] +"></a>";

				}


				if (h_new >= 0 && v_new < 8) {
					if (liste_board[h_new][v_new] === liste_board[ligne][colonne].toUpperCase() && liste_board[h_new][v_new] !== " ") {

						pawn = liste_board[h_new][v_new];
						marqueurs_board["sqr_"+ h_new +":"+ v_new] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v_new +"'><img src="+ liste_images[pawn] +"></a>";

					}
				}

				if (h_new >= 0 && v_new >= 0) {
					if (liste_board[h_new][v_new2] === liste_board[ligne][colonne].toUpperCase() && liste_board[h_new][v_new2] !== " ") {

						pawn = liste_board[h_new][v_new2];
						marqueurs_board["sqr_"+ h_new +":"+ v_new2] = "<a href='req_placement?pseudo="+query.pseudo+"&x="+ h +"&y="+ v +"&x_new="+ h_new + "&y_new="+ v_new2 +"'><img src="+ liste_images[pawn] +"></a>";
					}
				}

				if (liste_board[ligne][colonne] === liste_board[query.x][query.y]) {

					pawn = liste_board[ligne][colonne];
					marqueurs_board["sqr_"+ ligne + ":"+colonne] = "<img src="+ liste_images[pawn] +"></a>";

				}


				if (liste_board[ligne][colonne] === " ") {

					pawn = liste_board[ligne][colonne];
					marqueurs_board["sqr_"+ ligne + ":"+colonne] = "<img src="+ liste_images[pawn] +"></a>";
				}

				else {

					pawn = liste_board[ligne][colonne];
					marqueurs_board["sqr_"+ ligne + ":"+colonne] = "<img src="+ liste_images[pawn] +"></a>";

				}
			}
			c--;
		}
		l--;

	

	page = page.supplant(marqueurs_board);

	page = page.supplant(marqueurs);

	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(page);
	res.end();
	}

};

module.exports = white_pawn;
