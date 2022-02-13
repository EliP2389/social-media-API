const { Thought, Reaction } = require('../models');
const { db } = require('../models/User');

const thoughtController = {
    // the functions will go in her as methods
    // get all pizzas
    getAllThoughts(req, res) {
        Thought.find({})
        // populates all comments
        .populate({
            select: '-__v'
        })
        // removes '__v" field from pizzas
        .select('-__v')
        // this method 
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one pizza by id
    getThoughtById({ params }, res) {
       Thought.findOne({ _id: params.id })
        .populate({
            select: '-__v'
        })
        // removes v field from pizza
        .select('-__v')
        .then(dbThoughtData => {
            // If no pizza is found, send 404
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // create user
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err));
    },
    // update user by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    // delete user
    deleteThought({ params }, res) {
        Thought.findByIdAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;