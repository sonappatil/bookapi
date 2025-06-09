const jwt =  require('jsonwebtoken');
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config');

// Register a new user
const signup = async (req, res) => {
  
    const { username, password, email } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }           
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email });    
        // Save the new user to the database
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
        
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }               
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }   
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });    
    }   catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }   

}
module.exports = {signup, login};