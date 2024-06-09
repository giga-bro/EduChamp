import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
const { JWT_SECRET } = require('../config/config');

export const editBio = async (req: Request, res: Response) => {
    try{
        const {username,bio} = req.body;
        const user = await User.findOne({username : username});

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        await User.updateOne({username: username}, {bio: bio});
        res.status(200).json({message: 'Bio updated successfully'});

    }catch(e){
        console.log(e)
        res.status(500).json({message: 'Server Error'})
    }
}

export const editBackgroundPic = async (req: Request, res: Response) => {
    try{
        const {username,backgroundPicPath} = req.body;
        const user = await User.findOne({username: username});

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        user.backgroundPicPath = backgroundPicPath;
        await user.save();
        res.status(200).json({message: 'Background Picture updated successfully'});
    }catch(e){
        console.log(e)
        res.status(500).json({message: 'Server Error'})
    }
}
  
export const editProfilePic = async (req: Request, res: Response) => {
    try{
      const {username,profilePicPath} = req.body;
      const user = await User.findOne({username: username});

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        user.profilePicPath = profilePicPath;
        await user.save();
        res.status(200).json({message: 'Profile Picture updated successfully'});
    }catch(e){
        console.log(e)
        res.status(500).json({message: 'Server Error'})
    }
}


export const enterDetails = async (req: Request, res: Response) => {
    try{
        const {username,name,email,profilePicPath,provider} = req.body; 
        console.log(req.body)
        
        const user = await User.findOne({username : username});
        if(user){
            return res.status(400).json({message: 'Username already in use'});
        }
        const emailExists = await User.findOne({ email });
        if(emailExists){
            return res.status(400).json({message: 'Email already in use'});
        }
        const newUser = new User({
            name,
            username,
            email,
            profilePicPath,
            provider
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '10h' });

        res.status(201).json({message: 'User registered successfully',token});

    }catch(e){
        console.log(e)
        res.status(500).json({message: 'Server Error'})
    }
}

