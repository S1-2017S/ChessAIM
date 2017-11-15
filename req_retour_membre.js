//===================================================
// Traitement de "req_retour_membre"
//===================================================

"use strict";

var fs = require("fs");
require('remedial');

var req_retour_membre = function(req, res, query) {
	var marqueurs;
	var page;

	// AFFICHAGE DE LA PAGE D'ACCUEIL MEMBRE

	page = fs.readFileSync('res_accueil_membre.html', 'utf-8');

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	marqueurs.date = "";
	marqueurs.heure = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();
};
//==================================================

module.exports = req_retour_membre;
