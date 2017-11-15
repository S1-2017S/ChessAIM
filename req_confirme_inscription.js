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
	var code;
	var pwd_check;
	var pwd_check2;
	var i;
	var j;

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

	if(query.password.length < 6) {
		pwd_check = false;
	} else {
		pwd_check = true;
		
		code = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ";
		pwd_check2 = true;	
		
		for (i = 0; i < query.password.length; i++) {
			for (j = 0; j < code.length; j++) {
				if (query.password[i] !== code[j]) {
					pwd_check2 = false;
					j = code.length;
				}
			} 		
		break;
		}
	}



		// SI PAS TROUVE, ON AJOUTE LE NOUVEAU COMPTE DANS LA LISTE DES COMPTES

		if(trouve === false && pwd_check === true && pwd_check2 === true) {
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

		} else if(pwd_check === false) {

			page = fs.readFileSync('res_inscription.html', 'utf-8');

			marqueurs = {};
			marqueurs.erreur = "ERREUR : Veuillez entrer un mot de passe d'au moins 6 caractères";
			marqueurs.pseudo = query.pseudo;
			marqueurs.password = query.password;
			page = page.supplant(marqueurs);

		} else if(pwd_check2 === false) {
			
			page = fs.readFileSync('res_inscription.html', 'utf-8');
			
			marqueurs = {};
			marqueurs.erreur = "ERREUR : Veuillez respecter la syntaxe de mot de passe imdiquée";
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
