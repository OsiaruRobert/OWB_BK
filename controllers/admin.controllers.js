import { comparePassword, hashPassword } from "../functions/password.func.js";
/*
import {
  sendGmail
} from "../gmail/send.gmail.js";
*/
import {
 getDifferenceInMinutes,
 getCurrentDateTime
} from "../functions/moment.func.js";

import {
 saveUser,
 saveSignin,
 findUserByGmail,
 findUserByUsername,
 resetOtp
} from "../functions/mongoose.func.js";

import mongoose from "mongoose";

import User from "../models/user.models.js";
import Signin from "../models/signin.models.js";

import transactions from "../models/transaction.models.js";
import { getMongoId } from "../functions/mongoose.func.js";

async function allUsers() {
 const users = await User.find({});
 let userswithfunds = 0;
 let liquidity = 0;

 for (let i = 0; i < users.length; i++) {
  const user = users[i];
  if (user.balance > 10 && user.balance < 8000) {
   const Richuserswithfunds = {
    username: user.username,
    phone: user.phone,
    transactions: user.transactions,
    signins: user.signins.length,
    bal: user.balance
   };
liquidity = liquidity + user.balance;
   userswithfunds++;
   console.log("============================");
   console.log("============================");
   console.log(Richuserswithfunds);
   console.log("============================");
   console.log("============================");
  }
 }
 const message = {
  message: "users with funds",
  userswithfundsCount: userswithfunds,
  usersCount: users.length,
  liquidity:liquidity
 };
 console.log(message);
}

export async function admin() {
 console.log("admin");
 //await allUsers();
}
