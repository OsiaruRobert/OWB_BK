import cfg from "../cfg.js"
import https from "https"

// Fund function (ES6)
export async function fund(user) {
  const params = JSON.stringify( {
    metadata: {
      guide: {
        command: "fundOwbAccount",
        email: user.email,
        amount: user.amount // amount in naira
      }
    },
    email: user.email,
    amount: user.amount * 100 // amount in kobo
  });

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfg.payKey}`,
      'Content-Type': 'application/json'
    }
  };
  let fundingRes;

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          fundingRes = JSON.parse(data);
          if (!fundingRes.status) {
            console.log('Paystack response:', fundingRes);
            reject(new Error(fundingRes.message));
          }
          resolve(fundingRes);
          return fundingRes;
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });

    req.on('error', error => {
      console.error('Request error:',
        error);
      reject(error);
    });

    req.write(params);
    req.end();
  });

  console.log('Paystack had response:', fundingRes);
}



/*
//save Transaction locally
let payLoad = {
        transId: response.data.reference,
        status: "pending",
        action: "Bought Tokens",
        cost: price,
        balance: user.tokens,
        date: getDateOnly(),
        time: getTimeOnly()
      };
      //save it to user
      user.details.Transactions.unshift(payLoad);
      user.save();
*/