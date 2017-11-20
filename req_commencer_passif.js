// =============================================================================// Traitement de req_commencer_passif
// Bennaceur / Fumey-Humbert / Mercier-Handisyde / Vasseur
// Version : 20.11.2017
// =============================================================================

"use strict";

var fs = require("fs");
require("remedial");

var trait = function(req, res, query) {
	var page; 
	var contenu_fichier;
	var liste_membre;
	var i;

	contenu_fichier = fs.readFileSync("salon.json", "UTF-8");
	liste_membre = JSON.parse(contenu_fichier);

	for (i = 0; i < liste_membre.length; i++) {
		if (liste_membre[i].pseudo === query.pseudo) {
			liste_membre[i].adv = query.adv;
			liste_membre[i].statut = "indisponible";
			contenu_fichier = JSON.stringify(liste_membre);
			fs.writeFileSync("salon.json", contenu_fichier, "UTF-8");
		
		}
	}

	page = fs.readFileSync('res_passif.html', 'UTF-8');

	res.writeHead(200, {'Content-type': 'text/html'});
    res.write(page);
    res.end();
};

// =============================================================================

module.exports = trait;

		
