//========================================================
// Traitement de "req_choix"
// Auteur : Bennaceur / Fumey-humbert / Mercier-Handisyde / Vasseur
// Version : 20.11.2017
//========================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function(req, res, query) {

	var page;
	var marqueurs;

	page = fs.readFileSync('res_placement.html', 'utf-8');

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;
