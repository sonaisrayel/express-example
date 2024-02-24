import { User } from '../models/user-model.js';
import ResponseHandler from '../utils/ResponseHandler.js';

import CryptoLib from '../libs/crypto-lib.js'
import JWTLib from '../libs/jwt-lib.js'

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userInfo = await User.find({ email });

        const [userParams] = userInfo;

        const user = await CryptoLib.compare(password, userParams)

        if (!user) {
            return ResponseHandler.handleErrorResponse('You are not registered !!!', res);
        }

        const token = await JWTLib.createUserToken({ _id: userParams._id, email: userParams.email, username: userParams.username })
        return ResponseHandler.handleGetResponse({ data: { email: userParams.email, username: userParams.username }, token });
    } catch (e) {
        return ResponseHandler.handleErrorResponse(e.message, res);
    }
};

export const registration = async (req, res) => {
    try {
        const { username, email, password, repeatPassword } = req.body;

        if (password !== repeatPassword) {
            return ResponseHandler.handleErrorResponse('Passwords doesnt match');
        }

        const passwordHash = await CryptoLib.makeHash(password);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        await newUser.save();
        const user = await User.findOne({ username: newUser.username}).select('-password');
        return ResponseHandler.handleGetResponse({ data: user});
    } catch (e) {
        return ResponseHandler.handleErrorResponse(e.message, res);
    }
};
