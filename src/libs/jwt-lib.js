import JWT from 'jsonwebtoken';
const { SECRET } = process.env;

export const createUserToken = async (data) => {
    const { _id, email, username } = data;
    return JWT.sign({ _id, email, username }, SECRET, { expiresIn: '15d' });
};

export const verifyUserToken = async (token) => {
    const user = await  JWT.verify(token, SECRET);
    return user;
};
