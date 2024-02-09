import HttpStatusCodes from 'http-status-codes';

export default class ResponseHandler {
    static handleGetResponse(res, data) {
        return res.status(HttpStatusCodes.OK).send(data);
    }

    static handlePostResponse(res, data) {
        return res.status(HttpStatusCodes.CREATED).send(data);
    }
}
