//===================================================
// Traitement de "req_retour_membre"
// Auteurs : Bennaceur / Fumey-Humbert / Mercier-Handisyde / Vasseur
// Version : Janvier 2018
//===================================================

"use strict";

var fs = require("fs");
var moment = require('moment');
require('remedial');

var req_retour_membre = function(req, res, query) {
	var marqueurs;
	var page;
	var contenu_fichier;
	var liste_membre;
	var i;
	var indisponible = "indisponible"
	
	//===== Récupération informations salon =====\\
	contenu_fichier = fs.readFileSync("salon.json", 'utf-8');
	liste_membre = JSON.parse(contenu_fichier);
	
	//==== Modification du statut de disponibilité ===//

	for(i = 0; i < liste_membre.length; i++){
		if(liste_membre[i].pseudo === query.pseudo){
			liste_membre[i].etat = indisponible;
			}
	}

	contenu_fichier = JSON.stringify(liste_membre);
	fs.writeFileSync("salon.json", contenu_fichier, 'utf-8');

	// AFFICHAGE DE LA PAGE D'ACCUEIL MEMBRE

	page = fs.readFileSync('res_accueil_membre.html', 'utf-8');

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	marqueurs.date = moment().format('LLL');
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();
};
//==================================================

module.exports = req_retour_membre;
