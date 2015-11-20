var _  = require('underscore');
var models = require('../models');

var Character = models.Character;

var display = function(req, res){
	Character.CharacterModel.findByOwner(req.session.account._id, function(err, docs){
		if(err){
			console.log(err);
			return res.status(400).json({error: "An error occurred"});
		}
		if(docs.length === 0){ //No characters, character creator
			console.log("going to creator");
			res.render('creator', {csrfToken: req.csrfToken()});
		}
		else{ //Show Character
			res.render('app', {csrfToken: req.csrfToken()});
		}
	});
};

var create = function(req, res){
	console.log("create");
	var characterData = {
		name: "unknown",
		headgear: req.headgear,
		skintone: req.skintone,
		archtype: req.archtype,
		strength: req.strength,
		agility: req.agility,
		health: req.health,
		owner: req.session.account._id
	};
	
	var newCharacter = new Character.CharacterModel(characterData);
	
	newCharacter.save(function(err) {
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occurred'});
		}
		
		res.json({redirect: '/maker'});
	});
};

module.exports.display = display;
module.exports.create = create;