import Book from "../domain/Book";
import IBookGateway from "../gateway/IBookGateway";
import { APIResponse } from "../gateway/types/APIResponse";

export default class ChangeBookDetails {
    private gateway: IBookGateway
    constructor(gateway: IBookGateway) {
        this.gateway = gateway
    }

    public async invoke(bookDetails: Book): Promise<APIResponse> {
        if (this.isValidRequest(bookDetails)) {
            return await this.gateway.updateBook(bookDetails)
        }
        throw new Error("update book request was invalid")
    }

    private isValidRequest(request: object): boolean {
        const areTruthy = (el: string) => {return el ? true : false}
        return Object.values(request).filter(el => typeof el === "string").every(areTruthy)
    }
}
