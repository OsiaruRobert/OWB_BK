import cfg from '../cfg.js';

const accessToken = cfg.ACT;
const url = cfg.URL;

const headers = {
  'Authorization': `Token ${accessToken}`,
  'Content-Type': 'application/json'
};



export async function sendAirtime(transId, network, amount, phone) {
  //validate
  //find by id
  //if can afford debit as pending
  //actually buy it
  //save transaction
  //respond
  /* return {
    status: true
  }
  res.status(503).json({
    message: 'Currerntly not availiable'
  })
  */

  try {
    const payload = {
      network: network,
      phone: '0'+phone,
      plan_type: 'VTU',
      bypass: false,
      amount: amount,
      'request-id': `${transId}`
    };

console.log(payload);

    let response = await fetch(`${url}/topup`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    // console.log(response);
  // if (!response.ok) return {status:"failed"}
  // if (!response.ok) throw new Error

    let data = await response.json();
    // Handle successful response here
    console.log("data");
    console.log(data);
    console.log(response);
    console.log("data");
    
    return data
  }catch(err) {
    console.log(`Error : ${err.message}`)
    throw new Error("Something went wrong. During purchase. Please try again later.")
  }
}


export async function sendData(transId, network, planId, phone) {
  const payload = {
    network: network,
    phone: '0'+phone,
    data_plan: planId,
    bypass: false,
    "request-id": `${transId}`
  };
  console.log(payload);
  try {
    const response = await fetch(`${url}/data`,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });

   /* 
   if (!response.ok) {
      throw new Error(`Something went wrong. Please try again later`);
    }
*/
    const data = await response.json();
    // Handle successful response here
    console.log(data);
    console.log(response);
    
    return data
  }catch(err) {
    console.log(`Error: ${err.message}`)
    throw new Error("Something went wrong. During purchase. Please try again later.")
  }
}
    


// Call the function
//await buyAirtime(1,100,9064498317)
//await buyData(1,1,9064498317)