//=========================================================================
// Site ChessAIM
// Bennaceur / Fumey-Humbert / Mercier-Handisyde / Vasseur
// date : 14.11.2017
//=========================================================================

"use strict";

var http = require("http");
var url = require("url");
var querystring = require("querystring");

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_retour_accueil = require("./req_retour_accueil.js");
var req_connexion = require("./req_connexion.js");
var req_inscription = require("./req_inscription.js");
var req_confirme_inscription = require("./req_confirme_inscription.js");
var req_retour_membre = require("./req_retour_membre.js");
var req_rejoindre_salon = require("./req_rejoindre_salon.js");
var req_commencer_actif = require("./req_commencer_actif.js");
var req_commencer_passif = require("./req_commencer_passif.js");
var req_choix = require("./req_choix.js");
var req_abandon = require("./req_abandon.js");
var req_placement = require("./req_placement.js");
var req_passer_actif = require("./req_passer_actif.js");
// var req_stats = require("./req_stats.js");


var req_static = require("./req_static.js");
var req_erreur = require("./req_erreur.js");

//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (req, res) {

    var ressource;
    var requete;
    var pathname;;
    var query;

    console.log("URL reçue : " + req.url);
    requete = url.parse(req.url, true);
    pathname = requete.pathname;
    query = requete.query;

    // ROUTEUR

    try {
        switch (pathname) {
            case '/':
            case '/req_retour_accueil':
                req_retour_accueil(req, res, query);
                break;
            case '/req_connexion':
                req_connexion(req, res, query);
                break;
            case '/req_inscription':
                req_inscription(req, res, query);
                break;
            case '/req_confirme_inscription':
				req_confirme_inscription(req, res, query);
				break;
			case '/req_retour_membre':
				req_retour_membre(req, res, query);
				break;
			case '/req_rejoindre_salon':
				req_rejoindre_salon(req, res, query);
				break;
			case '/req_commencer_actif':
				req_commencer_actif(req, res, query);
				break;
			case '/req_commencer_passif':
				req_commencer_passif(req, res, query);
				break;
			case '/req_choix':
				req_choix(req, res, query);
				break;
			case '/req_abandon':
				req_abandon(req, res, query);
				break;
			case '/req_placement':
				req_placement(req, res, query);
				break;
			case '/req_passer_actif':
				req_passer_actif(req, res, query);
				break;
//			case '/req_stats':
//				req_stats(req, res, query);
//				break;
			default:
                req_static(req, res, pathname);
                break;
        }
    } catch (e) {
        console.log('Erreur : ' + e.stack);
        console.log('Erreur : ' + e.message);
        //console.trace();
        req_erreur(req, res, query);
    }
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

var chessAIM_serveur = http.createServer(traite_requete);
var port = 5000;
console.log("Serveur en ecoute sur port " + port);
chessAIM_serveur.listen(port);
