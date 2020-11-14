import IBookRepository from '../repository/IBookRepository'
import BookRequest from '../domain/BookRequest'
import Book from '../domain/Book'

interface BookUseCases {
    recordBook(request: BookRequest): void | Error
    pickUpBookFromShelf(bookSlug: string): Promise<Book>
}

export default class BookService implements BookUseCases {
    repository: IBookRepository

    constructor(repository: IBookRepository) {
        this.repository = repository
    }

    public recordBook(request: BookRequest) {
        if (this.isValidRequest(request)) {
            return this.repository.store(request)
        }
        throw new Error("book request was invalid")
    }

    public async pickUpBookFromShelf(bookSlug: string): Promise<Book> {
        const book = await this.repository.fetchBook(bookSlug)
        return book
    }

    private isValidRequest(request: BookRequest): boolean {
        const areFalsy = (el: string) => !el
        return Object.values(request).some(areFalsy) ? false : true
    }
}
