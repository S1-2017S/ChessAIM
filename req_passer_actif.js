//===================================================
// Traitement de "req_passer_actif"
//===================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function(req, res, query) {
	var page;
	var contenu_fichier;
	var liste_membre;
	var i;
	var test;
	var j;
	var marqueurs;

	test = false;

	contenu_fichier = fs.readFileSync("salon.json", 'utf-8');
	liste_membre = JSON.parse(contenu_fichier);

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	for(i = 0; i < liste_membre.length; i++){
		if(liste_membre[i].pseudo === query.pseudo){
				if(liste_membre[i].statut === "actif"){
					test = true;
				}
		}
	}

	if(test === true){
		page = fs.readFileSync('res_choix.html', 'utf-8');
	}else{
		page = fs.readFileSync('res_passif.html', 'utf-8');
	}

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;
