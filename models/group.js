import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    country: { 
      type: String,
      default: "" 
    },
    mainContact: {
      type: String,
      default: "groupPresident"      // groupPresident or groupVicePresident
    },
    members: [{
      type: mongoose.Types.ObjectId, 
      ref: "user" 
    }],
    application: {
      type: mongoose.Types.ObjectId,
      ref: "application"
    },
    lastApplicationStatus:{
      type: String,
      default: "To Be Accepted"
    }
  },
  { collection: "group" }
);

export const Group = mongoose.models.group || mongoose.model("group", schema);
