const { User, Thought } = require('../models');

const userController = {
    // get all Users
    getAllUser(req, res) {
      User.find({}) // sequelize uses findAll()
        .populate({
          path: 'thoughts',
          select: '-__v' // do not populate __v and show others
        })
        .populate({
          path: 'friends',
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
    getUserById({ params }, res) { // params deconstructed
      User.findOne({ _id: params.id })
        .populate({
          path: 'thoughts',
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
    // createUser
    createUser({ body }, res) {
        User.create(body) // body deconstructed
            .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
     },
     // update User by id
    // update User by id
    /*
    Mongoose only executes the validators automatically 
    when we actually create new data. This means that a 
    user can create a User, but then update that User 
    with totally different data and not have it validated.
    Let's go ahead and fix that with a simple option setting.

    runValidators: true
    We need to include this explicit setting when updating data so
    that it knows to validate any new information.
    */
    updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    // delete User
    deleteUser({ params }, res) {
      // User.findOneAndUpdate(
      //   { _id: params.id },
      //   { $pull: { thoughts: { userId: params.id } } },
      //   //{ new: true }
      //   )
      Thought.deleteMany(
        { userId: params.id },
       // { $pull: { thoughts: { userId: params.id } } },
        //{ new: true }
        )
        .then(deletedComment => {
          if (!deletedComment) {
            return res.status(404).json({ message: 'No comment with this id!' });
          }
        return User.findOneAndDelete(
          { _id: params.id }
          )
        })
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
            }
            // return Thought.deleteMany(
            //   //{ _id: params.id },
            //   { userId: params.id },
            //   // pull removed the id from the comments array
            //  // { $pull: { comments: params.commentId } },
            //   { new: true }
            // );
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
        // remove comment and then remove it from the pizza.
      deleteFriend({ params }, res) {
      User.findOneAndDelete({ _id: params.commentId })
        .then(deletedComment => {
          if (!deletedComment) {
            return res.status(404).json({ message: 'No comment with this id!' });
          }
          return Pizza.findOneAndUpdate(
            { _id: params.pizzaId },
            // pull removed the id from the comments array
            { $pull: { comments: params.commentId } },
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
    // add friend
    addFriend({ params, body }, res) {
      User.findOneAndUpdate(
              { _id: params.userId },
              //replies: body will update replies model inside comments
              { $push: { friends: params.friendId } }, 
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
      // remove friend
      removeFriend({ params, body }, res) {
        User.findOneAndUpdate(
                { _id: params.userId },
                //replies: body will update replies model inside comments
                { $pull: { friends: params.friendId } }, 
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
      }

  }

module.exports = userController;