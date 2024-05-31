let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = require('mongodb').ObjectID;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let AssignmentSchema = Schema({
    _id: ObjectId,
    dateDeRendu: Date,
    nom: String,
    nom_eleve: String,
    matiere: String,
    rendu: Boolean,
    note: Number,
    remarque: String

});

AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('assignments', AssignmentSchema);
