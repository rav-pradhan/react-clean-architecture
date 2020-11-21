import Book from "../domain/Book";
import IBookGateway from "../gateway/IBookGateway";

export default class PickUpBook {
    private gateway: IBookGateway
    constructor(gateway: IBookGateway) {
        this.gateway = gateway
    }

    public async invoke(id: string): Promise<Book|undefined> {
        return await this.gateway.fetchBook(id)
    }
}