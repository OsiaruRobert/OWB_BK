import {
  pendTransaction,
  verifyTransaction
} from "../functions/mongoose.func.js";

import {
  findBundle,
  getNetworkId
} from "../functions/network.func.js";

import {
  sendData,
  sendAirtime
} from "../functions/buy.func.js";


export async function buyAirtime(req, res) {
  try {
    const {
      amount,
      network,
      phone
    } = req.body;

    //find the user by id
    //return user
    let user = req.user;
    //respond on error
    if (!user) res.status(401).json({
      message: "Please create an account or Sign into your account"
    });

    console.log(user.balance, amount)
    if (user.balance < amount || user.balance == amount) {

      console.log(`Insufficient balance : You need more than  ₦${amount - user.balance} to make this purchase`)

      return res.status(400).json({
        message: `Insufficient balance : You need more than  ₦${amount - user.balance} to make this purchase`
      })

    }
    //validate the payLoad
    //return payLoad or throw error
    //now middleware

    //find the networkId by name
    //return the bundle or throw error
    const networkId = getNetworkId(network);


    const minipayLoad = {
      networkId,
      amount,
      network,
      phone
    };

    //Debit in pending status and user, global
    //return tracking ID
    const trans = await pendTransaction(user, minipayLoad, "Airtime");

    const {
      transId,
      _id
    } = trans;
    //get the user with pending transaction
    user = trans.user;

    //send the data
    //return respond from provider.
    const transactionRes = await sendAirtime(transId, networkId, amount, phone);
    console.log(transactionRes)
    //verify if data was successful sent
    //record as successful
    await verifyTransaction(transactionRes, user, trans);

    //send message to user
    res.status(200).json({
      message: `You successful bought ₦${amount} Airtime for ${phone}`,
      balance:user.balance
    })
  }catch(err) {
    console.error(err.message)
    res.status(500).json({
      message: err.message
    })
  }
}



export async function buyData(req, res) {
  try {
    let {
      network,
      phone,
      planId
    } = req.body;
    //find the user
    let user = req.user;
    //respond on error
    if (!user) res.status(401).json({
      message: "Please create an account or Sign into your account"
    });

    //find the bundle by ID
    //now middleware edle or throw error
    const bundle = findBundle(network, planId)

    console.log(user.balance, bundle.price)
    if (user.balance < bundle.price) {
      console.log(`Insufficient balance : You need more than  ₦${bundle.price - user.balance} to make this purchase`)

      return res.status(400).json({
        message: `insufficient balance : You need more than  ₦${bundle.price - user.balance} to make this purchase`
      });
    }


    //Debit in pending status and user, global
    //return tracking ID
    const minipayLoad = {
      bundle,
      phone,
      network
    };

    const trans = await pendTransaction(user, minipayLoad, "Data");

    const {
      transId,
      _id
    } = trans;

    user = trans.user;

    //send the data
    //return res from provider.
    const transactionRes = await sendData(transId, bundle.networkId, bundle.id, phone);

    //verify if data was successful sent
    await verifyTransaction(transactionRes, user, trans);
    //record as successful

    //send message to user
    res.status(201).json({
      message: "Purchase successful",
      balance: user.balance
    })

  }catch(err) {
    console.log(err.message)
    res.status(500).json({
      message: err.message
    })
  }
}