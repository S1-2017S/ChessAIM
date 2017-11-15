//=========================================================================
// Traitement de "req_confirme_inscription"
// Bennaceur / Fumey-Humbert / Mercier-Handisyde / Vasseur
// Version : 15.11.2017
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var pseudo;
	var password;
	var page;
	var nouveauMembre;
	var contenu_fichier;
	var listeMembres;
	var trouve;
	var pwd_len;
	var pwd_check;
	var i;
	// ON LIT LES COMPTES EXISTANTS

	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');    
	listeMembres = JSON.parse(contenu_fichier);

	// ON VERIFIE QUE LE COMPTE N'EXISTE PAS DEJA

	trouve = false;
	i = 0;
	while(i<listeMembres.length && trouve === false) {
		if(listeMembres[i].pseudo === query.pseudo) {
			trouve = true;
		}
		i++;
	}
	
	// ON VERIFIE LA LONGUEUR DU PASSWORD
	if(query.password.length < 6) {
		pwd_len = false;
	} else {
		pwd_len = true;
	}

	// ON VERIFIE LES CARACTERES DU PASSWORD
	pwd_check = true;
	var pwd = query.password;
	for(var j = 0; j < pwd.length; j++) {
		if((pwd.charCodeAt(j) < 48 || pwd.charCodeAt(j) > 57) && 
		   (pwd.charCodeAt(j) < 65 || pwd.charCodeAt(j) > 90) && 
		   (pwd.charCodeAt(j) < 97 || pwd.charCodeAt(j) > 122)) {
			
			pwd_check = false;
			break;
		}
	}
	

		// SI PAS TROUVE, ON AJOUTE LE NOUVEAU COMPTE DANS LA LISTE DES COMPTES

		if(trouve === false && pwd_len === true && pwd_check === true) {
			nouveauMembre = {};
			nouveauMembre.pseudo = query.pseudo;
			nouveauMembre.password = query.password;
			listeMembres[listeMembres.length] = nouveauMembre;

			contenu_fichier = JSON.stringify(listeMembres);

			fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');
		}


		// ON RENVOIT UNE PAGE HTML 

		if(trouve === true) {
			// SI CREATION PAS OK, ON REAFFICHE PAGE FORMULAIRE AVEC ERREUR

			page = fs.readFileSync('res_inscription.html', 'utf-8');

			marqueurs = {};
			marqueurs.erreur = "ERREUR : ce compte existe déjà";
			marqueurs.pseudo = query.pseudo;
			page = page.supplant(marqueurs);

		} else if(pwd_len === false) {

			page = fs.readFileSync('res_inscription.html', 'utf-8');

			marqueurs = {};
			marqueurs.erreur = "ERREUR : Veuillez entrer un mot de passe d'au moins 6 caractères";
			marqueurs.pseudo = query.pseudo;
			marqueurs.password = query.password;
			page = page.supplant(marqueurs);

		} else if(pwd_check === false) {
			
			page = fs.readFileSync('res_inscription.html', 'utf-8');

			marqueurs = {};
			marqueurs.erreur = "ERREUR : Veuillez entrer un mot de passe avec des caractères alphanumérique";
			marqueurs.pseudo = query.pseudo;
			marqueurs.password = query.password;
			page = page.supplant(marqueurs);

		} else {
			// SI CREATION OK, ON ENVOIE PAGE DE CONFIRMATION

			page = fs.readFileSync('res_confirmation_inscription.html', 'UTF-8');

			marqueurs = {};
			marqueurs.pseudo = query.pseudo;
			marqueurs.password = query.password;
			page = page.supplant(marqueurs);
		}

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(page);
		res.end();
	};

	//---------------------------------------------------------------------------

	module.exports = trait;
