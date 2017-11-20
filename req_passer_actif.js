//===================================================
// Traitement de "req_retour_membre"
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

	test = false;

	contenu_fichier = fs.readFileSync("salon.json", 'utf-8');
	liste_membre = JSON.parse(contenu_fichier);

	for(i = 0; i < liste_membre.length; i++){
		if(liste_membre[i].adv === query.pseudo && liste_membre[i].statut === "passif"){
			for(j = 0; j < liste_membre.length; j++){
				if(liste_membre[j].pseudo === query.pseudo){
					liste_membre[j].statut === "actif";
				}
			}
			test = true;
		}
	}

	if(test === true){
		page = fs.readFileSync('res_choix.html', 'utf-8');
	}else{
		page = fs.readFileSync('res_passif.html', 'utf-8');
	}

	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;
