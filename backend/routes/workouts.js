const router = require('express').Router();

// GET all workouts
router.get('/', (req, res) => {
    res.json({ mssg: 'Workouts endpoint' });
});

// GET a single workout
router.get('/:id', (req, res) => {
    //req.params.id
})

// POST a new wokrout
router.post('/', (req, res) => {

});

// DELETE a workout
router.delete('/:id', (req, res) => {

});

// PATCH a workout
router.patch('/:id', (req, res) => {

});

module.exports = router;