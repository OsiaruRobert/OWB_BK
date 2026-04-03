import {
  Router
} from 'express'
import {
  buyData,
  buyAirtime
} from '../controllers/buy.controllers.js'
import {
  buyAirtimeValidator,
  buyDataValidator,
  handleValidation
} from '../functions/validator.func.js'
import {
  apikeyMiddleware
} from "../middleware/token.middleware.js"

const buyRouter = Router();

buyRouter.get("/", (req, res)=> {
  res.status(200).json({
    message: "welcome to purchase Route"
  })
})

buyRouter.post("/data", buyDataValidator, handleValidation, apikeyMiddleware, buyData);

buyRouter.post("/airtime", buyAirtimeValidator, handleValidation, apikeyMiddleware, buyAirtime);

buyRouter.get("/history", apikeyMiddleware, (req, res)=> {
  res.status(200).json(req.user.transactions)
});


buyRouter.get('/plans', (req,res)=>{
console.log("hit")
// Data plans for different networks
 const dataPlans = {
 mtn: [
  {
   networkId: 1,
   network: "mtn",
   data: "500 MB",
   price: 450,
   days: 7,
   id: 104,
   type: "sme"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "500 MB",
   price: 550,
   days: 7,
   id: 89,
   type: "gifting"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "500 MB",
   price: 550,
   days: 7,
   id: 61,
   type: "sme"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "1 GB",
   price: 500,
   days: 7,
   id: 103,
   type: "sme"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "1 GB",
   price: 600,
   days: 30,
   id: 2,
   type: "CG"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "1 GB",
   price: 850,
   days: 7,
   id: 56,
   type: "gifting"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "1 GB",
   price: 890,
   days: 7,
   id: 62,
   type: "sme"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "1.2 GB",
   price: 800,
   days: 7,
   id: 57,
   type: "gifting"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "2 GB",
   price: 960,
   days: 7,
   id: 117,
   type: "sme"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "2 GB",
   price: 1150,
   days: 30,
   id: 3,
   type: "CG"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "2 GB",
   price: 1570,
   days: 30,
   id: 66,
   type: "gifting"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "2.7 GB",
   price: 2100,
   days: 30,
   id: 67,
   type: "gifting"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "3 GB",
   price: 1400,
   days: 7,
   id: 118,
   type: "sme"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "3 GB",
   price: 1700,
   days: 30,
   id: 4,
   type: "CG"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "3.2 GB",
   price: 1100,
   days: 2,
   id: 88,
   type: "gifting"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "3.5 GB",
   price: 2550,
   days: 30,
   id: 68,
   type: "gifting"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "5 GB",
   price: 2590,
   days: 30,
   id: 90,
   type: "CG"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "6.75 GB",
   price: 3100,
   days: 30,
   id: 86,
   type: "gifting"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "7 GB",
   price: 3550,
   days: 7,
   id: 54,
   type: "gifting"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "10 GB",
   price: 4500,
   days: 30,
   id: 69,
   type: "gifting"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "10 GB",
   price: 4500,
   days: 30,
   id: 65,
   type: "gifting"
  },
  {
   networkId: 1,
   network: "mtn",
   data: "11 GB",
   price: 3500,
   days: 7,
   id: 74,
   type: "gifting"
  }
 ],

 airtel: [
  {
   networkId: 2,
   network: "airtel",
   data: "600 MB",
   price: 250,
   days: 2,
   id: 92,
   type: "gifting"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "600 MB",
   price: 310,
   days: 2,
   id: 107,
   type: "CG"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "1 GB",
   price: 400,
   days: 1,
   id: 76,
   type: "gifting"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "1 GB",
   price: 400,
   days: 1,
   id: 108,
   type: "CG"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "1 GB",
   price: 900,
   days: 7,
   id: 109,
   type: "CG"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "2 GB",
   price: 600,
   days: 2,
   id: 78,
   type: "gifting"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "2 GB",
   price: 600,
   days: 1,
   id: 110,
   type: "CG"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "2 GB",
   price: 1550,
   days: 30,
   id: 83,
   type: "sme"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "2 GB",
   price: 1700,
   days: 30,
   id: 112,
   type: "CG"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "3 GB",
   price: 800,
   days: 2,
   id: 79,
   type: "gifting"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "3 GB",
   price: 2050,
   days: 30,
   id: 84,
   type: "some"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "3 GB",
   price: 2200,
   days: 30,
   id: 113,
   type: "CG"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "3.2 GB",
   price: 550,
   days: 3,
   id: 115,
   type: "gifting"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "4 GB",
   price: 900,
   days: 2,
   id: 111,
   type: "CG"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "4 GB",
   price: 2650,
   days: 30,
   id: 114,
   type: "CG"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "5 GB",
   price: 1590,
   days: 7,
   id: 127,
   type: "gifting"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "5 GB",
   price: 1650,
   days: 7,
   id: 106,
   type: "CG"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "6.5 GB",
   price: 1100,
   days: 7,
   id: 116,
   type: "gifting"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "7 GB",
   price: 2200,
   days: 7,
   id: 46,
   type: "gifting"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "10 GB",
   price: 3200,
   days: 30,
   id: 47,
   type: "gifting"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "10 GB",
   price: 3200,
   days: 30,
   id: 105,
   type: "CG"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "10 GB",
   price: 4100,
   days: 30,
   id: 85,
   type: "sme"
  },
  {
   networkId: 2,
   network: "airtel",
   data: "1.5 GB",
   price: 450,
   days: 1,
   id: 77,
   type: "gifting"
  }
 ],

 glo: [
  {
   networkId: 3,
   network: "glo",
   data: "0.5 GB",
   price: 250,
   days: 30,
   id: 12,
   extra: "",
   type: "CG"
  },
  {
   networkId: 3,
   network: "glo",
   data: "750 MB",
   price: 250,
   days: 1,
   id: 120,
   extra: "",
   type: "gifting"
  },
  {
   networkId: 3,
   network: "glo",
   data: "1 GB",
   price: 350,
   days: 3,
   id: 128,
   extra: "",
   type: "sme"
  },
  {
   networkId: 3,
   network: "glo",
   data: "1 GB",
   price: 350,
   days: 7,
   id: 96,
   extra: "",
   type: "sme"
  },
  {
   networkId: 3,
   network: "glo",
   data: "1 GB",
   price: 400,
   days: 1,
   id: 119,
   extra: "",
   type: "gifting"
  },
  {
   networkId: 3,
   network: "glo",
   data: "1 GB",
   price: 450,
   days: 30,
   id: 13,
   extra: "",
   type: "CG"
  },
  {
   networkId: 3,
   network: "glo",
   data: "2 GB",
   price: 850,
   days: 30,
   id: 14,
   extra: "",
   type: "CG"
  },
  {
   networkId: 3,
   network: "glo",
   data: "2.5 GB",
   price: 550,
   days: 2,
   id: 121,
   extra: "",
   type: "gifting"
  },
  {
   networkId: 3,
   network: "glo",
   data: "2.6 GB",
   price: 1050,
   days: 30,
   id: 123,
   extra: "1.5GB Night",
   type: "gifting"
  },
  {
   networkId: 3,
   network: "glo",
   data: "3 GB",
   price: 980,
   days: 3,
   id: 47,
   extra: "",
   type: "sme"
  },
  {
   networkId: 3,
   network: "glo",
   data: "3 GB",
   price: 1100,
   days: 7,
   id: 98,
   extra: "",
   type: "sme"
  },
  {
   networkId: 3,
   network: "glo",
   data: "3 GB",
   price: 1270,
   days: 30,
   id: 15,
   extra: "",
   type: "CG"
  },
  {
   networkId: 3,
   network: "glo",
   data: "5 GB",
   price: 1550,
   days: 30,
   id: 124,
   extra: "3GB Night",
   type: "gifting"
  },
  {
   networkId: 3,
   network: "glo",
   data: "5 GB",
   price: 1600,
   days: 7,
   id: 100,
   extra: "",
   type: "sme"
  },
  {
   networkId: 3,
   network: "glo",
   data: "5 GB",
   price: 2200,
   days: 30,
   id: 16,
   extra: "",
   type: "CG"
  },
  {
   networkId: 3,
   network: "glo",
   data: "6.6 GB",
   price: 2000,
   days: 30,
   id: 125,
   extra: "3GB Night",
   type: "gifting"
  },
  {
   networkId: 3,
   network: "glo",
   data: "10 GB",
   price: 3050,
   days: 30,
   id: "n26",
   extra: "2GB Night",
   type: "gifting"
  },
  {
   networkId: 3,
   network: "glo",
   data: "10 GB",
   price: 4400,
   days: 30,
   id: 17,
   extra: "",
   type: "CG"
  }
 ],

 "9mobile": [
  {
   networkId: 4,
   network: "9mobile",
   data: null,
   price: null,
   days: null,
   id: null
  }
 ]
};

 
  res.status(200).json(dataPlans)
  
})



export default buyRouter;