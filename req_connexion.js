//=========================================================================
// Traitement de "req_connexion"
// Bennaceur / Fumey-Humbert / Mercier-Handisyde / Vasseur 
// Version : 14.11.2017
//=========================================================================

"use strict";

var fs = require("fs");
var moment = require('moment');
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var pseudo;
	var password;
	var page;
	var membre;
	var contenu_fichier;
	var listeMembres;
	var i;
	var trouve;
	var connected;
	var check;
	// ON LIT LES COMPTES EXISTANTS

	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');    
	listeMembres = JSON.parse(contenu_fichier);

	// ON VERIFIE QUE LE PSEUDO/PASSWORD EXISTE
	check = false;
	trouve = false;
	i = 0;
	while(i<listeMembres.length && trouve === false) {
		if(listeMembres[i].pseudo === query.pseudo) {
			if(listeMembres[i].password === query.password) {
				if (listeMembres[i].statut === "true") {
					check = true;
					trouve = true;
				} else {
				trouve = true;
				listeMembres[i].statut = "true";
				console.log("prout");
				contenu_fichier = JSON.stringify(listeMembres);
				fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');
				}
			}

		}
		i++;
	}

	// ON RENVOIT UNE PAGE HTML 

	if(trouve === false) {
		// SI IDENTIFICATION INCORRECTE, ON REAFFICHE PAGE ACCUEIL AVEC ERREUR

		page = fs.readFileSync('res_accueil.html', 'utf-8');

		marqueurs = {};
		marqueurs.erreur = "ERREUR : compte ou mot de passe incorrect";
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

	
	} else if(check === true) {
		page = fs.readFileSync('res_accueil.html','UTF8');

		marqueurs = {};
		marqueurs.erreur = "Le compte est déjà connecté";
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);
	
	} else {
		// SI IDENTIFICATION OK, ON ENVOIE PAGE ACCUEIL MEMBRE

		page = fs.readFileSync('res_accueil_membre.html', 'UTF-8');

		marqueurs = {};
		marqueurs.date = moment().format('LLL');
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);
	}

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
