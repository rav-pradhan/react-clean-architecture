import Book from "../domain/Book";
import IBookRepository from "../repository/IBookRepository";
import { APIResponse } from "../repository/types/APIResponse";

export default class ChangeBookDetails {
    private repository: IBookRepository
    constructor(repository: IBookRepository) {
        this.repository = repository
    }

    public async invoke(bookDetails: Book): Promise<APIResponse> {
        if (this.isValidRequest(bookDetails)) {
            return await this.repository.updateBook(bookDetails)
        }
        throw new Error("update book request was invalid")
    }

    private isValidRequest(request: object): boolean {
        const areTruthy = (el: string) => {return el ? true : false}
        return Object.values(request).filter(el => typeof el === "string").every(areTruthy)
    }
}
