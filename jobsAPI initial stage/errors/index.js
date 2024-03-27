const CustomAPIError = require("./custom-api");
const UnauthenticatedError = require("./unauthenticated");
const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
};

/*********** COMMENTS *********

*** 1: , the classes UnauthenticatedError, NotFoundError, and BadRequestError are subclasses of CustomAPIError. Therefore, instances of these classes are considered instances of CustomAPIError due to the inheritance relationship. 
Note: an instance is an error associated with a specific class like UnauthenticatedError, NotFoundError, and BadRequestError...
Here's a quick overview of the class hierarchy:

CustomAPIError: The base class.
UnauthenticatedError: Subclass of CustomAPIError.
NotFoundError: Subclass of CustomAPIError.
BadRequestError: Subclass of CustomAPIError.

So, if you create an instance of, say, UnauthenticatedError, it is also an instance of CustomAPIError. Similarly, an instance of NotFoundError or BadRequestError is also an instance of CustomAPIError.
*/
