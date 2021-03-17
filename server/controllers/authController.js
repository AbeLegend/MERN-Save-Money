import User from '../models/userModel';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {

    // Destructure
    const { username, email, password, confirmPassword } = req.body;

    // Validation
    if (!username) return res.status(400).send('Username is required.');
    if (!email) return res.status(400).send('Email is required.');
    if (!password) return res.status(400).send('Password is required.');
    if (!confirmPassword) return res.status(400).send('Confirm password is required.');

    if (password.length < 6) return res.status(400).send('Password should be min 6 characters long.');
    if (password !== confirmPassword) return res.status(400).send("Password not match");

    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send('Email is taken.');

    // Register
    const user = new User({ username, email, password });

    await user.save();
    return res.json({ ok: true, user });
  } catch (err) {
    return res.status(500).send('Error. Try again.');
  }
};

export const login = async (req, res) => {
  try {

    // Destructure
    const { email, password } = req.body;

    // Validation
    if (!email) return res.status(400).send('Email is required.');
    if (!password) return res.status(400).send('Password is required.');

    let user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send('User with that email not found.');

    // Compare password
    user.comparePassword(password, (err, match) => {
      if (err || !match) return res.status(400).send('Wrong password.');

      // Generate token
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      // response
      res.json({
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      });
    });
  } catch (err) {
    return res.status(400).send('Login failed.');
  }
};