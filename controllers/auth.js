import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import { createError } from './../error.js';

export const signup = async (req, res, next) => {
	// console.log(req.body);
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);
		const newUser = new User({ ...req.body, password: hash });
		await newUser.save();
		res.status(200).send('User has been created!');
	} catch (err) {
		next(createError('404', 'not found sorry!'));
	}
};
export const signin = async (req, res, next) => {
	// console.log(req.body);
	try {
		const user = await User.findOne({ name: req.body.name });
		if (!user) return next(createError(404, 'User not found!'));
		// Load hash from your password DB.
		const isCorrect = await bcrypt.compareSync(
			req.body.password,
			user.password
		);
		if (!isCorrect) return next(createError(400, 'Wrong Credentials!'));

		const token = jwt.sign({ id: user._id }, process.env.JWT_SEC_KEY);
		const { password, ...others } = user._doc;
		res.cookie('access_token', token, {
			httpOnly: true,
		})
			.status(200)
			.json(others);
	} catch (err) {
		next(createError('404', 'not found sorry!'));
	}
};
