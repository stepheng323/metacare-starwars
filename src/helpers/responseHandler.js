/* eslint-disable max-len */
const respondWithSuccess = (res, statusCode = 200, message, additionalFields) => res.status(statusCode).send({
    success: true,
    message,
    payload: additionalFields,
  });
  
const respondWithWarning = (res, statusCode = 500, message, additionalFields) => res.status(statusCode).send({
    success: false,
    message,
    payload: additionalFields,
  });
  

module.exports = {
    respondWithSuccess,
    respondWithWarning
}