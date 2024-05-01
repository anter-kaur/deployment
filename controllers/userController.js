const User=require('../models/userModel')

exports.register=async (req,res)=>{
    try {
        const { name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Enter all fields' })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exist' })
        }
        const user = await User.create({
            name,
            email,
            password
        })
        const userRegistered = await User.find({ email })
        if (!userRegistered) {
            return res.status(400).json({ message: 'Failed to register user' })
        }
        res.status(200).json({ message: 'User registered Successfully' })
    }
    catch (error) {
        // Handle Mongoose validation error
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(error => error.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(400).json('error in signup=>>',error)
    }
}

exports.login=async (req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({message:'Email and password are required'})
    }
    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({message:'User not found'})
    }
    const pass=await user.comparePassword(password)
    if(!pass){
        return res.status(400).json({message:'Email or password is invalid'})
    }

    const accessToken=user.generateAccessToken(user);
    const refreshToken=user.generateRefreshToken(user);



    // console.log('accessToken--->>',accessToken,'refreshToken--->>',refreshToken)

    res
    .cookie('accessToken',accessToken,{ httpOnly: true, maxAge: 3600000})
    .cookie('refreshToken',refreshToken,{ httpOnly: true, maxAge: 3600000})
    .status(200)
    .json({message:'Logged in Successfully'})
}

exports.dashboard=async(req,res)=>{
    const user=await User.find({})
    res.status(200).json({user})
}