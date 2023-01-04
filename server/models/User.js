import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		img: {
			type: String,
		},
		subscriber: {
			type: Number,
			default: 0,
		},
		subscribedUsers: {
			type: [String],
			default: 0,
		},
	},
	{ timestamps: true }
);
export default mongoose.model('User', UserSchema);
