import JWT from 'jsonwebtoken';
const { SECRET } = process.env;

const createUserToken = async (payload) => {
    const { _id, email, username } = payload;
    return JWT.sign({ _id, email, username }, SECRET, { expiresIn: '15d' });
};

const verifyUserToken = async (token) => {
    return JWT.verify(token, SECRET);
   
};

export default { createUserToken, verifyUserToken };
