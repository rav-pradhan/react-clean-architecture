import BookRequest from "../domain/BookRequest";
import IBookGateway from "../gateway/IBookGateway";
import { APIResponse } from "../gateway/types/APIResponse";

export default class RecordBook {
    private gateway: IBookGateway
    constructor(gateway: IBookGateway) {
        this.gateway = gateway
    }

    public async invoke(request: BookRequest): Promise<APIResponse> {
        if (this.isValidRequest(request)) {
            return await this.gateway.recordBook(request)
        }
        throw new Error("record book request was invalid")
    }

    private isValidRequest(request: object): boolean {
        const areTruthy = (el: string) => {return el ? true : false}
        return Object.values(request).filter(el => typeof el === "string").every(areTruthy)
    }
}
