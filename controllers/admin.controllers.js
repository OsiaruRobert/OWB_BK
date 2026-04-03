import {
  comparePassword,
  hashPassword
} from "../functions/password.func.js";
import {
  sendGmail
} from "../gmail/send.gmail.js";
import {
  getDifferenceInMinutes,
  getCurrentDateTime
} from "../functions/moment.func.js";

import {
  saveUser,
  saveSignin,
  findUserByGmail,
  findUserByUsername,
  resetOtp,
} from "../functions/mongoose.func.js";


import mongoose from "mongoose"


import User from "../models/user.models.js";
import Signin from "../models/signin.models.js";

import transactions from "../models/transaction.models.js"
import {getMongoId} from "../functions/mongoose.func.js"



export async function work(){
	console.log("admin")
}