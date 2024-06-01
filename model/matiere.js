let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = require('mongodb').ObjectID;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let MatiereSchema = Schema({
    _id: ObjectId,
    name: { type: String, required: true },
    image: { type: String }, // URL de l'image de la matière
    professor: { type: String }

});

MatiereSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('matieres', MatiereSchema);
