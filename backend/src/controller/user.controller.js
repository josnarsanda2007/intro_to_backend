import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try{
        console.log("got data from postman", req.body);
        const { username, password, email } = req.body;

        //BAsic validation
        if(!username || !password || !email){
            return res.status(400).json({message: "All fields are important!"});
        }

        // check if user already exist
        const existing = await User.findOne({ email: email.toLowerCase()});
        if(existing){
            return res.status(400).json({message: "User Already Exist!"});
        }

        // create user
        const user = await User.create({
            username,
            password,
            email: email.toLowerCase(),
            loggedIn: false
        });
    res.status(201).json({
        message: "User registered",
        user:{_id: user._id, email: user.email, username: user.username}
    });
    }catch (error){
        res.status(500).json({ message: "Internal server error!", error: error.message});
    }
}

const loginUser = async (req, res) => {
    try{

        // Check if user already exist
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user) return res.status(400).json({
            message: "User Not Found!"
        });

        // compare password
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "Invalid Password!"
        })

        res.status(200).json({
            message: "User Logged In",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })

    }catch (error){
        res.status(500).json({
            message: "Internal server error!"
        })
    }
}

const logoutUser = async (req, res) => {
    try{
        const { email}  = req.body;

        const user = await User.findOne({
            email
        });

        if(!user) return res.status(404).json({
            message: "User Not Found!"
        });

        res.status(200).json({
            message: "User Logged Out Successfully!"
        });

    }catch (error){
        res.status(500).json({
            message: "Internal server error!", error
        });
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
};
