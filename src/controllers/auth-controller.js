import { User } from '../models/user-model.js';
import CryptoLib from '../libs/crypto-lib.js';
import JwtLib from '../libs/jwt-lib.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userInfo = await User.find({ email });

        const [userParams] = userInfo;

        const user = await CryptoLib.compare(password, userParams);

        if (!user) {
            throw new Error('You are not registered!!!');
        }

        const token = await JwtLib.createUserToken({
            _id: userParams._id,
            email: userParams.email,
            username: userParams.username,
        });
        res.status(201).send({ data: { email: userParams.email, username: userParams.username }, token });
    } catch (e) {
        res.status(404).send({ data: e.message });
    }
};

export const registration = async (req, res) => {
    try {
        const { username, email, password, repeatPassword } = req.body;

        if (password !== repeatPassword) {
            throw new Error('Passwords doesnt match');
        }

        const passwordHash = await CryptoLib.makeHash(password);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        await newUser.save();
        const user = await User.findOne({ username: newUser.username });

        res.status(201).send({ data: user });
    } catch (e) {
        res.status(401).send({ data: e.message });
    }
};
