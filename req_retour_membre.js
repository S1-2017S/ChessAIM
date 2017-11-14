//===================================================
// Traitement de "req_retour_membre"
//===================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function(req, res, query) {
	var marqueurs;
	var page;

	// AFFICHAGE DE LA PAGE D'ACCUEIL MEMBRE

	page = fs.readFileSync('res_accueil-membre.html', 'utf-8');

	marqueurs = {};
	marqueurs.pseudo = "";
	marqueurs.date = "";
	marqueurs.heure = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();
};
//==================================================

module.exports = trait;
