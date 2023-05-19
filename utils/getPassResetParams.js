import { PassResetToken } from "../models/PassResetToken";
import passResetEmailTemplate from "./passResetEmailTemplate";
import dbConnect from "../lib/dbConnect";
const crypto = require("crypto"); 

export default async (email, host, https) => {
    const token = crypto.randomBytes(48).toString("hex");

    await dbConnect();
    await PassResetToken.findOneAndUpdate({email},{
      token: token,
      email: email,
    }, {upsert: true})
  
  
    const resetLink = `${https? "https": "http"}://${host}/reset-password?token=${token}`;
  
    const templateParams = {
      templateName: "SIMPLE",
      to: email,
      subject: "Montreal: Password Reset",
      message: passResetEmailTemplate.replace("%reset_link%", resetLink),
    };
  
    return templateParams;
    
};