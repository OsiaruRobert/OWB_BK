import dotenv from 'dotenv'
dotenv.config()

let CRED = process.env.CRED;
let url = process.env.URL;
let accessToken = process.env.ACT;




async function getAccessToken() {
  try {
    fetch(`${url}/user`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + CRED
      }
    })
    .then(response => response.json())
    .then((data) => {
      accessToken = data.AccessToken;
      console.log(data)
    });
  }catch(err) {
    console.log('Failed to get accessToken ' + err.message)
    return
  }
}
await getAccessToken()

const headers = {
  'Authorization': `Token ${accessToken}`,
  'Content-Type': 'application/json'
};

async function buyAirtime(network, amount, phone) {
  try {
    const payload = {
      network: network,
      phone: '0'+phone,
      plan_type: 'VTU',
      bypass: false,
      amount: amount,
      'request-id': `Airtime_${random11Digits()}`
    };
    console.log(payload)

    let response = await fetch(`${url}/topup`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    let data = response.json();
    // Handle successful response here
    console.log('Success:', data);

  }catch(err) {
    console.log(`Error lol : ${err.message}`)
  }
}

async function buyData(network, plan, phone) {
  const payload = {
    network: 1,
    phone: '0'+phone,
    data_plan: plan,
    bypass: false,
    "request-id": `Data_${random11Digits()}`
  };


  try {
    const response = await fetch(`${url}/data`,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Success:', data);
    // Handle successful response here
    return data;
  } catch (error) {
    console.error('Error:', error);
    // Handle errors here
    throw error;
  }
}

// Call the function
//await buyAirtime(1,100,9064498317)
//await buyAirtime(1,1,9064498317)

console.log(random11Digits())

function random11Digits() {
  return Math.floor(10000000000 + Math.random() * 90000000000)
};

console.log(3000)