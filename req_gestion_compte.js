//===========================================================================
// Traitement de req_gestion_compte
// Auteurs : Bennaceur, Fumey-Humbert, Mercier Handisyde, Vasseur
// Version : Janvier 2018
//============================================================================

"use strict";

var fs = require('fs');
require('remedial');

var trait = function (req, res, query) {
	var page;

	var page;
	var marqueurs;
	var contenu_fichier;
	var contenu_salon;
	var liste_membre;
	var liste_salon;
	var liste;
	var i;
	var j;
	var marqueurs;
	var erreurs;
	var string;

	page = fs.readFileSync('res_gestion_compte.html','UTF-8');

	//========= Récupération des informations dans les JSON =================\\

	contenu_fichier = fs.readFileSync("membres.json","UTF-8");
	liste_membre = JSON.parse(contenu_fichier);


	i = 0;
	j = 0;

	while (liste_membre[i].pseudo !== query.pseudo) {
		i++;
		console.log(i);
	}

	while(j !== i) {
		j++;
		console.log(j);
	}


	liste = "";
	erreurs = "";
	//====== Demande d'affichage formulaire modification pseudo ==========\\

	if (liste_membre[j].pseudo === query.mod_pseudo) {


		liste += "<div class='dark-matter'><form action='/req_gestion_compte' method='GET'><br/>Ancien pseudo : <br/><input type='text' placeholder ='Ancien pseudonyme' name = 'old_pseudo' value=''><br/>Nouveau pseudo : <br/><input type='text' placeholder='Nouveau pseudonyme' name = 'new_pseudo' value=''><br/><input type='hidden' name='pseudo' value='"+ query.mod_pseudo +"'><button class='button' name='modifier_pseudo' value='Valider'>Modifier mon pseudonyme</form></div>";

		marqueurs = {};
		marqueurs.pop_mod = liste;
		marqueurs.pseudo = query.mod_pseudo;
		marqueurs.erreur = erreurs;
		page = page.supplant(marqueurs);
		res.writeHead(200, {'Content-type': 'text/html'});
		res.write(page);
		res.end;
		//=========== Verification et modification du pseudonyme ============\\

	} else if (liste_membre[j].pseudo === query.old_pseudo) {
		if (query.new_pseudo.length > 6) {
			liste = "";
			erreurs = "";
			liste_membre[j].pseudo = query.new_pseudo;
			contenu_fichier = JSON.stringify(liste_membre);
			fs.writeFileSync("membres.json", contenu_fichier,'UTF-8');
			marqueurs = {};
			marqueurs.pop_mod = liste;
			marqueurs.pseudo = query.new_pseudo;
			marqueurs.erreur = erreurs;
			page = page.supplant(marqueurs);
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(page);
			res.end;

		} else {

			marqueurs = {};
			marqueurs.pseudo = liste_membre[j].pseudo;
			marqueurs.pop_mod = liste;
			marqueurs.erreur = "<div class='dark-matter1'>Erreur: le pseudo saisit doit mesurer plus de 6 caractères.</div>";
			page = page.supplant(marqueurs);
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(page);

		}
		//===== Demande d'affichage formulaire modification password =====\\

	} else if (liste_membre[j].password === query.old_pwd) {

		if (query.new_pwd.length > 6 && query.new_pwd === query.confirm_pwd) {
			liste = "";
			erreurs = "";
			liste_membre[j].password = query.new_pwd;
			contenu_fichier = JSON.stringify(liste_membre);
			fs.writeFileSync('membres.json',contenu_fichier,'UTF-8');
			marqueurs = {};
			marqueurs.pop_mod = liste;
			marqueurs.pseudo = query.old_pseudo;
			marqueurs.erreur = erreurs;
			page = page.supplant(page);
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(page);
			res.end;

		} else {
			liste = "";
			erreurs = "";
			marqueurs = {};
			marqueurs.pop_mod = liste;
			marqueurs.pseudo = query.pseudo;
			marqueurs.erreur = "<div class='dark-matter1'>Erreur: les mots de passe ne correspondent pas ou sont trop courts.</div>";
			page = page.supplant(marqueurs);
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(page);
			res.end;
		}

		//===== Vérification concordance passwords et modifiation ======\\
	} else if (query.mod_pwd === liste_membre[j].pseudo) {
		liste += "<div class='dark-matter'><form action='/req_gestion_compte' method='GET'><br/>Ancien mot de passe : <br/><input type ='hidden' name='pseudo' value='"+ query.mod_pwd +"'><input type='text' placeholder ='Ancien mot de passe' name = 'old_pwd' value=''><br/>Nouveau mot de passe : <br/><input type='text' placeholder='Nouveau mot de passe' name = 'new_pwd' value=''><br/>Confirmation de mot de passe : <br/><input type='text' placeholder='Confirmer mot de passe' name='confirm_pwd' value= ''><br/><button class='button' name='modifier_pseudo' value='Valider'>Modifier mon mot de passe</form></div";

		marqueurs = {};
		marqueurs.pseudo = liste_membre[j].pseudo;
		marqueurs.pop_mod = liste;
		marqueurs.erreur = erreurs;
		page = page.supplant(marqueurs);
		res.writeHead(200, {'Content-type': 'text/html'});
		res.write(page);
		res.end;
		//================= Suppression du compte ====================\\

	} else if(query.splice === liste_membre[j].pseudo) {
		liste_membre.splice(j);
		contenu_fichier = JSON.stringify(liste_membre);
		fs.writeFileSync('membres.json', contenu_fichier, 'UTF-8');
		page = fs.readFileSync('res_accueil.html','UTF-8');
		marqueurs = {};
		marqueurs.erreur = "";
		page = page.supplant(marqueurs);
		res.writeHead(200, {'Content-type': 'text/html'});
		res.write(page);
		res.end();
		//============= Affichage de la page classique ================\\
	} else {
		marqueurs = {};
		marqueurs.pop_mod = liste;
		marqueurs.pseudo = liste_membre[i].pseudo;
		marqueurs.erreur = erreurs;
		page = page.supplant(marqueurs);
		res.writeHead(200, {'Content-type': 'text/html'});
		res.write(page);
		res.end;
	}
};

module.exports = trait;
