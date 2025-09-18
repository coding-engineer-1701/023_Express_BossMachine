const express = require('express');
const minionsRouter = express.Router();

const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db');


minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.status(200).send(minions); 
})

minionsRouter.post('/', (req, res, next) => {
    try {
        const { name, title, weaknesses, salary } = req.body || {};
        const newMinion = { name, title, weaknesses, salary }
        const created = addToDatabase('minions', newMinion);
        res.status(201).send(created);
    } catch(err) {
        err.status = 400;
        return next(err);
    }
});

minionsRouter.get('/:minionId', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if (minion) {
        res.status(200).send(minion);
    } else {
        res.status(404).send('Minion not found');
    }
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const id = req.params.minionId;
    // const body = req.body;
    const { name, title, weaknesses, salary } = req.body;
    const updatedMinion = { id, name, title, weaknesses, salary };

    const updated = updateInstanceInDatabase('minions', updatedMinion);

    if (updated) {
        res.send(updated);
    } else {
        res.status(404).send('Minion not found');
    }
})

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId)

    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send('Minion not found');
    }
})



module.exports = minionsRouter;