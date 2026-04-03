import mongoose from "mongoose"


import User from "../models/user.models.js";
import Signin from "../models/signin.models.js";

import {
  describeTransaction,
} from "../functions/description.func.js";
import {
  getCost,
  createTransG
} from "../functions/transaction.func.js";
import {
  getCurrentDateTime,
  getFiveMinutesFromNow,
  getDifferenceInMinutesS
} from "../functions/moment.func.js";

import {
  randomDigits,
} from "../functions/generate.func.js";
import cfg from '../cfg.js'

const DB_URL = cfg.DB_URL;

export async function connectDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log("successful to connection");

  }catch(err) {
    console.log("Failed to connect" + err);
  }
}

export function getMongoId(item) {
  return item.toString();
}


export async function saveSignin(obj) {
  try { 
    //  throw new Error("the username is already taken")
    const login = new Signin(obj);
    await login.save();

    return login;
  }catch(err) {
    throw new Error(`Could not sigin because ${err.message}`)
  }
}


export async function saveUser(obj) {
  try {
    //  throw new Error("the username is already taken")
    const newUser = new User(obj);
    await newUser.save();

    return newUser;
  }catch(err) {
    throw new Error(`Could not create account because ${err.message}`)
  }
}

export async function findUserByAccessKey(key) {

  try {
    const user = await User.find({
      accessToken: key
    })
    if (user.length < 1) {
      console.log(user.length)
      //multiple users have the accessToken
      throw new Error("User not found.")
    }

    return user[0];
  }catch(err) {
    throw new Error(err.message)
  }
}

export async function findUserByGmail(gmail) {
  const user = User.findOne({
    gmail: gmail
  })
  if (!user) throw new Error ("user not found")

  return user
}

export async function findUserByUsername(username) {
  const user = User.findOne({
    username: username
  })
  if (!user) throw new Error ("User not found")

  return user
}


export async function resetOtp(user) {
  try{
    const gmail = user.gmail;
    
    let otp ={
      value : randomDigits(6),
      expires:getFiveMinutesFromNow()
    }
    
    console.log(otp)
    
    user.otp = otp;
    
    await saveUser(user);
    
    return user.otp
  }catch(err){
    
    console.log(err);
    throw new Error("Unable to reset and send otp")
  }
}






export async function pendTransaction(user, miniPayload, kind) {
  //description of transaction
  let description = describeTransaction(miniPayload, kind);

  //cost of transaction
  let cost = getCost(kind, miniPayload);;

  let id = `${kind}_${randomDigits(11)}`;
  if (kind === "Funding") id = miniPayload.trackId;

  //balances
  let new_balance;
  const old_balance = user.balance;

  if (kind === "Funding") {
    new_balance = user.balance + Number(cost);
  } else {
    new_balance = user.balance - cost;
  }

  let transaction = {
    date: {
      start: Date(),
      verified: null
    },
    type: kind,
    cost,
    description,
    status: "pending",
    old_balance: old_balance,
    new_balance: new_balance,
    id: id,
  };
  //  console.log(user)
  //debit and record on user Object
  if (kind !== "Funding") user.balance = new_balance;

  user.transactions.unshift(transaction)
  await user.save();
  //record globally
  transaction = user.transactions[0];
  console.log("transactions Saved as pending")

  let _id = transaction._id;

  _id = getMongoId(_id);

  return {
    transId: id,
    _id,
    user
  }

}


export async function verifyTransaction(transactionRes, user, ref) {
  user = await User.findOne({
    gmail: user.gmail
  });
  let index = getTransactionIndex(user.transactions, ref);
  if (transactionRes.status === "success") {
    user.transactions[index].status = "success";
  } else {
    user.transactions[index].status = "failed";
    console.log(user.balance)
    user.balance = user.transactions[index].old_balance;
    console.log(user.balance)
  }

  user.transactions[index].date.verified = getCurrentDateTime();
  await createTransG(user.transactions[index], user.gmail)
  console.log("verified")
  //  console.log(user)
  await user.save();

  if (transactionRes.status !== "success") {
    console.log(transactionRes)
    throw new Error("Transaction failed. Your money has been refunded.");
  } else {
    console.log(`successful Purchase : ${user.transactions[index].description}`)

  }

}

function getTransactionIndex(transactions, ref) {
  for (let i = 0; i < transactions.length; i++) {
    let _id = getMongoId(transactions[i]._id);
    if (_id === ref._id) {
      console.log("Found our transaction")
      return i
    }
  }
  console.log(404)
}