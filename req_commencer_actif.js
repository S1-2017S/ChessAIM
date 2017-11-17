//==================================================================================
//requete req_commencer_actif
// Fumey-Humbert / Mercier-Handisyde / Banesseur / Vasseur
//===================================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function(req, res, query) {
	var marqueurs;
	var page;
	var contenu_fichier;
	var liste_membre;
	var i;
	var liste;

	contenu_fichier = fs.readFileSync("salon.json", 'utf-8');
	liste_membre = JSON.parse(contenu_fichier);

	var liste = "";
	for (i = 0; i < liste_membre.length; i++) {
		if (liste_membre[i].pseudo !== query.pseudo && liste_membre[i].etat === "disponible") {
			liste += "<a href=./req_commencer_actif?pseudo=" + query.pseudo + "&adv=" + liste_membre[i].pseudo + ">" + liste_membre[i].pseudo + "</a>";
			liste += "<br>";
	
		}

	}

	page = fs.readFileSync('res_salon.html','utf-8');

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	marqueurs.joueurs = liste;
	marqueurs.date = "";
	marqueurs.heure = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();
};
//==================================================

module.exports = trait;




