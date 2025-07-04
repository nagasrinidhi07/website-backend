import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// Create JWT Token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Register User
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        // Validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save()

        // Generate Token
        const token = createToken(user._id)
        res.json({success:true, message:"User registered successfully", token })

    } catch (error) {
        res.json({success:false,message:"Server error", error: error.message })
    }
}

// Login User (Implementation Pending)
const loginUser = async (req, res) => {
    // Implement login logic here
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user) {
           return res.json({success:false,message:"User Doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch) {
             return res.json({success:false,message:"Invaild credentials"})
        }

        const token =createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export { loginUser, registerUser }
