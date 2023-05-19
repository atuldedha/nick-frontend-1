import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const schema = mongoose.Schema(
  {
    firstName: { 
      type: String, 
      required: true 
    },
    lastName: { 
      type: String 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    phoneNumber: { 
      type: Number,
      required: true 
    },
    password: { 
      type: String, 
      set: function(pass){
        return bcrypt.hashSync(pass, 16)
      }
    },
    role: { 
      type: String,
      required: true
    },
    walkieTalkieAccess: {
      type: Boolean,
      default: false
    },
    group: { 
      type: mongoose.Types.ObjectId,
      ref: "group" 
    },
  },
  { collection: "users" }
);

export const User = mongoose.models.user || mongoose.model("user", schema);



