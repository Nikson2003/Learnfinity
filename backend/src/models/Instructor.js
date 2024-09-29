const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const InstructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Pre-save hook to hash password before saving
InstructorSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords (this method is optional if using bcrypt.compare directly)
InstructorSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Instructor = mongoose.model('Instructor', InstructorSchema);
module.exports = Instructor;
