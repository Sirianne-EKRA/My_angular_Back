let Assignment = require('../model/assignment');
let Matiere = require('../model/matiere');
let ObjectId = require('mongodb').ObjectID;

// Récupérer tous les assignments (GET)
function getAssignmentsOld(req, res) {
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }
        res.send(assignments);
    });
}

function getAssignments(req, res) {
    let aggregateQuery = Assignment.aggregate();

    Assignment.aggregatePaginate(
        aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
        }, 
        async (err, assignments) => {
            if(err){
                res.send(err);
            }
            // Ajouter les détails des matières à chaque assignment
            assignments.docs = await Promise.all(assignments.docs.map(async (assignment) => {
                let matiere = await Matiere.findById(assignment.matiere).exec();
                assignment.matiereDetails = matiere;
                return assignment;
            }));
            res.send(assignments);
        });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = new ObjectId(req.params.id);
    console.log("GET assignment by id : " + assignmentId)
    // assignmentId est une string correspondant à un _id de MongoDB
    // je veux une requête Mongoose qui renvoie l'objet ayant ce _id
    Assignment.findById(assignmentId, async (err, assignment) => {
        if(err){
            res.send(err)
        }
        let matiere = await Matiere.findById(assignment.matiere).exec();
        assignment = assignment.toObject(); // Convertir le document Mongoose en objet JavaScript
        assignment.matiereDetails = matiere;
        res.json(assignment);
    });
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment._id = new ObjectId();
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.nom = req.body.nom;
    assignment.nom_eleve = req.body.nom_eleve;
    assignment.matiere = req.body.matiere;
    assignment.rendu = req.body.rendu;
    assignment.note = req.body.note;
    assignment.remarque = req.body.remarque;
    
    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({message: 'updated'})
        }
    });
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}

module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
