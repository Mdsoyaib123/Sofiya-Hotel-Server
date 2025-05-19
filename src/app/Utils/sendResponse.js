

const sendResponse = (res, data1) => {
  const { statusCode, success, message, data } = data1;
  res.status(statusCode).send({
    success,
    message,
    data
  })
};

export default sendResponse;
