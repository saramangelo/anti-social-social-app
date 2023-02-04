const { User, Thought } = require('../models');

// Aggregate function to get the number of friends overall
const friendCount = async () =>
  User.aggregate()
    .count('friendCount')
    .then((numberOfFriends) => numberOfFriends);

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
    .then(async (users) => {
      const userObj = {
        users,
        friendCount: await friendCount(),
      };
      return res.json(userObj);
    })
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  // similar to joining
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .populate('thoughts')
    .populate('friends')
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate({_id: req.params.userId }, {$set: req.body}, { runValidators: true, new: true })
    .then((user) => res.json(user))
    !user
    ? res.status(404).json({ message: 'No user with that ID' })
    : Thought.deleteMany({ _id: { $in: user.thoughts } })
    .catch((err) => res.status(500).json(err));
  },

  // Delete a user and associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
};


// update user by adding friend from param (getting id from param from both user and friend) to the friends array
// addFriend 
// findOneAndUpdate - $set 
// see #26 Tag