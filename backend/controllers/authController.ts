// @ts-nocheck
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { JWT_SECRET, NODE_MAILER_SECRET } = require('../config/config');
import User from '../models/User';
import nodemailer from 'nodemailer';

const registerUser = async (req: Request, res: Response) => {
  let verificationCode: string = '';
  const { email, password,username,name,enteredVerificationCode, hashedVerificationCode } = req.body;
  if (enteredVerificationCode === null || enteredVerificationCode === undefined) {
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
      user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ message: 'Username is already taken' });
      }
      const generateVerificationCode = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
      };
      verificationCode = generateVerificationCode();
      const mailOptions = {
        from: 'aditya.as@somaiya.edu',
        to: email,
        subject: 'Verification Code',
        text: `Your verification code is: ${verificationCode}`,
      };
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'aditya.as@somaiya.edu',
          pass: NODE_MAILER_SECRET,
        },
      });
      console.log(2)
      await transporter.sendMail(mailOptions);
      console.log(3)
      const hasedCode = await bcrypt.hash(verificationCode, 5);

      res.status(201).json({ message: 'Verification Code has been sent', verificationCode: hasedCode });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  } else {
    const isMatch = await bcrypt.compare(enteredVerificationCode, hashedVerificationCode);
    if (isMatch) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      let user = new User({
        email,
        password: hashedPassword,
        username,
        name
      });
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '10h' });

      await user.save();  

      return res.status(200).json({ message: "User registered successfully", token })
    } else {
      return res.status(400).json({ message: "Invalid verification code" });
    }
  }
}


const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    let user = await User .findOne({ email }); 
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    let isMatch = false;
    if(user.password){
      isMatch = await bcrypt.compare(password, user.password);
    }
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '2h' });
    res.status(200).json({ message: 'Login Successful', token , email : user.email, username: user.username, name: user.name, bio: user.bio, profilePicPath: user.profilePicPath, backgroundPicPath: user.backgroundPicPath});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

export { registerUser,loginUser };
