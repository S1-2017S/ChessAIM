//==========================================================================
// Rejoindre le salon de jeu
// Bennaceur, Fumey-Humbert, Mercier-Handyside, Vasseur
// Version : 14/11/2017
//==========================================================================

"use strict";

var fs = require('fs');
var path = require('path');
var moment = require('moment');
require('remedial');

var req_rejoindre_salon = function(req,res,query) {

	var marqueurs;
	var page;
	var contenu_fichier;
	var liste_membre;
	var disponible = "disponible";
	var nouveau_joueur;
	var test;
	var i;

	test = false;
	//======= Récupération des informatons du lobby ===========\\
	contenu_fichier = fs.readFileSync("salon.json", 'utf-8');
	liste_membre = JSON.parse(contenu_fichier);

	//======== Premier cas, le joueur est déjà dans le salon ==========\\

	for(i = 0; i < liste_membre.length; i++){
		if(liste_membre[i].pseudo === query.pseudo){
			test = true;
			liste_membre[i].etat = disponible;
			contenu_fichier = JSON.stringify(liste_membre);
			fs.writeFileSync("salon.json", contenu_fichier, 'utf-8');
		}
	}

	//========= Second cas, le joueur n'y était pas ==========\\
	if(test === false){
		nouveau_joueur = {};
		nouveau_joueur.pseudo = query.pseudo;
		nouveau_joueur.etat = disponible;
		nouveau_joueur.adv = "non";
		liste_membre.push(nouveau_joueur);

		contenu_fichier = JSON.stringify(liste_membre);
		fs.writeFileSync("salon.json", contenu_fichier, 'utf-8');
	}
	page = fs.readFileSync('res_salon.html', 'UTF-8');

	liste = "";
	for (i = 0; i < liste_membre.length; i++) {

		if (liste_membre[i].pseudo !== query.pseudo && liste_membre[i].etat === "disponible") {
			liste += "<form action='/req_commencer_passif' method='GET'><input type ='hidden' name='pseudo' value='"+ query.pseudo +"'><input type ='hidden' name ='adv' value='"+ liste_membre[i].pseudo +"'><button class='button1' name='action' value=''>" + liste_membre[i].pseudo + "</button></form>";
		}

	}

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	marqueurs.date = moment().format('LLL');;
	marqueurs.astuce = query.astuce;
	marqueurs.joueurs = liste;


	page = page.supplant(marqueurs);

	res.writeHead(200,{'Content-type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = req_rejoindre_salon;
