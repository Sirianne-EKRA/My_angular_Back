let Matiere = require('../model/matiere');
let ObjectId = require('mongodb').ObjectID;

// Récupérer toutes les matieres (GET)
function getMatieresOld(req, res){
    Matiere.find((err, matieres) => {
        if(err){
            res.send(err)
        }

        res.send(matieres);
    });
}

function getMatieres(req, res) {
    let aggregateQuery = Matiere.aggregate();

    Matiere.aggregatePaginate(
        aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
        }, 
        (err, matieres) => {
            if(err){
                res.send(err);
            }
            res.send(matieres);
        });
} 

// Récupérer un assignment par son id (GET)
function getMatiere(req, res){
    let matiereId = new ObjectId(req.params.id);
    console.log("GET matiere by id : " + matiereId)
    // matiereId est une string correspondant à un _id de MongoDB
    Matiere.findById(matiereId, (err, matiere) => {
        if(err){
            res.send(err)
        }
        res.json(matiere);
    });

}

module.exports = { getMatieres, getMatiere};


/* const express = require('express');
const router = express.Router();
const Matiere = require('../model/Matiere.model');

// GET all Matieres
router.get('/', async (req, res) => {
  try {
    const Matieres = await Matiere.find();
    res.json(Matieres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 
*/


