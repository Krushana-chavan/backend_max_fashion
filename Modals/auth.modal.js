const mongoose = require("mongoose");
const AuthSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
  
    
    email: {
      type: String,
      required: true,
      max: 30,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
  },
  { timestamps: true }
);

const AuthModel = mongoose.model("auth", AuthSchema);

module.exports = {
  AuthModel,
};
