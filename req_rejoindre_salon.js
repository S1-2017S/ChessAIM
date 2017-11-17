//==========================================================================
// Rejoindre le salon de jeu
// Bennaceur, Fumey-Humbert, Mercier-Handyside, Vasseur
// Version : 14/11/2017
//==========================================================================

"use strict";

var fs = require('fs');
var path = require('path');
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

	contenu_fichier = fs.readFileSync("salon.json", 'utf-8');
	liste_membre = JSON.parse(contenu_fichier);

	for(i = 0; i < liste_membre.length; i++){
		if(liste_membre[i].pseudo === query.pseudo){
			test = true;
			liste_membre[i].etat = disponible;
			contenu_fichier = JSON.stringify(liste_membre);
			fs.writeFileSync("salon.json", contenu_fichier, 'utf-8');
		}
	}
	console.log(test);
	if(test === false){
		nouveau_joueur = {};
		nouveau_joueur.pseudo = query.pseudo;
		nouveau_joueur.etat = disponible;
		liste_membre.push(nouveau_joueur);

		contenu_fichier = JSON.stringify(liste_membre);
		fs.writeFileSync("salon.json", contenu_fichier, 'utf-8');
	}
	page = fs.readFileSync('res_salon.html', 'UTF-8');


	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	marqueurs.date = query.date;
	marqueurs.astuce = query.astuce;


	page = page.supplant(marqueurs);

	res.writeHead(200,{'Content-type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = req_rejoindre_salon;
