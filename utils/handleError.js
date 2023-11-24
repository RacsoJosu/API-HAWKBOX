const handleHttpError = (res, message = "HTTP_ERROR", code = 400) => {
    res.status(code);
    res.send({ error: message });
  };
  
  module.exports = { handleHttpError };