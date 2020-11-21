import Book from "../domain/Book";
import IBookGateway from "../gateway/IBookGateway";

export default class FetchBooks {
    private gateway: IBookGateway
    constructor(gateway: IBookGateway) {
        this.gateway = gateway
    }

    public async invoke(): Promise<Array<Book>|undefined> {
        return await this.gateway.fetchBooks()
    }
}