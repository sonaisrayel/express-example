import JwtLib from '../libs/jwt-lib.js';

export default class Authorization {
    static async authorized(req, res, next) {
        try {
            const { authorization } = req.headers;
            req.userInfo = await JwtLib.verifyUserToken(authorization);
            next();
        } catch (e) {
            return next(e.message);
        }
    }
}
