const { Router } = require('express');
const User = require('../model/user');
const router = Router();


router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'This email is already registered.' });
    }

    const newUser = new User({ firstName, lastName, email, Password: password });
    await newUser.save();

    res.status(200).json({ message: 'Registration successful! Please log in.' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});


router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie('Token', token).status(200).json("Login Successful");
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
})


module.exports = router;