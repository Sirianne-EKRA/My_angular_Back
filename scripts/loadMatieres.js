const mongoose = require('mongoose');
const Matiere = require('../model/matiere.js');
const matieres = require('../data/matieresData.ts');

mongoose.connect('mongodb+srv://mongo:mongo@cluster0.muya1at.mongodb.net/assignments?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

async function loadData() {
  try {
    await Matiere.deleteMany(); // Efface toutes les anciennes données
    await Matiere.insertMany(matieres); // Insère les nouvelles données
    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

loadData();
