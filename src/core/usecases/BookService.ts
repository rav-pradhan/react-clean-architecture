import IBookRepository from '../repository/IBookRepository'
import BookRequest from '../domain/BookRequest'
import Book from '../domain/Book'

interface BookUseCases {
    recordBook(request: BookRequest): void | Error
    pickUpBookFromShelf(bookSlug: string): Promise<Book>
    changeBookDetails(bookID: string): void | Error
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
        return await this.repository.fetchBook(bookSlug)
    }

    public changeBookDetails(bookID: string) {
        return this.repository.updateBook(bookID)
    }

    private isValidRequest(request: BookRequest): boolean {
        const areTruthy = (el: string) => {return el ? true : false}
        return Object.values(request).every(areTruthy)
    }
}
