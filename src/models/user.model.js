import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// const userSchema = new mongoose.Schema({})  OR-->>

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true //used for optimised searching in DB
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "Password is Required"]
        },
        refreshToken: {
            type: String
        }

    }, {timestamps: true}
)

// encrypting password in middleware
// not used arrow func here bcoz it doesn't have 'this->' reference
userSchema.pre("save", async function (next) {

    // check for password modified before running encryption
    if(!this.isModified("password")) return next();

    // password encrypting by bcrypt package
    this.password = bcrypt.hash(this.password, 10);
    next();
})

// for password verification
userSchema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}


// Json Web-Token for ACCESS-TOKEN
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// Json Web-Token for ACCESS-TOKEN
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema);