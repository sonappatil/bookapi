const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// User model for MongoDB using Mongoose


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    unique: true,
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

userSchema.pre('save', async function(next) {   
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
}   );                              

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
}                       