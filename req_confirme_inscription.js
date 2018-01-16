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
	var pseudo_len;
	var pseudo_check;
	var pwd_check;
	var pwd_check2;
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

	// ON VERIFIE LA LONGUEUR DU LOGIN
	if (query.pseudo.length < 6 ) {
		pseudo_len = false;
	} else {
		pseudo_len = true;
	}

	// ON VERIFIE LA LONGUEUR DU PASSWORD
	if(query.password.length < 6) {
		pwd_len = false;
	} else {
		pwd_len = true;
	}

	// ON VERIFIE LES CARACTERES DU LOGIN
	pseudo_check = false;
	var code = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ';
	var compteur = 0;
	for (i = 0; i < query.pseudo.length; i++) {
		for (j = 0; j < code.length; j++) {
			if (query.pseudo[i] === code[j]) {
				compteur++;
			}
		}
	}
	if (compteur === query.pseudo.length) {
		pseudo_check = true;
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

	pwd_check2 = true;

	for (j = 0; j < pwd.length; j++){
		if(query.password[j] !== query.check[j]) {
			pwd_check2 = false;
		}
	}
			// SI PAS TROUVE, ON AJOUTE LE NOUVEAU COMPTE DANS LA LISTE DES COMPTES

			if(trouve === false && pwd_len === true && pwd_check === true && pwd_check2 === true) {
				var crea_pw = true;
			} else {
				crea_pw = false;
			}

			if (pseudo_len === true && pseudo_check === true) {
				var crea_pseudo = true;
			} else {
				crea_pseudo = false;
			}

			if (crea_pw === true && crea_pseudo === true) { 
				nouveauMembre = {};
				nouveauMembre.pseudo = query.pseudo;
				nouveauMembre.password = query.password;
				nouveauMembre.statut = "";
				listeMembres[listeMembres.length] = nouveauMembre;

				contenu_fichier = JSON.stringify(listeMembres);

				fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');
			}


			// ON RENVOIT UNE PAGE HTML 

			if(trouve === true) {
				// SI CREATION PAS OK, ON REAFFICHE PAGE FORMULAIRE AVEC ERREUR

				page = fs.readFileSync('res_inscription.html', 'utf-8');

				marqueurs = {};
				marqueurs.erreur = "<div class='dark-matter1'>" + "Erreur : ce compte existe déjà." + "</div>";
				marqueurs.pseudo = query.pseudo;
				page = page.supplant(marqueurs);

			} else if(pwd_len === false) {

				page = fs.readFileSync('res_inscription.html', 'utf-8');

				marqueurs = {};
				marqueurs.erreur = "<div class='dark-matter1'>" + "Erreur : le mot de passe doit comporter au moins 6 caractères." + "</div>";
				marqueurs.pseudo = query.pseudo;
				marqueurs.password = query.password;
				page = page.supplant(marqueurs);

			} else if(pwd_check === false) {

				page = fs.readFileSync('res_inscription.html', 'utf-8');

				marqueurs = {};
				marqueurs.erreur = "<div class='dark-matter1'>" + "Erreur : saisissez un mot de passe avec des caractères alphanumériques." + "</div>";
				marqueurs.pseudo = query.pseudo;
				marqueurs.password = query.password;
				page = page.supplant(marqueurs);

			} else if (crea_pseudo === false) {

				page = fs.readFileSync('res_inscription.html', 'UTF-8');

				marqueurs = {};
				marqueurs.erreur = "<div class='dark-matter1'>" + "Erreur: le pseudo est trop court, ou comporte des caractères non autorisés." + "</div>";
					marqueurs.pseudo = query.pseudo;
				marqueurs.password = query.password;
				page = page.supplant(marqueurs);

			} else if (pwd_check2 === false) {

				page = fs.readFileSync('res_inscription.html','UTF-8');

				marqueurs = {};
				marqueurs.erreur = "<div class='dark-matter1'>" + "Erreur: les mots de passe ne correspondent pas." + "</div>";
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
