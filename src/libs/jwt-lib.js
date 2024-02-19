import JWT from 'jsonwebtoken';
const { SECRET } = process.env;

const createUserToken = async (data) => {
    const { _id, email, username } = data;
    return JWT.sign({ _id, email, username }, SECRET, { expiresIn: '15d' });
};

const verifyUserToken = async (token) => {
    const user = await JWT.verify(token, SECRET);
    return user;
};

export default { createUserToken, verifyUserToken };
