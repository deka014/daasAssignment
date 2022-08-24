import express from "express";
import User from "../models/user.js";
import { comparePassword } from "../auth/auth.js";
import { hashPassword } from "../auth/auth.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get("/login");
router.post("/login", async (req, res) => {
    const userInfo = req.body;

    try {
        
            // Check if user exists
            const user = await User.findOne({ email: userInfo.email });

            // If user does not exist
            if (!user) {
                return res.status(404).json({
                    message: "An account with this email does not exist.",
                });
            }

            // Check if password is correct
            comparePassword(userInfo.password, user.password)
                .then((response) => {
                    // If password is correct
                    if (response) {
                        const token = jwt.sign(
                            { id: user._id },
                            "this is the secret key"
                        );

                        res.status(200).json({
                            token,
                            user: {
                                id: user._id,
                                email: user.email,
                                date: user.date,
                            },
                        });
                    } else {
                        res.status(401).json({
                            message: "Invalid credentials.",
                        });
                    }
                })
                .catch((error) => {
                    res.status(500).json({
                        message: error.message,
                    });
                });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User register end points
router.get("/register");
router.post("/register", async (req, res) => {
    const user = req.body;
    
    try {
        const isEmailRegistered = await User.findOne({ email: user.email });
        console.log(isEmailRegistered)
            
                if (!isEmailRegistered) {
                    hashPassword(user.password)
                        .then(async (hash) => {
                            const { email } = user;
                            const newUser = new User({
                                email,
                                password: hash,
                            });

                            // Save the user
                            const savedUser = await newUser.save();
                            res.status(201).json(savedUser);
                        })
                        .catch((error) => {
                          
                            res.status(500).json({ message: error.message});
                        });
                }
                else {
                    res.status(400).json({
                        message: "An email with this address is already registered.",
                    });
                }
        
           
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



export default router;