const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  //   const { name, email, password } = req.body;

  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(password, salt);
  //   const tempUser = { name, email, password: hashedPassword };

  const user = await User.create({ ...req.body }); /* 1 */
  //   const token = jwt.sign(
  //     { userId: user._id, name: user.name },
  //     process.env.JWTSECRET,
  //     { expiresIn: process.env.LIFETIME }
  //   );
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Please fill out all fields");
  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError("Invalid credentials");
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid credentials");
  //   const token = jwt.sign(
  //     { userId: user._id, name: user.name },
  //     process.env.JWT_SECRET,
  //     { expiresIn: process.env.JWT_LIFETIME }
  //   );
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };

/************** COMMENTS **************

***1:  spreading req.body in the line const user = await User.create({ ...req.body }); is a common practice in Express.js applications, and it is often done for security reasons. Specifically, this approach is used to ensure that the original req.body object is not directly modified or manipulated.
In your UserSchema, you have a pre-save hook that uses the bcrypt library to hash the user's password before saving it to the database. This means that the password field in the User model will be modified during the process of creating a new user.
By spreading req.body, you create a new object and pass a copy of the properties from req.body to the User.create method. This helps to avoid unintended consequences of directly modifying the original req.body object. If you were to modify req.body directly and remove the password field before passing it to User.create, you might unintentionally alter the original request data, which could lead to unexpected behavior elsewhere in your application.

So, in essence, spreading req.body is a precautionary measure to ensure that the original request object remains intact and unmodified when creating a new user with the User.create method. It's a good practice for maintaining clean and predictable code, especially when dealing with sensitive data like passwords.


*** 2: this prints a list of all the status codes and their respective names, and the names are all listed in uppercase which is why we use "CREATED" OR "BAD_REQUEST", ETC... example of console.log({StatusCodes}):
StatusCodes: {
    '100': 'CONTINUE',
    '101': 'SWITCHING_PROTOCOLS',
    '102': 'PROCESSING',
    '103': 'EARLY_HINTS',
    '200': 'OK',
    '201': 'CREATED',

*/
