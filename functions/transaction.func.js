import transactions from "../models/transaction.models.js"
import {getMongoId} from "../functions/mongoose.func.js"

export function getCost(kind, miniPayload) {

  let cost;

  if (kind === "Airtime") {
    cost = miniPayload.amount;
  } else if (kind === "Data") {
    cost = miniPayload.bundle.price;
  } else if (kind === "Funding") {
    cost = miniPayload.funds;
  } else {
    throw new Error("Unknow transaction request!")
  }
  return cost
}

export async function createTransG(userTransaction, userGmail) {
  let transactionObj = { userTransaction };
  
  const uniqueid = getMongoId(userTransaction._id);
  
  transactionObj.userid = userTransaction.id;
  transactionObj.uniqueid = uniqueid;
  transactionObj.gmail = userGmail;
  
  const transactionObjDB = new transactions(transactionObj);
    await transactionObjDB.save();
}