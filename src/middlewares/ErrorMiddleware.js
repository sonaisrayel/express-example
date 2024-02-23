export default class ErrorMiddleware {
    static async customError(err, req, res, next) {
        console.log(req, 'req');
        console.log(err, 'err');
        res.status(404).send({ message: err });
    }
}
