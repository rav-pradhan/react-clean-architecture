import IBookRepository from '../repository/IBookRepository'
import BookRequest from '../domain/BookRequest'
import Book from '../domain/Book'
import { APIResponse } from '../repository/types/APIResponse'
import RecordBook from '../usecases/RecordBook'
import PickUpBookFromShelf from '../usecases/PickUpBookFromShelf'
import ChangeBookDetails from '../usecases/ChangeBookDetails'

export default class BookService implements RecordBook, PickUpBookFromShelf, ChangeBookDetails {
    repository: IBookRepository

    constructor(repository: IBookRepository) {
        this.repository = repository
    }

    public async recordBook(request: BookRequest): Promise<APIResponse> {
        if (this.isValidRequest(request)) {
            return await this.repository.store(request)
        }
        throw new Error("book request was invalid")
    }

    public async pickUpBookFromShelf(id: string): Promise<Book> {
        return await this.repository.fetchBook(id)
    }

    public async changeBookDetails(bookDetails: Book): Promise<APIResponse> {
        if (this.isValidRequest(bookDetails)) {
            return await this.repository.updateBook(bookDetails)
        }
        throw new Error("update book request was invalid")
    }

    private isValidRequest(request: object): boolean {
        const areTruthy = (el: string) => {return el ? true : false}
        return Object.values(request).every(areTruthy)
    }
}
