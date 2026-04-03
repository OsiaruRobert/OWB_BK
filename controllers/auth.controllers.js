import {
  createUser
} from "../functions/user.func.js";
import {
  comparePassword,
  hashPassword
} from "../functions/password.func.js";
/*import {
  sendGmail
} from "../gmail/send.gmail.js";*/

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


//functions for auth.
export async function signUp(req, res) {
  try {
    //create user Object
    const userObj = await createUser(req.body)

    //try to save it
    await saveUser(userObj);
    //send notification to gmail
    /*   await sendGmail(userObj.gmail, "welcome", {
      gmail: userObj.gmail,
      username: userObj.username,
      password: req.body.password,
    });
*/
    res.status(201).json({
      message: "Your account has successfully been created. Please signin",
      key: userObj.accessToken
    })
    //try save catch
  }catch(err) {
    //response
    console.log(err)
    res.status(500).json({
      message: err.message || "Something went wrong. Please try again"
    })
  }

}


export async function signIn(req, res) {
  try {
    //extract information
    const {
      identifier,
      useUsername,
      useGmail,
      password
    } = req.body;
    console.log(req.body)
    let userObj;
    if (useUsername === false && useGmail === true) {
      userObj = await findUserByGmail(identifier);
    } else {
      userObj = await findUserByUsername(identifier);
    }

    if (!userObj) throw new Error("Server can't find this user.")
    //compare Password
    let isMatch = await comparePassword(password, userObj.password);
    if (!isMatch) throw new Error("user sent wrong password")
    //send access token and balance
    console.log(`${identifier} sign in.`)

    userObj.signins.push(Date.now);

    await saveUser(userObj);

    let lastTransaction = "";

    if (userObj.transactions[0]) lastTransaction = userObj.transactions[0]

    await saveSignin( {
      usergmail: userObj.gmail,
      balance: userObj.balance,
      lastTransaction: lastTransaction,
    });

    res.status(200).json({
      gmail: userObj.gmail,
      balance: userObj.balance,
      username: userObj.username,
      key: userObj.accessToken,
      message: `welcome back, ${userObj.username}`
    })
  }catch(err) {
    //response
    res.status(err.statusCode || 500).json({
      message: `Unable to signin because : ${err.message}`
    })
  }
}



export async function signOut(req, res) {
  //validate
  //find by id
  //record signout
  //reply
  console.log(req.body)
  res.status(200).json(req.body)
}

export async function requestOtp(req, res) {
  try {
    const {
      gmail
    } = req.body;

    //find user by gmail
    let user = await findUserByGmail(gmail)
    if (!user) throw new Error ("user not found")

    // reset otp
    let otp = await resetOtp(user)
    /*
{
otp :1234456,
expires: date.now + 5mins
}
*/
    //send otp to gmail
   // await sendGmail(gmail, "otp", otp)
    //reply

    res.status(200).json({
      message: "Otp has been sent to your gmail"
    })
  }catch(err) {
    console.log(err)
    res.status(500).json({
      message: err.message
    })
  }
}




export async function changePassword(req, res) {
  try {
    const {
      gmail,
      password,
      otp
    } = req.body;

    //find user by gmail
    let user = await findUserByGmail(gmail)
    if (!user) throw new Error ("user not found")

    //check the otp
    if (otp !== user.otp.value) throw new Error("Wrong Otp");

    let ifValid = getDifferenceInMinutes(
      user.otp.expires,
      getCurrentDateTime()
    );

    console.log("ifValid");
    console.log(ifValid);
    console.log("ifValid");

    if (ifValid > 0) {
      throw new Error("Your verification code has expired.")
      console.log("Your verification code has expired.")
    }
    //changePassword
    user.password = hashPassword(password);

    //send notification to gmail
   /* await sendGmail(gmail, "newPassword", {
      username: user.username,
      password: password,
    })
    
    */
    //reply

    // reset the otp
    await resetOtp(user)

    res.status(200).json({
      message: "Password changed"
    })
  }catch(err) {
    console.log(err)
    res.status(500).json({
      message: err.message
    })
  }
}