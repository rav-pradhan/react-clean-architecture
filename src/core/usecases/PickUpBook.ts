import Book from "../domain/Book";
import IBookRepository from "../repository/IBookRepository";

export default class PickUpBook {
    private repository: IBookRepository
    constructor(repository: IBookRepository) {
        this.repository = repository
    }

    public async invoke(id: string): Promise<Book|undefined> {
        return await this.repository.fetchBook(id)
    }
}