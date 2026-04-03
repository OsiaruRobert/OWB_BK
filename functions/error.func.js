export const errorHandler(err, req, res, next){
  let error = {...err};
  error.message = err.message;
  console.error(err)
  
  //mongoose bad ObjectId
  if(err.name==="eastError"){
    const message = "Not Found";
    error = new Error(message);
    error.statusCode= 400;
  }
  
  //mongoose duplicate
  if(err.code ===11000){
    const message = "Try using different inputs";
    error = new Error(message);
    error.statusCode = 400;
  }
  
  res.status(error.status||500).json({
    success: false,
    error:message
  })
}