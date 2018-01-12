//==========================================================================
// Rejoindre le salon de jeu
// Bennaceur, Fumey-Humbert, Mercier-Handyside, Vasseur
// Version : 14/11/2017
//==========================================================================

"use strict";

var fs = require('fs');
require('remedial');

var trait = function(req, res, query) {

	var page;
	var marqueurs;
	var contenu_fichier;
	var liste_membre;
	var i;
	var adv;

	contenu_fichier = fs.readFileSync("salon.json", 'utf-8');
	liste_membre = JSON.parse(contenu_fichier);

	for(i = 0; i < liste_membre.length; i++){
		if(liste_membre[i].pseudo === query.pseudo){
			adv = liste_membre[i].adv;
			liste_membre[i].statut = "";
			liste_membre[i].adv = "";
		}

	}

	for(i = 0; i < liste_membre.length; i++){
		if(liste_membre[i].pseudo === adv){
			liste_membre[i].statut = "";
			liste_membre[i].adv = "";
		}
	}

	contenu_fichier = JSON.stringify(liste_membre);
	fs.writeFileSync("salon.json", contenu_fichier, 'utf-8');

	page = fs.readFileSync('res_fin.html', 'UTF-8');
	
	fs.unlinkSync(query.pseudo+".json");
	fs.unlinkSync(adv+".json");

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);

	res.writeHead(200,{'Content-type': 'text/html'});
	res.write(page);
	res.end();

};



module.exports = trait;
