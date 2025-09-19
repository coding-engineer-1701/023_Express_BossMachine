
const express = require('express');
const meetingRouter = express.Router();

const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase, createMeeting } = require('./db');


meetingRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.status(200).send(meetings); 
})

meetingRouter.post('/', (req, res, next) => {
    try {
        const newMeeting = createMeeting();
        const created = addToDatabase('meetings', newMeeting);
        res.status(201).send(created);
    } catch(err) {
        err.status = 400;
        err.message = 'Invalid meeting data';
        return next(err);
    }
});

meetingRouter.delete('/', (req, res, next) => {
    const deleted = deleteAllFromDatabase('meetings')

    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send('Meeting not found');
    }
})

module.exports = meetingRouter;
