//=========================================================================
// Traitement de "req_retour_acceuil.js"
// Bennaceur / Fumey-Humbert / Mercier-Handisyde / Vasseur
// Version : 14.11.2017
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var contenu_membre;
	var liste_membre;
	var i;

	contenu_membre = fs.readFileSync("membres.json","UTF-8");
	liste_membre = JSON.parse(contenu_membre);

	for(i = 0; i < liste_membre.length; i++) {
		if(liste_membre[i].pseudo === query.pseudo) {
			liste_membre[i].statut = "false";
			contenu_membre = JSON.stringify(liste_membre);
			fs.writeFileSync("membres.json", contenu_membre, "UTF-8");
		}
	}

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('res_accueil.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
