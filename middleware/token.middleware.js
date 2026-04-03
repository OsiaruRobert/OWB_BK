import {
  findUserByAccessKey
} from "../functions/mongoose.func.js";


export async function apikeyMiddleware(req, res, next) {
  try {
    const APIKEY = getApiKey(req.headers);

    if (!APIKEY) {
      return res.status(401).json({
        error: 'API key required',
        code: 'MISSING_API_KEY'
      });
    }

    // Verify API key and find user
    const user = await findUserByAccessKey(APIKEY);

    if (!user.gmail) {
      console.log("User not found")
        throw new Error("Invalid API ke")
    }
      

    // Attach user to request
    req.user = user;
    next();

  } catch (error) {
    console.error('API key middleware error:', error);
    return res.status(500).json({
      message: error.message || 'Server busy. Please try again later',
    });
  }
}


export function getApiKey(headers) {
  // Check all common API key header formats
  const possibleKeys = [
    headers.apikey,
    headers.APIKEY,
    headers['x-api-key'],
    headers['X-API-Key'],
    headers['api-key'],
    headers['API-Key'],
    headers.authorization,
    headers.Authorization
  ];
  let apiKey = possibleKeys.find(key => key && key.trim() !== '');


  if (!apiKey) {
    return null;
  }

  // Clean the API key
  apiKey = apiKey.trim();

  // Extract from Bearer token
  if (apiKey.startsWith('Bearer ')) {
    return apiKey.substring(7).trim();
  }

  // Extract from Token token
  if (apiKey.startsWith('Token ')) {
    return apiKey.substring(6).trim();
  }
  
  // Extract from Basic auth
  if (apiKey.startsWith('Basic ')) {
    return apiKey.substring(6).trim();
  }
  return apiKey;
}