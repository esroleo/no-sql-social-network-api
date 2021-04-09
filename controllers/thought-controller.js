const { Thought, User } = require('../models');

const thoughtController = {

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
      }


}

module.exports = thoughtController;


