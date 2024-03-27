const { CustomAPIError } = require("./errors");
const { StatusCodes } = require("http-status-codes");

const errorHandler = async (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

module.exports = errorHandler;
