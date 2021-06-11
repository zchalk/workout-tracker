const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts", res => {
    Workout.aggregate([{
        $addFields: {totalDuration: {$sum: "$exercises.duration"}}
    }]).then(dbResults => {
        res.json(dbResults);
    }).catch(err => {
        res.status(400).json(err);
    });
});
router.put("/api/workouts/:id", ({body, params}, res) => {
    Workout.findOneAndUpdate(
        {_id: params.id}, {$push: {exercises: body}}, {new: true}
        ).then(dbResults => {
            res.json(dbResults);
        }).catch(err => {
            res.status(400).json(err);
        });
});