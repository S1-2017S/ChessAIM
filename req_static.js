//=========================================================================
// Traitement de l'envoi d'une requête fichier
// Auteur : P. Thiré
// Version : 09/10/2015
//=========================================================================

"use strict";

var fs = require("fs");
var path = require("path");
var url = require("url");
require('remedial');

var get_static = function (req, res, query) {

	var page;
	var type;
	var sousType;
	var file = url.parse(req.url).pathname;

	// FABRIQUE LE PATH ABSOLU DU FICHIER DEMANDE

	file = __dirname + file;

	// AJUSTE LE TYPE EN FONCTION DE L'EXTENSION

	var extname = path.extname(file);
	if(extname === ".html") {
		type = 'text';
		sousType = 'html';
	} else if (extname === ".css") {
		type = 'text';
		sousType = 'css';
	} else if (extname === ".js") {
		type = 'text';
		sousType = 'js';
	} else if (extname === ".jpg" || extname === ".jpeg") {
		type = 'image';
		sousType = 'jpeg';
	} else if (extname === ".gif") {
		type = 'image';
		sousType = 'gif';
	} else if (extname === ".png") {
		type = 'image';
		sousType = 'png';
	} else if (extname === ".mp3") {
		type = 'audio';
		sousType = 'mp3';
	}

	// ENVOI L'ENTETE AVEC LE TYPE PUIS LE FICHIER
	// SI LE FICHIER N'EXISTE PAS, ENVOI D'UNE PAGE 404

	try {
		page = fs.readFileSync(file);
		res.writeHead(200, {'Content-Type': type + "/" + sousType});
		res.write(page);
		res.end();
	} catch (e) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write('ERREUR 404 : ' + file + ' fichier non trouvé');
		res.end();
	}
};

//---------------------------------------------------------------------------

module.exports = get_static;
