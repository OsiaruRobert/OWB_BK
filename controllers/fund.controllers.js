import {
  pendTransaction
} from "../functions/mongoose.func.js";

import {
  fund
} from "../functions/fund.func.js";

import cfg from '../cfg.js';



// Fund route handler fund
export async function fundAccount (req, res, next) {
  try {

    const reqFund = await fund( {
      email: req.user.gmail,
      amount: req.body.amount
    });
    
    //rwake wk
    let readyRes = await fetch(cfg.wk)
    
    
    await pendTransaction(req.user,{
      funds:req.body.amount,
      trackId:reqFund.data.reference
    },
    "Funding")
    
    res.status(200).json({
      success: true,
      data: reqFund
    });

  } catch (error) {
    console.error('Fund route error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};