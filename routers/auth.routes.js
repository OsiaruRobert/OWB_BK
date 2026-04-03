import {
  Router
} from "express";
import {
  signupValidator,
  signinValidator,
  gmailValidator,
  resetPasswordValidator,
  handleValidation
} from '../functions/validator.func.js'

import {
  signUp,
  signIn,
  signOut,
  requestOtp,
  changePassword
} from '../controllers/auth.controllers.js'

const authRouter = Router();

authRouter.post('/signup', signupValidator, handleValidation, signUp)

authRouter.post('/signin', signinValidator, handleValidation, signIn)

authRouter.post('/requestotp', gmailValidator, handleValidation, requestOtp)

authRouter.post('/changepassword', resetPasswordValidator, handleValidation, changePassword)

export default authRouter;