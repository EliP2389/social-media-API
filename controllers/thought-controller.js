const { Thought, User } = require('../models');
const { db } = require('../models/User');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            // removes '__v" field from pizzas
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // create thought
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate
                    ({ _id: params.userId },
                        { $push: { thoughts: _id } },
                        { new: true })
            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));
    },
    // create reaction
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate
            ({ _id: params.id },
                { $push: { reactions: body } },
                { new: true })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));
    },
    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate
            ({ _id: params.id },
                body,
                { new: true, runValidators: true })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete thought
    deleteThought({ params }, res) {
        Thought.findByIdAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.id },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No reaction found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;