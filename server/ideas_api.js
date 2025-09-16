const express = require('express');
const ideasRouter = express.Router();

const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db');


ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.status(200).send(ideas); 
})

ideasRouter.post('/', (req, res, next) => {
    try {
        const { name, description, numWeeks, weeklyRevenue } = req.body || {};
        const newIdea = {  name, description, numWeeks, weeklyRevenue  }
        const created = addToDatabase('ideas', newIdea);
        res.status(201).send(created);
    } catch(err) {
        err.status = 400;
        return next(err);
    }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    const idea = getFromDatabaseById('ideas', req.params.ideaId);
    if (idea) {
        res.status(200).send(idea);
    } else {
        res.status(404).send('Idea not found');
    }
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    try {
        const id = req.params.ideaId;
        const { name, description, numWeeks, weeklyRevenue } = req.body || {};
        const updatedIdea = { id, name, description, numWeeks, weeklyRevenue };

        const updated = updateInstanceInDatabase('ideas', updatedIdea);

        if (updated) {
            res.send(updated);
        } else {
            res.status(404).send('Idea not found');
        } 
    } catch (err) {
        err.status = 400;
        err.message = 'Invalid idea data';
        next(err);
    }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId)

    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send('Idea not found');
    }
})



module.exports = ideasRouter;