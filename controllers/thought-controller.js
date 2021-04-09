const { Thought, User } = require('../models');

const thoughtController = {

    getAllThoughts(req, res) {
        Thought.find({}) // sequelize uses findAll()
          .populate({
            path: 'reactions',
            select: '-__v' // do not populate __v and show others
          })
          .select('-__v') // do not return field __v
          .sort({ _id: -1 }) // mongoose sort DESC 
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
          // get one User by id
    getThoughtById({ params }, res) { // params deconstructed
        Thought.findOne({ _id: params.id })
          .populate({
            path: 'reactions',
            select: '-__v'
          })
          .select('-__v')
          .then(dbUserData => {
            // If no User is found, send 404
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },

     addThought({ params, body }, res) {
        //console.log(body);
       // console.log(body.userId)
        Thought.create(body)
          .then(({ _id }) => {
              //console.log(body.userId)
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
          })
          .catch(err => res.json(err));
      },
      updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
      },
      deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
      },

      // Add though reaction
      addThoughtReaction({ params, body }, res) {
        console.log(body)
        Thought.findOneAndUpdate(
               { _id: params.thoughtId },
               
                //replies: body will update replies model inside comments
                //{ $push: { reactions: body } },
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            )
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
          },
            // remove reply
        deleteThoughtReaction({ params }, res) {
          Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionID: params.reactionId } } },
            { new: true }
            )
          .then(dbPizzaData => res.json(dbPizzaData))
          .catch(err => res.json(err));
      },


      


}

module.exports = thoughtController;



