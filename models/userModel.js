const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, 'Name must contain atleast 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        minLength: [8, 'Email must contain atleast 8 characters'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must contain atleast 8 characters']
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) { return next(); }
    this.password = await bcrypt.hashSync(this.password, 10)
    next();
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken =function (user) {
    return jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_ACCESS_TOKEN,
        {
            expiresIn: '1d'
        }
    )
}

userSchema.methods.generateRefreshToken =function (user) {
    return jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_REFRESH_TOKEN,
        {
            expiresIn: '3d'
        }
    )
}

module.exports = mongoose.model('User', userSchema)