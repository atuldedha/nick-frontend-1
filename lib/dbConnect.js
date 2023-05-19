import mongoose from "mongoose";
import { adminData } from "./adminData";
import { User } from '../models/user'

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!MONGODB_DB) {
  throw new Error("Define the MONGODB_DB environmental variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }


  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      dbName: MONGODB_DB,
    };
    
    console.log("CONNECTING TO DB")
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("CONNECTED TO DB")
      return mongoose;
    });
  }

  
  cached.conn = await cached.promise;
  
  adminData.forEach(async function(admin){
    let exists= await User.findOne({email: admin.email})
    if(!exists)
      await User.create(admin)
  })
  
  return cached.conn;
}

export default dbConnect;