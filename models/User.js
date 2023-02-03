const { Schema, model } = require('mongoose');
const userSchema = require('./User');

// Aggregate function to get the number of students overall
const headCount = async () =>
  Student.aggregate()
    .count('studentCount')
    .then((numberOfStudents) => numberOfStudents);

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    thoughts: [  {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },],
    friends: [  {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Create a virtual property `friendCount` that retrieves the length of the user's friends array field on query.
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;
