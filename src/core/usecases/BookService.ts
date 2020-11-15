import IBookRepository from '../repository/IBookRepository'
import BookRequest from '../domain/BookRequest'
import Book from '../domain/Book'

interface BookUseCases {
    recordBook(request: BookRequest): void | Error
    pickUpBookFromShelf(bookSlug: string): Promise<Book>
    changeBookDetails(bookDetails: Book): void | Error
}

export default class BookService implements BookUseCases {
    repository: IBookRepository

    constructor(repository: IBookRepository) {
        this.repository = repository
    }

    public recordBook(request: BookRequest) {
        if (this.isValidRequest(request)) {
            const book = new Book(this.slugify(request.title), request.title, request.author, request.notes)
            return this.repository.store(book)
        }
        throw new Error("book request was invalid")
    }

    public async pickUpBookFromShelf(bookSlug: string): Promise<Book> {
        return await this.repository.fetchBook(bookSlug)
    }

    public changeBookDetails(bookDetails: Book) {
        return this.repository.updateBook(bookDetails)
    }

    private isValidRequest(request: BookRequest): boolean {
        const areTruthy = (el: string) => {return el ? true : false}
        return Object.values(request).every(areTruthy)
    }

    private slugify(bookTitle: string): string {
        return bookTitle.split(" ").join("-")
    }
}
