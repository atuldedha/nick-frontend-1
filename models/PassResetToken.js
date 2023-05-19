import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    token: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String,
      required: true 
    },
  },
  { collection: "PassResetTokens" }
);


schema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });


export const PassResetToken= mongoose.models.PassResetToken || mongoose.model("PassResetToken", schema);
