import {
  generateApiKey,
  randomDigits
} from './generate.func.js';

import {
  hashPassword,
  comparePassword
} from './password.func.js';

import {
  getCurrentDateTime,
  getFiveMinutesFromNow,
  getDifferenceInMinutes,
  getSignedDifferenceInMinutes
} from './moment.func.js'

export async function createUser(userObj) {
const hashPasswordValue = await hashPassword(userObj.password)

  const createdUser = {
    gmail: userObj.gmail,
    username: userObj.username,
    phone: userObj.phone,
    
    password: hashPasswordValue,
    accessToken: `OWB_${generateApiKey(200)}`,
    otp: {
      value: randomDigits(6),
      expires: getFiveMinutesFromNow()
    },
    
    referral: userObj.referral || 'none',
    referrals: [],
    signins: [],
    transactions: [],
  
    balance:0
  }
  
  return createdUser
}

