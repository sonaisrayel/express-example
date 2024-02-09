import JWT from 'jsonwebtoken';
import { verifyUserToken } from '../libs/jwt-lib.js';

export default class Authorization {

    static async authorized(req, res, next) {

        const { authorization } = req.headers;
        const user = await verifyUserToken(authorization);

        if (user) {
            next();
        } else {
           return res.send('error!!!!')
        }
    }
}
