import {
  validationResult,
  body
} from 'express-validator';

//handle failyee
export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return formatted error messages
   const errs = errors.array().map(e => e.msg);
   let errMsg = "";
   for (let i = 0; i<errs.length ; i++){
     errMsg += `${i+1}.) ${errs[i]} \n`;
   }
   
    return res.status(400).json({message:errMsg})
/* 
return res.status(400).json({
      errors: errors.array().map(e => e.msg)
    });
 */
  }
  next();
};

//Buy
export const buyAirtimeValidator = [
  body('network')
  .trim()
  .toLowerCase()
  .isIn(['mtn', 'airtel', 'glo'])
  .withMessage('Network must be one of: mtn, airtel, glo'),

  body('amount')
  .isFloat({
    min: 99
  }) // strictly greater than 100
  .withMessage('Amount must be greater than 100'),

  body('phone')
  .trim()
  .matches(/^\d{10}$/)
  .withMessage('Phone must be an 10-digit numeric string'),
];

export const buyDataValidator = [
  body('network')
  .trim()
  .isIn(['mtn', 'airtel', 'glo'])
  .withMessage('Network must be one of: mtn, airtel, glo'),

  body('planId')
  .isInt({
    min: 1, max: 200
  })
  .withMessage('planId must be an integer between 1 and 200'),

  body('phone')
  .trim()
  .matches(/^\d{10}$/)
  .withMessage('Phone must be an 10-digit numeric string'),
];


//fund
export const amountValidator = [
  body('amount')
  .isFloat({
    min: 99
  }) // strictly greater than 100
  .withMessage('Amount must be greater than 100')
];



//auth
export const signinValidator = [
  body("password")
  .isString()
  .isLength({
    min: 8
  })
  .withMessage("Password must be at least 8 characters long"),

  body("useGmail")
  .isBoolean()
  .withMessage("useGmail must be a boolean"),

  body("useUsername")
  .isBoolean()
  .withMessage("useUsername must be a boolean"),

  body("identifier")
  .trim()
  .custom((value, {
    req
  }) => {
    if (req.body.useGmail) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        throw new Error("Identifier must be a valid email when using Gmail");
      }
    } else if (req.body.useUsername) {
      if (!/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
        throw new Error("Identifier must be a valid username (3–20 chars, alphanumeric/underscore)");
      }
    } else {
      throw new Error("Either useGmail or useUsername must be true");
    }
    return true;
  }),
];

export const signupValidator = [
  
  body("username")
  .isString()
  .trim()
  .isLength({
    min: 3,
    max: 30
  })
  .withMessage("Username must be between 3 and 20 characters")
  .matches(/^[a-zA-Z0-9_]+$/)
  .withMessage("Username can only contain letters, numbers, and underscores"),

  body("gmail")
  .isEmail()
  .trim()
  .withMessage("Please provide a valid Gmail address")
  .custom((value) => {
    if (!value.endsWith("@gmail.com")) {
      throw new Error("Email must be a Gmail address");
    }
    return true;
  }),

  body("password")
  .isString()
  .isLength({
    min: 8
  })
  .withMessage("Password must be at least 8 characters long")
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter")
  .matches(/[a-z]/)
  .withMessage("Password must contain at least one lowercase letter")
  .matches(/[0-9]/)
  .withMessage("Password must contain at least one number"),

  body("phone")
  .isString()
  .trim()
  .matches(/^\d{10}$/)
  .withMessage("Phone number must be a 10-digit string"),
];

export const gmailValidator = [
  body("gmail")
  .isString()
   .trim()
  .withMessage("Gmail must be a string")
  .isEmail()
 
  .withMessage("Please provide a valid email address")
  .custom((value) => {
    if (!value.toLowerCase().endsWith("@gmail.com")) {
      throw new Error("Email must be a Gmail address");
    }
    return true;
  }),
];
export const resetPasswordValidator = [
  body("gmail")
  .isString()
  .trim()
  .withMessage("Gmail must be a string")
  .isEmail()
  .withMessage("Please provide a valid email address")
  .custom((value) => {
    if (!value.toLowerCase().endsWith("@gmail.com")) {
      throw new Error("Email must be a Gmail address");
    }
    return true;
  }),

  body("otp")
  .isString()
  .trim()
  .withMessage("OTP must be a string")
  .matches(/^\d{6}$/)
  .withMessage("OTP must be a 6-digit number"),

  body("password")
  .isString()
  .isLength({
    min: 8
  })
  .withMessage("Password must be at least 8 characters long")
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter")
  .matches(/[a-z]/)
  .withMessage("Password must contain at least one lowercase letter")
  .matches(/[0-9]/)
  .withMessage("Password must contain at least one number"),
];



